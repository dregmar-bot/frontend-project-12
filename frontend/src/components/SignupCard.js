import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { Button, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signup from '../images/signup.png';
import AuthContext from '../contexts/authContext.js';
import routes from '../routes';

const SignupCardForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { authorize } = useContext(AuthContext);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'usernameLength')
      .max(20, 'usernameLength'),
    password: Yup.string()
      .min(6, 'passwordLengthMin')
      .max(50, 'passwordLengthMax'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'passwordMismatch'),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { username, password } = values;
        try {
          const response = await axios.post(routes.serverApi.signupPath(), { username, password });
          const { token } = response.data;
          authorize({ username, token });
          navigate(routes.chatPath());
        } catch (e) {
          if (e.response?.status === 409) {
            toast.error(t('signupPage.errors.signupError'));
          } else if (!e.isAxiosError) {
            toast.error(t('signupPage.errors.undefinedError'));
          } else {
            toast.error(t('signupPage.errors.networkError'));
          }
        }
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form
          className="col-12 col-md-6 mt-3 mt-mb-0"
        >
          <h1 className="text-center mb-4">{t('signupPage.signupCard.signup')}</h1>
          <FloatingLabel className="mb-3" label={t('signupPage.signupCard.username')}>
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder={t('signupPage.signupCard.username')}
              id="username"
              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
            />
            <ErrorMessage
              name="username"
              render={(msg) => <div className="invalid-feedback">{t(`yupErrors.${msg}`)}</div>}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-3" label={t('signupPage.signupCard.password')}>
            <Field
              type="password"
              name="password"
              autoComplete="new-password"
              required
              placeholder={t('signupPage.signupCard.password')}
              id="password"
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="invalid-feedback">{t(`yupErrors.${msg}`)}</div>}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-4" label={t('signupPage.signupCard.confirmPassword')}>
            <Field
              type="password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              placeholder={t('signupPage.signupCard.password')}
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword && touched.password ? 'is-invalid' : ''}`}
            />
            <ErrorMessage
              name="confirmPassword"
              render={(msg) => <div className="invalid-feedback">{t(`yupErrors.${msg}`)}</div>}
            />
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100"
          >
            {t('signupPage.signupCard.register')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const SignupCardBody = () => {
  const { t } = useTranslation();

  return (
    <div className="card-body row p-5">
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src={signup} alt={t('signupPage.signupCard.signup')} sizes="200px" />
      </div>
      <SignupCardForm />
    </div>
  );
};

const SignupCard = () => (
  <div className="card shadow-sm">
    <SignupCardBody />
  </div>
);

export default SignupCard;
