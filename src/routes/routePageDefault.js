import Loadable from 'react-loadable';

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  });

export const routePageDefault = {
  // default pages
  '/default-home': {
    component: loadable(() => import('modules/DefaultPages/HomePage')),
  },
  // '/default-login': {
  //   component: loadable(() => import('modules/DefaultPages/LoginPage')),
  // },
};
