import React from 'react';

import Aside from '../../components/Aside';

import './styles.css';

const Login: React.FC = () => {
  return (
    <div className="login-page">
      <Aside />
      <div className="login-form"></div>
    </div>
  );
};

export default Login;
