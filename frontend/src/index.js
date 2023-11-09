import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './components/App';
import './i18n'
import UserProvider from './providers/UserProvider';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <React.StrictMode>
        <UserProvider>
          <App />
        </UserProvider>
      </React.StrictMode>
  );
};

app();
