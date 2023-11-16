import { createContext } from 'react';

export default createContext( {
  socket: {},
  sendMessage: () => {},
  addChannel: () => {},
});
