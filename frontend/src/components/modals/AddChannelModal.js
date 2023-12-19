import React, {
  useState, useContext, useEffect, useRef
} from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { channelsSelectors } from '../../slices/channels';
import SocketContext from '../../contexts/socketContext';
import { switchChannel } from '../../slices/currentChannel';

const AddChannelModal = ({ show, close }) => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const { addChannel } = useContext(SocketContext);
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);

  const channelNameSchema = Yup.object({
    name: Yup.string()
      .test(
        'name is duplicated',
        `${t('yupErrors.channelNameIsDuplicated')}`,
        (name) => !channelNames.includes(name),
      )
      .min(3, `${t('yupErrors.minSymbols', { count: 3 })} ${t('yupErrors.maxSymbols.key', { count: 20 })}`)
      .max(20, `${t('yupErrors.minSymbols', { count: 3 })} ${t('yupErrors.maxSymbols.key', { count: 20 })}`),
  });

  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = value;
    channelNameSchema.validate({ name })
      .then(async () => {
        const { status, data } = await addChannel({ name });
        if (status === 'ok') {
          toast.success(t('modals.toast.add'));
          setLoading(false);
          dispatch(switchChannel(data.id));
          close();
        } else {
          toast.error(t('modals.toast.unknownError'));
        }
      }).catch((e) => {
        const errorMessage = e.name === 'ValidationError' ? e.message : t('socketErrors.timeout');
        setError(errorMessage);
        setLoading(false);
      });
  };

  useEffect(() => {
    setError(null);
    setValue('');
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channelModal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              ref={inputEl}
              name="name"
              id="name"
              className={`mb-2 form-control ${error ? 'is-invalid' : ''}`}
              value={value}
              onChange={handleChange}
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelModal.channelName')}</label>
            { error ? (<div className="invalid-feedback">{error}</div>) : null}
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={close}>{t('modals.channelModal.cancel')}</button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {!isLoading ? t('modals.channelModal.submit') : t('modals.channelModal.sending')}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
