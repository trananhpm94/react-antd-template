import { init } from '@rematch/core';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory';

import reducers from './reducers';

export const history = createHistory();

const router = routerMiddleware(history);

const middlewares = [router, thunk];
const isLogger = false;
if (isLogger && process.env.NODE_ENV === 'development') {
  const { logger } = import('redux-logger');
  middlewares.push(logger);
}
const initReducer = reducers(history);

export const store = init({
  models: initReducer.models,
  redux: {
    middlewares,
    ...initReducer.redux,
  },
});

export const { dispatch } = store;
