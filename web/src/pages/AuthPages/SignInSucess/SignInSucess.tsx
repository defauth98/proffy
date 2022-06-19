import React from 'react';

import './SignInSuccess.css';

function SignInSucess() {
  return (
    <div className='success-page'>
      <div className='success-background'>
        <img src='images/icons/success-check-icon.png' alt='Ícone de check' />
        <h2>Cadastro concluído</h2>
        <p>
          Agora você faz parte da plataforma da Proffy. Tenha uma ótima
          experiência.
        </p>
        <button type='button'>Fazer login</button>
      </div>
    </div>
  );
}

export default SignInSucess;
