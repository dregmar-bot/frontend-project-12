import React, { useContext } from 'react';
import AuthContext from '../contexts/authContext.js';
import { useNavigate } from 'react-router-dom';
import ChatPage from './ChatPage';
import routes from '../routes';

const PrivateRoute = () => {
  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (activeUser) {
    return <ChatPage />
  } else {
    return navigate(routes.loginPath());
  }
};

export default PrivateRoute;
