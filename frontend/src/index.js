import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './components/App';
import './i18n'

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('body'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

app();
