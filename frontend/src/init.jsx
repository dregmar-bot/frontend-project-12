import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import React from 'react';
import App from './components/App';
import UserProvider from './providers/UserProvider';
import StoreProvider from './providers/StoreProvider';
import SocketProvider from './providers/SocketProvider';
import { io } from 'socket.io-client';


const init = async () => {
  const socket = io();
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
        <StoreProvider>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </StoreProvider>
      </UserProvider>
    </React.StrictMode>
  );
};

export default init;

