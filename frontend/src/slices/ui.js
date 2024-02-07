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
  reducers: {
    switchChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    openModal: (state) => {
      state.modalsState.isOpen = true;
    },
    closeModal: (state) => {
      state.modalsState.isOpen = false;
    },
    setModalType: (state, action) => {
      state.modalsState.modalType = action.payload;
    },
    setEditingChannel: (state, action) => {
      state.modalsState.editingChannel = action.payload;
    },
  },
})

export const { switchChannel, closeModal, openModal, setEditingChannel, setModalType } = uiSlice.actions;
export default uiSlice.reducer;
