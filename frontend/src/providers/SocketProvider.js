import React from 'react';
import SocketContext from '../contexts/socketContext';

const SocketProvider = ({ socket, children }) => {

  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      throw new Error('Your message was not delivery');
    }
  });

  const addChannel = async (channel) => await socket.timeout(5000).emitWithAck('newChannel', channel);

  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name}, (response) => {
    if (response.status !== 'ok') {
      throw new Error('Your channel was not renamed');
    }
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      throw new Error('Your channel was not removed');
    }
  })

  return (
    <SocketContext.Provider value={{ sendMessage, addChannel, removeChannel, renameChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider
