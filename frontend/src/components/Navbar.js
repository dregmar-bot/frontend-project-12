import React, { useContext } from 'react';
import userContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isAuthorized = () => !!localStorage.getItem('activeUser');
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleUnauthorize = () => {
    setUser({
      username: null,
      password: null,
      token: null,
    });
    localStorage.clear();
    navigate('/login')
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Goossenger</a>
        { isAuthorized() ? <button type="button" className="btn btn-primary" onClick={handleUnauthorize}>Выйти</button> : null}
      </div>
    </nav>
  )
}

export default Navbar;
