import React from 'react';

import './styles.css';

import logo from '../../assets/images/logo.svg';

// fazer o componente ficar responsive

const Aside: React.FC = () => {
  return (
    <aside>
      <div className="background-image">
        <img src={logo} alt="proffy-logo" />
        <p>Sua plataforma de estudo online.</p>
      </div>
    </aside>
  );
};

export default Aside;
