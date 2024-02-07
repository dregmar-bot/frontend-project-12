import '../styles.scss';
import 'bootstrap';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../routes';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import ChatPage from './ChatPage';
import SignupPage from './SignupPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.undefinedPath()} element={<PageNotFound />} />
      <Route path={routes.chatPath()} element={<ChatPage />} />
      <Route path={routes.loginPath()} element={<LoginPage />} />
      <Route path={routes.signupPath()} element={<SignupPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
