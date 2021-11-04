import React from 'react';

import './styles.css';

import logo from '../../assets/images/asideLogo.svg';

// fazer o componente ficar responsive

const Aside: React.FC = () => {
  return (
    <aside>
      <div className='background-image'>
        <img src={logo} alt='proffy-logo' />
      </div>
    </aside>
  );
};

export default Aside;
