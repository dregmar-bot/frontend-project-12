import React from 'react';


import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";


import logo from "../images/gus.png";

const UsernameField = () => {
  const { t } = useTranslation();
  return <Field
    name="username"
    autoComplete="username"
    required
    placeholder={t('loginPage.loginForm.username')}
    id="username"
    className="form-control"
  />
};

const PasswordField = () => {
  const { t } = useTranslation();
  return <Field
    type="password"
    name="password"
    autoComplete="current-password"
    required
    placeholder={t('loginPage.loginForm.password')}
    id="password"
    className="form-control"
  />
};

const LoginBtn = () => {
  const { t } = useTranslation();
  return <button
    type="submit"
    className="w-100 mb-3 btn btn-outline-primary"
  >
    {t('loginPage.loginForm.login')}
  </button>
}

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

const LoginCardImage = () => {
  const { t } = useTranslation();

  return (
    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      <img src={logo} alt={t('loginPage.loginForm.login')} sizes='200px'></img>
    </div>
  )
};

const LoginCardBody = () => {
  return (
    <div className="card-body row p-5">
      <LoginCardImage />
      <LoginCardForm />
    </div>
  )
}

const LoginCardFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('loginPage.loginCardFooter.noAccount')}</span>
        <a href="/signup">{t('loginPage.loginCardFooter.registration')}</a>
      </div>
    </div>
  )
}

const LoginCard = () => (
  <div className="card shadow-sm">
    <LoginCardBody />
    <LoginCardFooter />
  </div>
)

export default LoginCard;
