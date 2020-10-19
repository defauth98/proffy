import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Aside from '../../../components/Aside';
import FormInput from '../../../components/FormInput';

import backIcon from '../../../assets/images/icons/back.svg';

import './styles.css';
import api from '../../../services/api';

interface pageParams {
  token: string;
}

const RecoveryPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const history = useHistory();
  const { token } = useParams<pageParams>();

  async function handleRecoveryPassword() {
    if (password === passwordConfirm) {
      await api
        .post(
          'recovery_password',
          {
            password,
          },
          {
            params: { token },
          }
        )
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="recovery-password">
      <div className="recovery-form">
        <header className="header">
          <Link to="/">
            <img src={backIcon} alt="Ícone para voltar" />
          </Link>
        </header>

        <div className="title-container">
          <h2 className="title">Coloque sua nova senha.</h2>
        </div>

        <div className="inputs">
          <FormInput
            label="Senha"
            id="input-email"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
          />
          <FormInput
            label="Confirmação da senha"
            id="input-email"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordConfirm}
            type="password"
          />
        </div>

        <div className="button-container">
          <button
            type="button"
            onClick={() => {
              handleRecoveryPassword();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
      <Aside />
    </div>
  );
};

export default RecoveryPassword;
