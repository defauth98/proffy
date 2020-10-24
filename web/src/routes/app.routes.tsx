import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../pages/AppPages/Landing';
import TeacherList from '../pages/AppPages/TeacherList';
import TeacherForm from '../pages/AppPages/TeacherForm';
import UserPerfil from '../pages/AppPages/UserPerfil';
import TeacherFormSuccess from '../pages/AppPages/TeacherFormSuccess';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/perfil" exact component={UserPerfil} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/give-classes-succes" component={TeacherFormSuccess} />
    </BrowserRouter>
  );
}

export default Routes;
