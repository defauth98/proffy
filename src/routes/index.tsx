import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../contexts/auth';

function Routes() {
  const { user } = useAuth();

  return user?.email ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
