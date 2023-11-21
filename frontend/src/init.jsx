import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import React from 'react';
import App from './components/App';
import UserProvider from './providers/UserProvider';
import SocketProvider from './providers/SocketProvider';
import { io } from 'socket.io-client';
import messages, { addMessage } from "./slices/messages";
import channels, { addChannel, removeChannel, renameChannel } from "./slices/channels";
import { configureStore } from '@reduxjs/toolkit';
import currentChannel from './slices/currentChannel';
import { Provider } from "react-redux";


const init = async () => {
  const store = configureStore({
    reducer: {
      channels,
      messages,
      currentChannel,
    },
  });

  const socket = io();
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });
  socket.on('renameChannel', ({ id, ...changes}) => {
    store.dispatch(renameChannel({ id, changes}));
  });

  const i18n = i18next.createInstance();
  await i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    },
  });

  return (
    <React.StrictMode>
      <UserProvider>
        <Provider store={store}>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </Provider>
      </UserProvider>
    </React.StrictMode>
  );
};

export default init;

