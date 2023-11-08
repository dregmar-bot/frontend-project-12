import { Field } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

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

export default PasswordField;

