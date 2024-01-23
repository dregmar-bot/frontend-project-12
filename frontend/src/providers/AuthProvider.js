import React, { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [activeUser, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user'))
  );

  const authorize = useCallback((user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }, []);
  const deauthorize = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);
  const getAuthHeader = useCallback(() => ({ Authorization: `Bearer ${activeUser.token}` }), [activeUser]);

  const authApi = useMemo(() => ({
    activeUser,
    authorize,
    deauthorize,
    getAuthHeader,
  }), [activeUser, getAuthHeader, authorize, deauthorize]);

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
