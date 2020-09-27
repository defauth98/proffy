import React from 'react';

import Aside from '../../components/Aside';
import FormInput from '../../components/FormInput';

import './styles.css';

const Login: React.FC = () => {
  return (
    <div className="login-page">
      <Aside />
      <div className="login-form">
        <h2 className="title">Fazer login</h2>
        <div className="inputs">
          <FormInput label="E-mail" />
          <FormInput label="Senha" />
        </div>
        <div className="buttons-wrapper">
          <div className="checkbox-container">
            <input type="checkbox" id="remenber" />
            <label htmlFor="remenber">Lembrar-me</label>
          </div>
          Esqueci minha senha
        </div>
      </div>
    </div>
  );
};

export default Login;
