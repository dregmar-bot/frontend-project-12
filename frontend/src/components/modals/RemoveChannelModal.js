import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';

const RemoveChannelModal = ({ show, close, id }) => {
  const [isLoading, setLoading] = useState(false);
  const { removeChannel } = useContext(SocketContext);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { status } = await removeChannel(id);
      if (status === 'ok') {
        toast.success(t('modals.toast.remove'));
        setLoading(false);
        close();
      } else {
        toast.error(t('modals.toast.unknownError'));
      }
    } catch {
      toast.error(t('socketErrors.timeout'));
    }
  };

  return (
    <div>
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
      <ToastContainer/>
    </div>
  )
}

export default RemoveChannelModal;
