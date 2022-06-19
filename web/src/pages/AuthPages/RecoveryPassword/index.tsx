import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Aside from '../../../components/Aside';
import FormInput from '../../../components/FormInput';

import './styles.css';
import api from '../../../services/api';

function RecoveryPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

  const { token } = useParams();

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
          },
        )
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className='recovery-password'>
      <div className='recovery-form'>
        <header className='header'>
          <Link to='/'>
            <img src='images/icons/back.png' alt='Ícone para voltar' />
          </Link>
        </header>

        <div className='title-container'>
          <h2 className='title'>Coloque sua nova senha.</h2>
        </div>

        <div className='inputs'>
          <FormInput
            label='Senha'
            id='input-email'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type='password'
            isPassword
          />
          <FormInput
            label='Confirmação da senha'
            id='input-email'
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordConfirm}
            type='password'
            isPassword
          />
        </div>

        <div className='button-container'>
          <button
            type='button'
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
}

export default RecoveryPassword;
