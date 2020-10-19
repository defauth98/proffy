import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../pages/AppPages/Landing';
import TeacherList from '../pages/AppPages/TeacherList';
import TeacherForm from '../pages/AppPages/TeacherForm';
import UserPerfil from '../pages/AppPages/UserPerfil';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/perfil" exact component={UserPerfil} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;
