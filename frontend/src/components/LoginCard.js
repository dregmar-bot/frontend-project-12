import React, { useContext, useState } from 'react';
import {Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../images/logo.png';
import AuthContext from '../contexts/authContext.js';
import routes from '../routes';

const LoginCardForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { authorize } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async ({ username, password }) => {
      formik.setSubmitting(true);
      try {
        const response = await axios.post(routes.serverApi.loginPath(), { username, password });
        const { token } = response.data;
        authorize({ username, token });
        formik.setSubmitting(false);
        navigate(routes.chatPath());
      } catch (e) {
        if (e.response?.status === 401) {
          setError('authorizationError');
        } else if (!e.isAxiosError) {
          toast.error(t('loginPage.errors.undefinedError'));
        } else {
          toast.error(t('loginPage.errors.networkError'));
        }
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('loginPage.loginForm.login')}</h1>
      <FloatingLabel className="mb-3" label={t('loginPage.loginForm.username')}>
        <Form.Control
          name="username"
          autoComplete="username"
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder={t('loginPage.loginForm.username')}
          id="username"
          className={`form-control ${error ? 'is-invalid' : ''}`}
        />
      </FloatingLabel>
      <FloatingLabel className="mb-4" label={t('loginPage.loginForm.password')}>
        <Form.Control
          type="password"
          name="password"
          required
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder={t('loginPage.loginForm.password')}
          id="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
        />
        {error ? <div className="invalid-tooltip">{t(`loginPage.errors.${error}`)}</div> : null}
      </FloatingLabel>
      <Button
        type="submit"
        disabled={formik.isSubmitting}
        variant="outline-primary"
        className="w-100 mb-3"
      >
        {t('loginPage.loginForm.login')}
      </Button>
    </Form>
  );
};

const LoginCardBody = () => {
  const { t } = useTranslation();

  return (
    <div className="card-body row p-5">
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src={logo} alt={t('loginPage.loginForm.login')} sizes="200px" />
      </div>
      <LoginCardForm />
    </div>
  );
};

const LoginCardFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('loginPage.loginCardFooter.haveNoAccount')} </span>

        <Link to={routes.signupPath()}>{t('loginPage.loginCardFooter.registration')}</Link>
      </div>
    </div>
  );
};

const LoginCard = () => (
  <div className="card shadow-sm">
    <LoginCardBody />
    <LoginCardFooter />
  </div>
);

export default LoginCard;
