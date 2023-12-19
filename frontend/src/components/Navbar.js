import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../contexts/userContext';

const Navbar = () => {
  const isAuthorized = () => !!localStorage.getItem('token');
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleUnauthorize = () => {
    setUser({
      username: null,
      password: null,
      token: null,
    });
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        { isAuthorized() ? <button type="button" className="btn btn-primary" onClick={handleUnauthorize}>Выйти</button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
