import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Aside from '../../../components/Aside';
import FormInput from '../../../components/FormInput';

import { useAuth } from '../../../contexts/auth';

import './SignInPage.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const { signUp } = useAuth();

  const navigate = useNavigate();

  function handleSign() {
    signUp(name, surname, email, password);

    navigate('/');
  }

  return (
    <div className='sign-page'>
      <div className='sign-form'>
        <Link to='/'>
          <img src='images/icons/back.png' alt='Ícone para voltar' />
        </Link>

        <div className='title-container'>
          <h2>Cadastro</h2>
          <p>Preencha os dados abaixo para começar.</p>
        </div>

        <div className='inputs'>
          <FormInput
            label='Nome'
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            isPassword={false}
          />
          <FormInput
            label='Sobrenome'
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            value={surname}
            isPassword={false}
          />
          <FormInput
            label='E-mail'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            isPassword={false}
          />
          <FormInput
            label='Senha'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            isPassword
          />
        </div>
        <div className='button-container'>
          <button
            id='login-button'
            className='login-button'
            type='button'
            onClick={() => {
              handleSign();
            }}
          >
            Concluir cadastro
          </button>
        </div>
      </div>
      <div className='aside-wrapper'>
        <Aside />
      </div>
    </div>
  );
}

export default SignIn;
