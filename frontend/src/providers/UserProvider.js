import React, { useCallback, useState } from 'react';
import UserContext from '../contexts/userContext';

const user = {
  username: null,
  password: null,
  token: null,
};

const UserProvider = ({ children }) => {
  const [activeUser, setUser] = useState(user);
  const isAuthorized = useCallback(() => !!activeUser.token, [activeUser]);


  return (
    <UserContext.Provider value={{ activeUser: useCallback(() => activeUser, []), setUser: useCallback((user) => setUser(user), []), isAuthorized }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
