import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import filter from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import ru from './locales/ru';
import App from './components/App';
import AuthProvider from './providers/AuthProvider';
import ApiContext from './contexts/apiContext';
import messages, { addMessage } from './slices/messages';
import channels, {
  addChannel, removeChannel, renameChannel,
} from './slices/channels';
import ui from './slices/ui';

const init = async () => {
  const store = configureStore({
    reducer: {
      channels,
      messages,
      ui,
    },
  });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
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

  const sendMessageApi = (message) => socket.timeout(5000).emitWithAck('newMessage', message);
  const addChannelApi = (channel) => socket.timeout(5000).emitWithAck('newChannel', channel);
  const renameChannelApi = (id, name) => socket.timeout(5000).emitWithAck('renameChannel', { id, name });
  const removeChannelApi = (id) => socket.timeout(5000).emitWithAck('removeChannel', { id });

  const api = {
    sendMessage: sendMessageApi,
    addChannel: addChannelApi,
    removeChannel: removeChannelApi,
    renameChannel: renameChannelApi,
  };

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
          <AuthProvider>
            <StoreProvider store={store}>
              <ApiContext.Provider value={api}>
                <App />
                <ToastContainer />
              </ApiContext.Provider>
            </StoreProvider>
          </AuthProvider>
        </React.StrictMode>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
