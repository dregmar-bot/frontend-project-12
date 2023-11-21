import React, {useState, useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channels';
import { Modal } from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext';


const RenameChannelModal = ({ show, close,  id}) => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const { renameChannel } = useContext(SocketContext);
  const inputEl = useRef(null);
  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const { t } = useTranslation();

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
      .then(() => {
      renameChannel(id, name);
      setLoading(false);
      setValue('');
      close();
      }).catch((e) => {
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
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.channelModal.rename`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              ref={inputEl}
              name="name"
              id="new-name"
              className={`mb-2 form-control ${error ? "is-invalid" : ""}`}
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
  );
};

export default RenameChannelModal;
