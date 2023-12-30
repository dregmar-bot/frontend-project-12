import React, { useMemo, useState } from 'react';
import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [activeUser, setUser] = useState({
    username: null,
    token: null,
  });
  const isAuthorized = () => !!localStorage.getItem('chatToken');

  const authorize = (user) => {
    setUser(user);
    const { username, token } = user;
    localStorage.setItem('chatToken', token);
    localStorage.setItem('chatUsername', username);
  };
  const deauthorize = () => {
    setUser({
      username: null,
      token: null,
    });
    localStorage.removeItem('chatToken');
    localStorage.removeItem('chatUsername');
  };
  const getToken = () => localStorage.getItem('chatToken');
  const getUsername = () => localStorage.getItem('chatUsername');

  const authApi = useMemo(() => ({
    activeUser,
    authorize,
    deauthorize,
    isAuthorized,
    getToken,
    getUsername,
  }), [activeUser]);

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
