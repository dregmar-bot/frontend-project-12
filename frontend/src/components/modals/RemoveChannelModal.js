import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ApiContext from '../../contexts/apiContext';

const RemoveChannelModal = ({ show, close, id }) => {
  const [isLoading, setLoading] = useState(false);
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await removeChannel(id);
      toast.success(t('modals.toast.remove'));
      setLoading(false);
      close();
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
            <button type="button" className="me-2 btn btn-secondary" onClick={close}>{t('modals.removeChannelModal.cancel')}</button>
            <button type="button" className="btn btn-danger" onClick={handleSubmit} disabled={isLoading}>{t('modals.removeChannelModal.remove')}</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RemoveChannelModal;
