import React from 'react';
import { BrowserRouter, Routes as RoutesElement, Route } from 'react-router-dom';

import Login from '../pages/AuthPages/Login/LoginPage';
import SignIn from '../pages/AuthPages/SignIn/SignInPage';
import SignInSucces from '../pages/AuthPages/SignInSucess/SignInSucess';
import ForgetPassword from '../pages/AuthPages/ForgetPassword/ForgetPassword';
import RecoveryPassword from '../pages/AuthPages/RecoveryPassword';
import RecoverySuccess from '../pages/AuthPages/RecoverySuccess';

function Routes() {
  return (
    <BrowserRouter>
      <RoutesElement>
        <Route path='/' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signinSuccess' element={<SignInSucces />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/recovery-password/:token' element={<RecoveryPassword />} />
        <Route path='/recovery-success' element={<RecoverySuccess />} />
      </RoutesElement>
    </BrowserRouter>
  );
}

export default Routes;
