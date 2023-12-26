import React, { useMemo, useState } from 'react';
import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [activeUser, setUser] = useState({
    username: null,
    password: null,
    token: null,
  });
  const isAuthorized = !!activeUser.token;
  const authorize = (user) => {
    setUser(user);
    const { username, password, token } = user;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('token', token);
  };
  const deauthorize = () => {
    setUser({
      username: null,
      password: null,
      token: null,
    });
    localStorage.clear();
  };

  const authApi = useMemo(() => ({
    activeUser,
    authorize,
    deauthorize,
    isAuthorized,
  }), [activeUser, isAuthorized]);

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
