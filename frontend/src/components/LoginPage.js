import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from './LoginCard';
import NavigationBar from './NavigationBar';
import AuthContext from '../contexts/authContext';
import routes from '../routes';

const LoginPage = () => {
  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (activeUser) {
      navigate(routes.chatPath());
    }
  });
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <NavigationBar />
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
