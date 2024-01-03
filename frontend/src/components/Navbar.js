import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import routes from '../routes';

const Navbar = () => {
  const { activeUser, deauthorize } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEscape = () => {
    deauthorize();
    navigate(routes.loginPath());
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={routes.chatPath()}>Hexlet Chat</a>
        { activeUser ? <button type="button" className="btn btn-primary" onClick={handleEscape}>Выйти</button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
