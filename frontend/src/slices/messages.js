import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
  },
});

export const messageSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage, addMessages, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
