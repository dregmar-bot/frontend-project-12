import React from 'react';
import { useTranslation } from 'react-i18next';


const LoginBtn = () => {
  const { t } = useTranslation();
  return <button
    type="submit"
    className="w-100 mb-3 btn btn-outline-primary"
  >
    {t('loginPage.loginForm.login')}
  </button>
}
export default LoginBtn;
