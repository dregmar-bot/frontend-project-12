import React, { useMemo, useState } from 'react';
import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [activeUser, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user'))
  );

  const authorize = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };
  const deauthorize = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const getAuthHeader = () => ({ Authorization: `Bearer ${activeUser.token}` });

  const authApi = useMemo(() => ({
    activeUser,
    authorize,
    deauthorize,
    getAuthHeader,
  }), [activeUser]);

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
