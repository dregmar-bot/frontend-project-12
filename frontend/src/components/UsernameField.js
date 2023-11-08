import { Field } from 'formik';
import React from 'react';
import { useTranslation } from "react-i18next";

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

export default UsernameField;
