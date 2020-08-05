import { connectRouter } from 'connected-react-router';
import app from './app';

const reducers = history => ({
  redux: {
    reducers: {
      router: connectRouter(history),
      app,
    },
  },
  models: {
    app
  },
});

export default reducers;
