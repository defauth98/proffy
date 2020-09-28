import React, { useContext, useEffect, useState } from 'react';

import Aside from '../../components/Aside';
import FormInput from '../../components/FormInput';

import './styles.css';
import { AuthContext } from '../../contexts/auth';
import { Link, useHistory } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const { SignIn, signed } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (signed) history.push('/landing');
  }, [history, signed]);

  function handleSign() {
    SignIn(email, password, name, surname);
  }

  return (
    <div className="sign-page">
      <div className="sign-form">
        <Link to="/">
          <img src={backIcon} alt="Ícone para voltar" />
        </Link>

        <div className="title-container">
          <h2>Cadastro</h2>
          <p>Preencha os dados abaixo para começar.</p>
        </div>

        <div className="inputs">
          <FormInput
            label="Nome"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <FormInput
            label="Sobrenome"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            value={surname}
          />
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
        <div className="button-container">
          <button
            id="login-button"
            className="login-button"
            onClick={() => {
              handleSign();
            }}
          >
            Concluir cadastro
          </button>
        </div>
      </div>
      <Aside />
    </div>
  );
};

export default SignIn;
