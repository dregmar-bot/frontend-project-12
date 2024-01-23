import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    switchChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  addChannel, addChannels, removeChannel, renameChannel, switchChannel
} = channelsSlice.actions;
export default channelsSlice.reducer;
