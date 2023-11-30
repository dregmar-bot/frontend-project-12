import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import UserContext from '../contexts/userContext.js';
import axios from "axios";
import authorize from '../utilts/authorize';
import {toast, ToastContainer } from 'react-toastify';

const LoginCardForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  return <Formik
    initialValues={{ username: '', password: ''}}
    onSubmit={async (values) => {
      const { username, password  } = values;
      try {
        const response = await axios.post('/api/v1/login', { username, password })
        const { token } = response.data;
        const activeUser = { username, password, token };
        authorize(activeUser, setUser);
        navigate('/');
      } catch (e) {
        switch (e.code) {
          case 'ERR_BAD_REQUEST':
            setError(e.code);
            break;
          case 'ERR_NETWORK' :
            toast.error(t(`loginPage.errors.${e.code}`));
            break;
          default:
            toast.error(t(`loginPage.errors.unknownError`));
        }
      }
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
            className={`form-control ${ error ? "is-invalid" : ''}`}
          />
          <label className="form-label" htmlFor="username">{t('loginPage.loginForm.username')}</label>
        </div>
        <div className="form-floating mb-4">
          <Field
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder={t('loginPage.loginForm.password')}
            id="password"
            className={`form-control ${ error ? "is-invalid" : ''}`}
          />
          {error ? <div className="invalid-tooltip">{t(`loginPage.errors.${error}`)}</div> : null}
          <label className="form-label" htmlFor="password">{t('loginPage.loginForm.password')}</label>
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
        <> </>
        <a href="/signup">{t('loginPage.loginCardFooter.registration')}</a>
      </div>
    </div>
  )
}

const LoginCard = () => (
  <div className="card shadow-sm">
    <LoginCardBody />
    <LoginCardFooter />
    <ToastContainer/>
  </div>
)

export default LoginCard;
