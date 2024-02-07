import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import pageNotFound from '../images/404.png';
import routes from '../routes';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <NavigationBar />
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
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
