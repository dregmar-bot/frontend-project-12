import React, { useState } from 'react';
import UserContext from '../contexts';

const user = {
  username: null,
  password: null,
  token: 123,
}


const UserProvider = ({ children }) => {
  const [activeUser, setUser] = useState(user);
  const isAuthorized = () => activeUser.token ?? false;

  return (
    <UserContext.Provider value={{activeUser, setUser, isAuthorized}}>
      {children}
    </UserContext.Provider>
  )
};

export default UserProvider;
