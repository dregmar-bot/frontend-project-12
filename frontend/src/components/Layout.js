import React from 'react';
import NavigationBar from './NavigationBar';

const Layout = ({ children }) => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <NavigationBar />
        {children}
      </div>
    </div>
  </div>
);

export default Layout
