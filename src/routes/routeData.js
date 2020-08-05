import Loadable from 'react-loadable';
import { routePageDefault } from './routePageDefault';


// eslint-disable-next-line no-unused-vars
const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  });
  

export const routeData = {
  // default pages
  ...routePageDefault,
};
