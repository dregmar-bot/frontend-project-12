import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    defaultChannel: 1,
    currentChannel: 1,
    modalsState: {
      isOpen: false,
      modalType: null,
      editingChannel: null,
    },
  },
  /* eslint no-param-reassign: "off" */
  reducers: {
    switchChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    openModal: (state, action) => {
      state.modalsState.isOpen = true;
      const { type, channel } = action.payload;
      state.modalsState.modalType = type;
      state.modalsState.editingChannel = channel;
    },
    closeModal: (state) => {
      state.modalsState.isOpen = false;
      state.modalsState.modalType = null;
      state.modalsState.editingChannel = null;
    },
  },
});

export const { switchChannel, closeModal, openModal } = uiSlice.actions;
export default uiSlice.reducer;
