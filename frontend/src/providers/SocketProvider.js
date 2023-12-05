import React from 'react';
import SocketContext from '../contexts/socketContext';

const SocketProvider = ({ socket, children }) => {

  const sendMessage = (message) => socket.timeout(5000).emitWithAck('newMessage', message);

  const addChannel = (channel) => socket.timeout(5000).emitWithAck('newChannel', channel);

  const renameChannel = (id, name) => socket.timeout(5000).emitWithAck('renameChannel', { id, name});

  const removeChannel = (id) => socket.timeout(5000).emitWithAck('removeChannel', { id });

  return (
    <SocketContext.Provider value={{ sendMessage, addChannel, removeChannel, renameChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider
