import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../../slices/ui';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

const ChannelsModal = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.ui.modalsState.modalType);
  const isModalOpen = useSelector((state) => state.ui.modalsState.isOpen);

  if (!modalType) {
    return null;
  }

  const Component = modals[modalType];
  return (
    <Modal show={isModalOpen} onHide={() => dispatch(closeModal())} centered>
      <Component />
    </Modal>
  );
};

export default ChannelsModal;
