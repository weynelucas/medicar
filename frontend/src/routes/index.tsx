import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes: React.FC = () => {
  return (
    <Switch>
      <PublicRoute path="/" exact restricted component={Login} />
      <PublicRoute path="/signup" restricted component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
