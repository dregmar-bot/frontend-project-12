import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import filter from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import ru from './locales/ru';
import App from './components/App';
import UserProvider from './providers/UserProvider';
import SocketProvider from './providers/SocketProvider';
import messages, { addMessage } from './slices/messages';
import channels, {
  addChannel, removeChannel, renameChannel,
} from './slices/channels';
import currentChannel from './slices/currentChannel';

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
  socket.on('renameChannel', ({ id, ...changes }) => {
    store.dispatch(renameChannel({ id, changes }));
  });

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        ru,
      },
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
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
