import React from 'react';

import checkedIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

const SignInSucess: React.FC = () => {
  return (
    <div className="success-page">
      <div className="success-background">
        <img src={checkedIcon} alt="Ícone de check" />
        <h2>Redefinição enviada!</h2>
        <p>
          Boa, agora é só checar o e-mail que foi enviado para você redefinir
          sua senha e aproveitar os estudos.
        </p>
        <button>Voltar ao login</button>
      </div>
    </div>
  );
};

export default SignInSucess;
