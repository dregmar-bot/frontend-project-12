import React from 'react';


const Navbar = () => {
  const isAuthorized = () => localStorage.userToken ?? false;
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
