import React from 'react';

import checkedIcon from '../../../assets/images/icons/success-check-icon.svg';

import './styles.css';

const SignInSucess: React.FC = () => {
  return (
    <div className="success-page">
      <div className="success-background">
        <img src={checkedIcon} alt="Ícone de check" />
        <h2>Cadastro concluído</h2>
        <p>
          Agora você faz parte da plataforma da Proffy. Tenha uma ótima
          experiência.
        </p>
        <button>Fazer login</button>
      </div>
    </div>
  );
};

export default SignInSucess;
