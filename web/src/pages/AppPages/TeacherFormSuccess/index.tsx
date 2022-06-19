import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

function TeacherFormSuccess() {
  const navigate = useNavigate();

  return (
    <div className='success-page'>
      <div className='success-background'>
        <img src='images/icons/success-check-icon.png' alt='Ícone de check' />
        <h2>Cadastro salvo!</h2>
        <p>
          Tudo certo, seu cadastro está na nossa lista de professores. Agora é
          só ficar de olho no seu WhatsApp.
        </p>
        <button
          onClick={() => {
            navigate('/');
          }}
          type='button'
        >
          Accessar
        </button>
      </div>
    </div>
  );
}

export default TeacherFormSuccess;
