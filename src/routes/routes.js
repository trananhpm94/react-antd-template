import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedSwitch } from 'reactRouterConnected';
import Page from 'components/LayoutComponents/Page';
import NotFoundPage from 'modules/DefaultPages/NotFoundPage';

import { routeData } from 'routes/routeData';

class Routes extends React.Component {
  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(routeData).forEach(path => routeData[path].component.preload()),
      10 // load after 5 sec
    );
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  timeoutId = null;

  render() {
    return (
      <ConnectedSwitch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Redirect exact from="/" to="/default-home" />
        {Object.keys(routeData).map(path => {
          let { exact = true } = routeData[path];
          const { component: WrappedComponent, ...routeProps } = routeData[path];
          exact = !!exact; // set true as default
          const WrapperComponent = props => (
            <Page {...routeProps} {...props}>
              <WrappedComponent {...routeProps} {...props} />
            </Page>
          );
          return <Route key={path} path={path} exact={exact} component={WrapperComponent} />;
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    );
  }
}

export { routeData };
export default Routes;
