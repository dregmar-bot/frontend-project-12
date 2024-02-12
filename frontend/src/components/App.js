import '../styles.scss';
import 'bootstrap';
import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route, useLocation, Navigate} from 'react-router-dom';
import AuthContext from '../contexts/authContext.js';
import routes from '../routes';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import SignupPage from './SignupPage';
import ChatPage from "./ChatPage";

const App = () => {

  const PrivateRoute = ({ children }) => {
    const { activeUser } = useContext(AuthContext);
    const location = useLocation();

    return (
      activeUser ? children : <Navigate to={routes.loginPath()} state={{ from: location }} />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.undefinedPath()} element={<PageNotFound />} />
        <Route path={routes.chatPath()} element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPath()} element={<LoginPage />} />
        <Route path={routes.signupPath()} element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;
