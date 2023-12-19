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
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  addChannel, addChannels, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
