import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from './LoginCard';
import Navbar from './Navbar';
import AuthContext from '../contexts/authContext';

const LoginPage = () => {
  const { isAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthorized()) {
      navigate('/');
    }
  });
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <LoginCard />
              </div>
            </div>
          </div>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default LoginPage;
