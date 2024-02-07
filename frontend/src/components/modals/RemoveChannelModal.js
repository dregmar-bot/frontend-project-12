import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ApiContext from '../../contexts/apiContext';
import { closeModal, switchChannel, setEditingChannel } from '../../slices/ui';

const RemoveChannelModal = () => {
  const [isLoading, setLoading] = useState(false);
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.ui.currentChannel);
  const defaultChannel = useSelector((state) => state.ui.defaultChannel);
  const isModalOpen = useSelector((state) => state.ui.modalsState.isOpen);
  const modalType = useSelector((state) => state.ui.modalsState.modalType);
  const channel = useSelector((state) => state.ui.modalsState.editingChannel);

  const showModal = isModalOpen && modalType === 'remove';

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await removeChannel(channel);
      if (channel === currentChannel) {
        dispatch(switchChannel(defaultChannel));
      }
      toast.success(t('modals.toast.remove'));
      setLoading(false);
      dispatch(closeModal());
      dispatch(setEditingChannel(null))
    } catch {
      toast.error(t('socketErrors.timeout'));
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => dispatch(closeModal())} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.removeChannelModal.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">{t('modals.removeChannelModal.areYouSure')}</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>{t('modals.removeChannelModal.cancel')}</Button>
            <Button variant="danger" onClick={handleSubmit} disabled={isLoading}>{t('modals.removeChannelModal.remove')}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RemoveChannelModal;
