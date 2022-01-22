import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../pages/AppPages/Landing/LandingPage';
import TeacherForm from '../pages/AppPages/TeacherForm/TeacherForm';
import UserPerfil from '../pages/AppPages/UserPerfil/UserPerfil';
import TeacherFormSuccess from '../pages/AppPages/TeacherFormSuccess';
import ListClasses from '../pages/AppPages/ListClasses/ListClasses';

function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Landing} />
      <Route path='/perfil' exact component={UserPerfil} />
      <Route path='/study' component={ListClasses} />
      <Route path='/give-classes' component={TeacherForm} />
      <Route path='/give-classes-success' component={TeacherFormSuccess} />
    </BrowserRouter>
  );
}

export default Routes;
