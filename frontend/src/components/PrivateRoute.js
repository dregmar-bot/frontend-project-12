import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const { activeUser } = useContext(AuthContext);
  const location = useLocation();

  return (
    activeUser ? children : <Navigate to={routes.loginPath()} state={{ from: location }} />
  );
};

export default PrivateRoute;
