import { Formik, Form } from 'formik';
import React from 'react';
import PasswordField from './PasswordField';
import UsernameField from "./UsernameField";
import LoginBtn from './LoginBtn';

const LoginCardForm = () => {
  return <Formik
    initialValues={{ email: '', password: ''}}
    onSubmit={(values) => console.log(values)}
  >
    {() => (
      <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      >
        <h1 className="text-center mb-4">Войти</h1>
        <div className="form-floating mb-3">
          <UsernameField />
          <label htmlFor="username">Ваш ник</label>
        </div>
        <div className="form-floating mb-4">
          <PasswordField />
          <label htmlFor="password">Пароль</label>
        </div>
        <LoginBtn />
      </Form>
    )}
  </Formik>
};

export default LoginCardForm;
