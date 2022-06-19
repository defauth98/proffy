import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function RecoverySuccess() {
  return (
    <div className='recovery-success'>
      <div className='recovery-background'>
        <img src='images/icons/success-check-icon.png' alt='Ícone de check' />
        <h2>Redefinição enviada!</h2>
        <p>
          Boa, agora é só checar o e-mail que foi enviado para você redefinir
          sua senha e aproveitar os estudos.
        </p>
        <button type='button'>
          <Link to='/'>Voltar ao login</Link>
        </button>
      </div>
    </div>
  );
}

export default RecoverySuccess;
