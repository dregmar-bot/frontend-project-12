import React from 'react';
import LoginCardForm from './LoginCardForm';
import LoginCardImage from './LoginCardImage';

const LoginCardBody = () => {
  return (
    <div className="card-body row p-5">
      <LoginCardImage />
      <LoginCardForm />
    </div>
  )
}

export default LoginCardBody;
