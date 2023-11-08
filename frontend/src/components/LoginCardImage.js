import React from 'react';
import { useTranslation} from 'react-i18next';
import logo from '../images/gus.png';

const LoginCardImage = () => {
  const { t } = useTranslation();

  return (
  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
    <img src={logo} alt={t('loginPage.loginForm.login')} sizes='200px'></img>
  </div>
  )
};

export default LoginCardImage;
