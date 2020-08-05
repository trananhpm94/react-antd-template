import React, { useState, useEffect } from 'react';
import { Layout as AntLayout } from 'antd';
import Routes from 'routes/routes';
import TopBar from 'components/LayoutComponents/TopBar';
import Menu from 'components/LayoutComponents/Menu';
import Content from 'components/LayoutComponents/Content';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import { LayoutContextProvider } from './context';
import './style.scss';

const AntContent = AntLayout.Content;
const AntHeader = AntLayout.Header;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

let isMobileInit;

const classNames = obj =>
  Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');

enquireScreen(b => {
  isMobileInit = b;
});

const Layout = () => {
  const [isMobile, setIsMobile] = useState(isMobileInit);

  useEffect(() => {
    const enquireHandler = enquireScreen(mobile => {
      setIsMobile(mobile);
    });
    return () => {
      unenquireScreen(enquireHandler);
    };
  }, []);

  return (
    <LayoutContextProvider>
      <ContainerQuery query={query}>
        {params => (
          <div className={classNames(params)}>
            <AntLayout>
              <Routes />
              <Menu isMobile={isMobile} />
              <AntLayout style={{ width: '100%' }}>
                <AntHeader>
                  <TopBar />
                </AntHeader>
                <AntContent style={{ height: '100%' }}>
                  <Content />
                </AntContent>
              </AntLayout>
            </AntLayout>
          </div>
        )}
      </ContainerQuery>
    </LayoutContextProvider>
  );
};

export default Layout;
