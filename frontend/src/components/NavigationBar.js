import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import AuthContext from '../contexts/authContext';
import routes from '../routes';

const NavigationBar = () => {
  const { activeUser, deauthorize } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEscape = () => {
    deauthorize();
    navigate(routes.loginPath());
  };

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <div className="container">
        <Link to={routes.chatPath()} className="navbar-brand">Hexlet Chat</Link>
        { activeUser ? <Button variant="primary" onClick={handleEscape}>Выйти</Button> : null}
      </div>
    </Navbar>
  );
};

export default NavigationBar;
