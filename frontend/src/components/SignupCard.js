import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
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

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: SignupSchema,
    onSubmit: async ({ username, password }) => {
      formik.setSubmitting(true);
      try {
        const response = await axios.post(routes.serverApi.signupPath(), { username, password });
        const { token } = response.data;
        authorize({ username, token });
        formik.setSubmitting(false);
        navigate(routes.chatPath());
      } catch (e) {
        if (e.response?.status === 409) {
          toast.error(t('signupPage.errors.signupError'));
        } else if (!e.isAxiosError) {
          toast.error(t('signupPage.errors.undefinedError'));
        } else {
          toast.error(t('signupPage.errors.networkError'));
        }
        formik.setSubmitting(false);
      }
    }
  })

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
          placeholder={t('signupPage.signupCard.username')}
          id="username"
          className={`form-control ${formik.errors.username && formik.touched.username ? 'is-invalid' : ''}`}
        />
        {formik.errors.username ? <div className="invalid-tooltip">{t(`yupErrors.${formik.errors.username}`)}</div> : null}
      </FloatingLabel>
      <FloatingLabel className="mb-4" label={t('loginPage.loginForm.password')}>
        <Form.Control
          type="password"
          name="password"
          required
          autoComplete="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder={t('signupPage.signupCard.password')}
          id="password"
          className={`form-control ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
        />
        {formik.errors.password ? <div className="invalid-tooltip">{t(`yupErrors.${formik.errors.password}`)}</div> : null}
      </FloatingLabel>
      <FloatingLabel className="mb-4" label={t('signupPage.signupCard.confirmPassword')}>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          required
          autoComplete="confirmPassword"
          placeholder={t('signupPage.signupCard.password')}
          id="confirmPassword"
          className={`form-control ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'is-invalid' : ''}`}
        />
        {formik.errors.confirmPassword ? <div className="invalid-tooltip">{t(`yupErrors.${formik.errors.confirmPassword}`)}</div> : null}
      </FloatingLabel>
      <Button
        type="submit"
        disabled={formik.isSubmitting}
        variant="outline-primary"
        className="w-100"
      >
        {t('signupPage.signupCard.register')}
      </Button>
    </Form>
  );
};

const SignupCard = () => {
  const { t } = useTranslation();

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={signup} alt={t('signupPage.signupCard.signup')} sizes="200px" />
        </div>
        <SignupCardForm />
      </div>
    </div>
  );
};

export default SignupCard;
