import React, { useContext, useState } from 'react';
import { Button, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
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

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values) => {
        const { username, password } = values;
        try {
          const response = await axios.post(routes.serverApi.loginPath(), { username, password });
          const { token } = response.data;
          authorize({ username, token });
          navigate(routes.chatPath());
        } catch (e) {
          if (e.response?.status === 401) {
            setError('authorizationError');
          } else if (!e.isAxiosError) {
            toast.error(t('loginPage.errors.undefinedError'));
          } else {
            toast.error(t('loginPage.errors.networkError'));
          }
        }
      }}
    >
      {() => (
        <Form
          className="col-12 col-md-6 mt-3 mt-mb-0"
        >
          <h1 className="text-center mb-4">{t('loginPage.loginForm.login')}</h1>
          <FloatingLabel className="mb-3" label={t('loginPage.loginForm.username')}>
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder={t('loginPage.loginForm.username')}
              id="username"
              className={`form-control ${error ? 'is-invalid' : ''}`}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-4" label={t('loginPage.loginForm.password')}>
            <Field
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder={t('loginPage.loginForm.password')}
              id="password"
              className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error ? <div className="invalid-tooltip">{t(`loginPage.errors.${error}`)}</div> : null}
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
          >
            {t('loginPage.loginForm.login')}
          </Button>
        </Form>
      )}
    </Formik>
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
