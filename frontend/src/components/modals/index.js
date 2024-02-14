import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

export default (modalName) => modals[modalName];
