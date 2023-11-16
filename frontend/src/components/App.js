import  '../styles.scss';
import  'bootstrap';
import React, { useContext } from 'react';
import { addChannel } from '../slices/channels';
import { addMessage } from '../slices/messages';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from "./ChatPage";
import SocketContext from '../contexts/socketContext';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload))
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound/>} />
        <Route path='/' element={<ChatPage/>} />
        <Route path='login' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
