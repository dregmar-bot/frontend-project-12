import React from 'react';
import LoginCardFooter from './LoginCardFooter';
import LoginCardBody from './LoginCardBody';


const LoginCard = () => (
  <div className="card shadow-sm">
    <LoginCardBody />
    <LoginCardFooter />
  </div>
)

export default LoginCard;
