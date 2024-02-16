import React from 'react';
import LoginCard from './LoginCard';
import Layout from './Layout';

const LoginPage = () => (
  <Layout>
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <LoginCard />
        </div>
      </div>
    </div>
  </Layout>
);

export default LoginPage;
