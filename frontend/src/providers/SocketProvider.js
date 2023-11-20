import React from 'react';
import SocketContext from '../contexts/socketContext';
import { useDispatch } from 'react-redux';
import { switchChannel } from '../slices/currentChannel';


const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      throw new Error('Your message was not delivery');
    }
  });

  const addChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status === 'ok') {
      const { id } = response.data;
      dispatch(switchChannel(id));
    } else {
      throw new Error('Your channel was not created');
    }
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      throw new Error('Your channel was not removed')
    } else {

    }
  })

  return (
    <SocketContext.Provider value={{ sendMessage, addChannel, removeChannel, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider
