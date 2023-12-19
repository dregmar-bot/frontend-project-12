import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signup from '../images/signup.png';
import UserContext from '../contexts/userContext.js';
import authorize from '../utilts/authorize';

const SignupCardForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, `${t('yupErrors.minSymbols', { count: 3 })} ${t('yupErrors.maxSymbols.key', { count: 20 })}`)
      .max(20, `${t('yupErrors.minSymbols', { count: 3 })} ${t('yupErrors.maxSymbols.key', { count: 20 })}`),
    password: Yup.string()
      .min(6, `${t('yupErrors.passwordLengthMin')}`)
      .max(50, `${t('yupErrors.passwordLengthMax')}`),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], `${t('yupErrors.passwordMismatch')}`),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        const { username, password } = values;
        setSubmitting(true);
        try {
          const response = await axios.post('/api/v1/signup', { username, password });
          const { token } = response.data;
          const activeUser = { username, password, token };
          authorize(activeUser, setUser);
          navigate('/');
        } catch (e) {
          switch (e.code) {
            case 'ERR_NETWORK':
              toast.error(t(`signupPage.errors.${e.code}`));
              break;
            case 'ERR_BAD_REQUEST':
              toast.error(t(`signupPage.errors.${e.code}`));
              break;
            default:
              toast.error(t('signupPage.errors.unknownError'));
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
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder={t('signupPage.signupCard.username')}
              id="username"
              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
            />
            <label className="form-label" htmlFor="username">{t('signupPage.signupCard.username')}</label>
            <ErrorMessage
              component="div"
              name="username"
              className="invalid-feedback"
            />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              autoComplete="new-password"
              required
              placeholder={t('signupPage.signupCard.password')}
              id="password"
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
            />
            <label className="form-label" htmlFor="password">{t('signupPage.signupCard.password')}</label>
            <ErrorMessage
              component="div"
              name="password"
              className="invalid-feedback"
            />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              placeholder={t('signupPage.signupCard.password')}
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword && touched.password ? 'is-invalid' : ''}`}
            />
            <label htmlFor="confirmPassword" className="form-label">{t('signupPage.signupCard.confirmPassword')}</label>
            <ErrorMessage
              component="div"
              name="confirmPassword"
              className="invalid-feedback"
            />
          </div>
          <button
            type="submit"
            className="w-100 btn btn-outline-primary"
            disabled={submitting}
          >
            {t('signupPage.signupCard.register')}
          </button>
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
    <ToastContainer />
  </div>
);

export default SignupCard;
