import React from 'react';
import { BrowserRouter, Routes as RoutesElement, Route } from 'react-router-dom';

import Landing from '../pages/AppPages/Landing/LandingPage';
import TeacherForm from '../pages/AppPages/TeacherForm/TeacherForm';
import UserPerfil from '../pages/AppPages/UserPerfil/UserPerfil';
import TeacherFormSuccess from '../pages/AppPages/TeacherFormSuccess';
import ListClasses from '../pages/AppPages/ListClasses/ListClasses';

function Routes() {
  return (
    <BrowserRouter>
      <RoutesElement>
        <Route path='/' element={<Landing />} />
        <Route path='/perfil' element={<UserPerfil />} />
        <Route path='/study' element={<ListClasses />} />
        <Route path='/give-classes' element={<TeacherForm />} />
        <Route path='/give-classes-success' element={<TeacherFormSuccess />} />
      </RoutesElement>
    </BrowserRouter>
  );
}

export default Routes;
