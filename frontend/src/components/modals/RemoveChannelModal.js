import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext';
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({ show, close, id }) => {
  const [isLoading, setLoading] = useState(false);
  const { removeChannel } = useContext(SocketContext);
  const { t } = useTranslation();

  const handleSubmit = () => {
    setLoading(true);
    try {
      removeChannel(id);
      setLoading(false);
      close()
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannelModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeChannelModal.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={close}>{t("modals.removeChannelModal.cancel")}</button>
          <button type="button" className="btn btn-danger" onClick={handleSubmit} disabled={isLoading}>{t("modals.removeChannelModal.remove")}</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal;
