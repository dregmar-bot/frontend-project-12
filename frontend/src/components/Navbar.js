import React, { useContext } from 'react';
import UserContext from '../contexts/index.js';


const Navbar = () => {
  const { activeUser, isAuthorized } = useContext(UserContext);
  console.log(activeUser)

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Goossenger</a>
        { isAuthorized() ? <button type="button" className="btn btn-primary">Выйти</button> : null}
      </div>
    </nav>
  )
}

export default Navbar;
