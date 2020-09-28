import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import SignInSucces from './pages/SignInSucess';
import ForgetPassword from './pages/forgetPassword';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signinSuccess" exact component={SignInSucces} />
      <Route path="/forget-password" exact component={ForgetPassword} />

      <Route path="/landing" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;
