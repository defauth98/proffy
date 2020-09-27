import React from 'react';

import Aside from '../../components/Aside';
import FormInput from '../../components/FormInput';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

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
        <div className="buttons-container">
          <div className="first-line">
            <div className="checkbox-container">
              <input type="checkbox" id="remenber" />
              <label htmlFor="remenber">Lembrar-me</label>
            </div>
            <div className="forget-container">
              <a href="#">Esqueci minha senha</a>
            </div>
          </div>

          <div className="second-line">
            <button type="button">Entrar</button>
          </div>
        </div>

        <div className="footer">
          <div className="signup-container">
            <span>Não tem conta?</span>
            <a href="#">Cadastre-se</a>
          </div>
          <span>
            É de graça <img alt="Coração roxo" src={purpleHeartIcon} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
