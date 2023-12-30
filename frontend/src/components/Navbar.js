import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const Navbar = () => {
  const { isAuthorized, deauthorize } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEscape = () => {
    deauthorize();
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        { isAuthorized() ? <button type="button" className="btn btn-primary" onClick={handleEscape}>Выйти</button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
