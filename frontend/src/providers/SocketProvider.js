import React, { useMemo } from 'react';
import SocketContext from '../contexts/socketContext';

const SocketProvider = ({ socket, children }) => {
  const sendMessage = (message) => socket.timeout(5000).emitWithAck('newMessage', message);
  const addChannel = (channel) => socket.timeout(5000).emitWithAck('newChannel', channel);
  const renameChannel = (id, name) => socket.timeout(5000).emitWithAck('renameChannel', { id, name });
  const removeChannel = (id) => socket.timeout(5000).emitWithAck('removeChannel', { id });

  const api = useMemo(() => {
  return {
    sendMessage,
    addChannel,
    removeChannel,
    renameChannel,
  }}, []);

  return (
    <SocketContext.Provider value={api}>
      { children }
    </SocketContext.Provider>
  );
};

export default SocketProvider;
