import React from 'react';
import SignupCard from './SignupCard';
import Layout from './Layout';

const SignupPage = () => (
  <Layout>
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <SignupCard />
        </div>
      </div>
    </div>
  </Layout>
);

export default SignupPage;
