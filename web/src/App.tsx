import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer/>
    </AuthProvider>
  );
}

export default App;
