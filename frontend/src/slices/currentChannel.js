import { createSlice } from '@reduxjs/toolkit';

const currentChannelSlice = createSlice({
  name: 'currentChannelId',
  initialState: 0,
  reducers: {
    switchChannel: (state, action) => {
      return action.payload;
    },
  },
});

export const { switchChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
