import React, { useCallback } from 'react';
import SocketContext from '../contexts/socketContext';

const SocketProvider = ({ socket, children }) => {
  const sendMessage = useCallback((message) => socket.timeout(5000).emitWithAck('newMessage', message));
  const addChannel = useCallback((channel) => socket.timeout(5000).emitWithAck('newChannel', channel));
  const renameChannel = useCallback((id, name) => socket.timeout(5000).emitWithAck('renameChannel', { id, name }));
  const removeChannel = useCallback((id) => socket.timeout(5000).emitWithAck('removeChannel', { id }));

  return (
    <SocketContext.Provider value={{
      sendMessage, addChannel, removeChannel, renameChannel,
    }}
    >
      { children }
    </SocketContext.Provider>
  );
};

export default SocketProvider;
