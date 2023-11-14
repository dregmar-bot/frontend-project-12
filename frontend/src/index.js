import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './components/App';
import './i18n'
import UserProvider from './providers/UserProvider';
import StoreProvider from './providers/StoreProvider';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <React.StrictMode>
        <UserProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </UserProvider>
      </React.StrictMode>
  );
};

app();
