import React, {
  useState, useContext, useEffect, useRef
} from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channels';
import SocketContext from '../../contexts/socketContext';

const RenameChannelModal = ({ show, close, id }) => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const { renameChannel } = useContext(SocketContext);
  const inputEl = useRef(null);
  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const { t } = useTranslation();

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
        const { status } = await renameChannel(id, name);
        if (status === 'ok') {
          setLoading(false);
          toast.success(t('modals.toast.rename'));
          setValue('');
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
    <div>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.channelModal.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                ref={inputEl}
                name="name"
                id="new-name"
                className={`mb-2 form-control ${error ? 'is-invalid' : ''}`}
                value={value}
                onChange={handleChange}
              />
              <label className="visually-hidden" htmlFor="new-name">{t('modals.channelModal.channelName')}</label>
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
    </div>
  );
};

export default RenameChannelModal;
