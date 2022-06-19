import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

import sucessIcon from '../../../assets/images/icons/success-check-icon.png';

function TeacherFormSuccess() {
  const navigate = useNavigate();

  return (
    <div className='success-page'>
      <div className='success-background'>
        <img src={sucessIcon} alt='Ícone de check' />
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
