import React, {useState, useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { channelsSelectors} from '../../slices/channels';
import { Modal } from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext';
import { toast, ToastContainer } from 'react-toastify';
import { switchChannel} from '../../slices/currentChannel';

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
    name: Yup.string().test(
      'name is duplicated',
      `${t('yupErrors.channelNameIsDuplicated')}`,
      (value) => !channelNames.includes(value),
    ),
  });

  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = new FormData(e.target).get('name');
    channelNameSchema.validate({ name })
    .then(async () => {
      const { status, data } = await addChannel({ name });
      if(status === 'ok') {
        toast.success(t('modals.toast.add'));
        setLoading(false);
        dispatch(switchChannel(data.id));
        close();
      } else {
        toast.success(t('modals.toast.unknownError'));
      }
    }).catch((e) => {
      console.log(e)
      setError(e.message);
      setLoading(false);
    })
  }

  useEffect(() =>{
    setError(null);
    setValue('');
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [show])

  return (
    <div>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t(`modals.channelModal.add`)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                ref={inputEl}
                name="name"
                id="name"
                className={`mb-2 form-control ${error ? "is-invalid" : ""}`}
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
      <ToastContainer/>
    </div>
  );
};

export default AddChannelModal;
