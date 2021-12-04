import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
