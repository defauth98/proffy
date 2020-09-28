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

  const { login, signed } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (signed) history.push('/landing');
  }, [history, signed]);

  function handleLogin() {
    login(email, password);
  }

  return (
    <div className="login-page">
      <Aside />
      <div className="login-form">
        <h2 className="title">Fazer login</h2>

        <div className="inputs">
          <FormInput
            label="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <FormInput
            label="Senha"
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
              <Link to="#">Esqueci minha senha</Link>
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
            <Link to="#asdsa" className="sign-link">
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
