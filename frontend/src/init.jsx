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
import { Provider as StoreProvider } from "react-redux";
import filter from 'leo-profanity';
import { Provider, ErrorBoundary} from '@rollbar/react';


const init = async () => {
  const store = configureStore({
    reducer: {
      channels,
      messages,
      currentChannel,
    },
  });

  const rollbarConfig = {
    accessToken: '8ff6c781a3f34e929555c77e574d125e',
    environment: 'testenv',
  };

  const socket = io();
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
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

  filter.add(filter.getDictionary('ru'));

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <React.StrictMode>
          <UserProvider>
            <StoreProvider store={store}>
              <SocketProvider socket={socket}>
                <App />
              </SocketProvider>
            </StoreProvider>
          </UserProvider>
        </React.StrictMode>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;

