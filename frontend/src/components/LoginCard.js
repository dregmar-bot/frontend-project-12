import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import logo from '../images/logo.png';
import UserContext from '../contexts/index.js';
import axios from "axios";

const LoginCardForm = () => {
  const { t } = useTranslation();
  //const { activeUser, setUser, isAuthorized } = useContext(UserContext);

  return <Formik
    initialValues={{ email: '', password: ''}}
    onSubmit={async (values) => {
      const { username, password  } = values;
      let data = {};
      await axios.post('/api/v1/login', { username, password })
        .then((response) => data = response.data);
      // console.log(data);
      }
    }
  >
    {() => (
      <Form
        className="col-12 col-md-6 mt-3 mt-mb-0"
      >
        <h1 className="text-center mb-4">{t('loginPage.loginForm.login')}</h1>
        <div className="form-floating mb-3">
          <Field
            name="username"
            autoComplete="username"
            required
            placeholder={t('loginPage.loginForm.username')}
            id="username"
            className="form-control"
          />
          <label htmlFor="username">{t('loginPage.loginForm.username')}</label>
        </div>
        <div className="form-floating mb-4">
          <Field
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder={t('loginPage.loginForm.password')}
            id="password"
            className="form-control"
          />
          <label htmlFor="password">{t('loginPage.loginForm.password')}</label>
        </div>
        <button
          type="submit"
          className="w-100 mb-3 btn btn-outline-primary"
        >
          {t('loginPage.loginForm.login')}
        </button>
      </Form>
    )}
  </Formik>
};

const LoginCardBody = () => {
  const { t } = useTranslation();

  return (
    <div className="card-body row p-5">
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src={logo} alt={t('loginPage.loginForm.login')} sizes='200px'></img>
      </div>
      <LoginCardForm />
    </div>
  )
}

const LoginCardFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('loginPage.loginCardFooter.haveNoAccount')}</span>
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
