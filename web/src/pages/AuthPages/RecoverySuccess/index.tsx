import React from 'react';
import { Link } from 'react-router-dom';

import checkedIcon from '../../../assets/images/icons/success-check-icon.svg';

import './styles.css';

const RecoverySuccess: React.FC = () => {
  return (
    <div className="recovery-success">
      <div className="recovery-background">
        <img src={checkedIcon} alt="Ícone de check" />
        <h2>Redefinição enviada!</h2>
        <p>
          Boa, agora é só checar o e-mail que foi enviado para você redefinir
          sua senha e aproveitar os estudos.
        </p>
        <button>
          <Link to="/">Voltar ao login</Link>
        </button>
      </div>
    </div>
  );
};

export default RecoverySuccess;
