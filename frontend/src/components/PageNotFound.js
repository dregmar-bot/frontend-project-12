import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import pageNotFound from '../images/404.png';
import Layout from './Layout';
import routes from '../routes';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="text-center">
        <img
          alt="Страница не найдена"
          className="img-fluid h-25"
          src={pageNotFound}
        />
        <h1 className="h4 text-muted">{t('pageNotFound.pageNotFound')}</h1>
        <p className="text-muted">{t('pageNotFound.youCanGo')}</p>
        <Link to={routes.chatPath()}>{t('pageNotFound.toMainPage')}</Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
