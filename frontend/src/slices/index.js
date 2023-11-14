import { configureStore } from '@reduxjs/toolkit';
import channels from './channels.js'
import messages from './messages';
import currentChannel from './currentChannel';

export default configureStore({
  reducer: {
    channels,
    messages,
    currentChannel,
  },
});

