import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/AuthPages/Login';
import SignIn from '../pages/AuthPages/SignIn';
import SignInSucces from '../pages/AuthPages/SignInSucess';
import ForgetPassword from '../pages/AuthPages/ForgetPassword';
import RecoveryPassword from '../pages/AuthPages/RecoveryPassword';
import RecoverySuccess from '../pages/AuthPages/RecoverySuccess';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signinSuccess" exact component={SignInSucces} />
      <Route path="/forget-password" exact component={ForgetPassword} />
      <Route
        path="/recovery-password/:token"
        exact
        component={RecoveryPassword}
      />
      <Route path="/recovery-success" exact component={RecoverySuccess} />
    </BrowserRouter>
  );
}

export default Routes;
