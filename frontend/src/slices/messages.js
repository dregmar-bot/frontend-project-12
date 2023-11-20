import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const { id } = action.payload;
      const restEntities = Object.values(state.entities).filter((message) => message.channelId !== id);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const messageSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage, addMessages, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
