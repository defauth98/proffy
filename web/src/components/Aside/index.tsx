import React from 'react';

import './styles.css';

import AsideLogo from '../../assets/images/asideLogo.png';

function Aside() {
  return (
    <aside>
      <div className='background-image'>
        <img src={AsideLogo} alt='proffy-logo' />
      </div>
    </aside>
  );
}

export default Aside;
