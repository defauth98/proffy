import React from 'react';
import { useHistory } from 'react-router-dom';

import checkedIcon from '../../../assets/images/icons/success-check-icon.svg';

import './styles.css';

const TeacherFormSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <div className="success-page">
      <div className="success-background">
        <img src={checkedIcon} alt="Ícone de check" />
        <h2>Cadastro salvo!</h2>
        <p>
          Tudo certo, seu cadastro está na nossa lista de professores. Agora é
          só ficar de olho no seu WhatsApp.
        </p>
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          Accessar
        </button>
      </div>
    </div>
  );
};

export default TeacherFormSuccess;
