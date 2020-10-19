import React, { useEffect, useState } from 'react';

import Aside from '../../../components/Aside';
import FormInput from '../../../components/FormInput';

import purpleHeartIcon from '../../../assets/images/icons/purple-heart.svg';

import './styles.css';
import { useAuth } from '../../../contexts/auth';
import { Link, useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState('');

  const history = useHistory();
  const { signIn, signed, user } = useAuth();

  useEffect(() => {
    if (signed && user) {
      history.push('/landing');
    }
  }, [signed, user, history]);

  function handleLogin() {
    let isRemember;

    if (remember === 'true') {
      isRemember = true;
    } else {
      isRemember = false;
    }

    if (email.length < 6) {
      alert('Informe um email válido');
      return;
    }

    if (password.length < 3) {
      alert('Informe um password válido');
      return;
    }

    signIn(email, password, isRemember).catch((err) => {
      alert(err);
    });
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
              <input
                type="checkbox"
                id="remenber"
                value={remember}
                onChange={(e) => {
                  setRemember('true');
                }}
              />
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
