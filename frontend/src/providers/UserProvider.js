import React, { useMemo, useState } from 'react';
import UserContext from '../contexts/userContext';

const UserProvider = ({ children }) => {
  const [activeUser, setUser] = useState({
    username: null,
    password: null,
    token: null,
  });
  const isAuthorized = !!activeUser.token;

  const user = useMemo(() => ({
    activeUser,
    setUser,
    isAuthorized,
  }), [activeUser, isAuthorized]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
