import React, { useMemo } from 'react';
import SocketContext from '../contexts/socketContext';

const SocketProvider = ({ socket, children }) => {
  const sendMessage = useMemo(() => (message) => socket.timeout(5000).emitWithAck('newMessage', message), [socket]);
  const addChannel = useMemo(() => (channel) => socket.timeout(5000).emitWithAck('newChannel', channel), [socket]);
  const renameChannel = useMemo(() => (id, name) => socket.timeout(5000).emitWithAck('renameChannel', { id, name }), [socket]);
  const removeChannel = useMemo(() => (id) => socket.timeout(5000).emitWithAck('removeChannel', { id }), [socket]);

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
