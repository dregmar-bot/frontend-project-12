import React from 'react';
import { useTranslation } from 'react-i18next';


const LoginCardFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('loginPage.loginCardFooter.noAccount')}</span>
        <a href="/signup">{t('loginPage.loginCardFooter.registration')}</a>
      </div>
    </div>
  )
}

export default LoginCardFooter;
