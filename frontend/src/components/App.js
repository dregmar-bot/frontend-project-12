import '../styles.scss';
import 'bootstrap';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../routes';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import SignupPage from './SignupPage';
import ChatPage from './ChatPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routes.chatPath()}
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )}
      />
      <Route path={routes.loginPath()} element={<LoginPage />} />
      <Route path={routes.signupPath()} element={<SignupPage />} />
      <Route path={routes.undefinedPath()} element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
