import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import 'es6-promise/auto';
import { ConfigProvider } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';
import registerServiceWorker from 'registerServiceWorker';
import Layout from 'components/LayoutComponents/Layout';
import 'resources/_antd.less';

import { store, history } from './states/store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={enGB}>
        <div>
          <Helmet titleTemplate="React-template - %s" />
          <Layout />
        </div>
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

export default history;
