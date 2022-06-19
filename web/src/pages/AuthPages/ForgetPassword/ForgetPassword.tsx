import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Aside from '../../../components/Aside';
import FormInput from '../../../components/FormInput';

import api from '../../../services/api';

import './ForgetPassword.css';

import backIcon from '../../../assets/images/icons/back.png';

function ForgetPassword() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  function handleRecoveryPassword() {
    api.post('/forget_password', { email }).then(() => {
      navigate('/recovery-success');
    });
  }

  return (
    <div className='forget-password'>
      <div className='forget-form'>
        <header className='header'>
          <Link to='/'>
            <img src={backIcon} alt='Ícone para voltar' />
          </Link>
        </header>

        <div className='title-container'>
          <h2 className='title'>Eita, esqueceu sua senha?</h2>
        </div>

        <p>Não esquenta, vamos dar um jeito nisso.</p>

        <div className='inputs'>
          <FormInput
            label='E-mail'
            id='input-email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            isPassword={false}
          />
        </div>

        <div className='button-container'>
          <button
            type='button'
            onClick={() => {
              handleRecoveryPassword();
            }}
          >
            Enviar
          </button>
        </div>
      </div>
      <div className='aside-wrapper'>
        <Aside />
      </div>
    </div>
  );
}

export default ForgetPassword;
