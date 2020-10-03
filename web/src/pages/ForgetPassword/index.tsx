import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Aside from '../../components/Aside';
import FormInput from '../../components/FormInput';

import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';
import api from '../../services/api';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const history = useHistory();

  function handleRecoveryPassword() {
    api.post('/forget_password', { email }).then(() => {
      history.push('/recovery-success');
    });
  }

  return (
    <div className="forget-password">
      <div className="forget-form">
        <header className="header">
          <Link to="/">
            <img src={backIcon} alt="Ícone para voltar" />
          </Link>
        </header>

        <div className="title-container">
          <h2 className="title">Eita, esqueceu sua senha?</h2>
        </div>

        <p>Não esquenta, vamos dar um jeito nisso.</p>

        <div className="inputs">
          <FormInput
            label="E-mail"
            id="input-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>

        <div className="button-container">
          <button
            type="button"
            onClick={() => {
              handleRecoveryPassword();
            }}
          >
            Enviar
          </button>
        </div>
      </div>
      <Aside />
    </div>
  );
};

export default ForgetPassword;
