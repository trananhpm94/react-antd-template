import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

const addLocation = connect(state => ({
  location: state.router.location,
}));

export const ConnectedSwitch = addLocation(({ location, ...props }) => <Switch {...props} />);
export const ConnectedRoute = addLocation(props => <Route {...props} />);
