import React, { useContext, useEffect, useState } from 'react';

import Aside from '../../components/Aside';
import FormInput from '../../components/FormInput';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import { AuthContext } from '../../contexts/auth';
import { Link, useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const { login, signed, user, subject } = useContext(AuthContext);

  useEffect(() => {
    if (signed && user && subject) {
      history.push('/landing');
    }
  }, [signed, user, subject, history]);

  function handleLogin() {
    login(email, password);
  }

  return (
    <div className="login-page">
      <Aside />
      <div className="login-form">
        <div className="title-container">
          <h2>Fazer login</h2>
        </div>

        <div className="inputs">
          <FormInput
            label="E-mail"
            id="input-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <FormInput
            label="Senha"
            id="input-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
          />
        </div>
        <div className="buttons-container">
          <div className="first-line">
            <div className="checkbox-container">
              <input type="checkbox" id="remenber" />
              <label htmlFor="remenber">Lembrar-me</label>
            </div>
            <div className="forget-container">
              <Link to="forget-password">Esqueci minha senha</Link>
            </div>
          </div>

          <div className="second-line">
            <button
              type="button"
              onClick={() => {
                handleLogin();
              }}
            >
              Entrar
            </button>
          </div>
        </div>

        <div className="footer">
          <div className="signup-container">
            <span>Não tem conta?</span>
            <Link to="signin" className="sign-link">
              Cadastre-se
            </Link>
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
