import React from 'react';
import SocketContext from '../contexts/socketContext';
import { switchChannel } from '../slices/currentChannel';
import { useDispatch } from 'react-redux';


const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log('Your message was not delivery');
    }
  });
  const addChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status === 'ok') {
      dispatch(switchChannel(response.data.id));
    } else {
      console.log('Your channel was not created');
    }
  });

  return (
    <SocketContext.Provider value={{ sendMessage, addChannel, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider
