import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../../services/api';

import './lading-page.css';
import { useAuth } from '../../../contexts/auth';

import signOutIcon from '../../../assets/images/icons/sign-out.png';
import purpleHeartIcon from '../../../assets/images/icons/purple-heart.png';
import studyIcon from '../../../assets/images/icons/study.png';
import giveClassesIcon from '../../../assets/images/icons/give-classes.png';
import logoIcon from '../../../assets/images/logo.png';
import landingIcon from '../../../assets/images/landing.png';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id='page-landing'>
      <header>
        <div className='user-container'>
          <Link className='user-button' to='/perfil'>
            <h2>{`${user?.name} ${user?.surname}`}</h2>
          </Link>
        </div>
        <div className='logout-container'>
          <button type='button' className='logout-button' onClick={signOut}>
            <div className='logout'>
              <img src={signOutIcon} alt='Icone para voltar' />
            </div>
          </button>
        </div>
      </header>
      <main id='page-landing-content' className='content-container'>
        <div className='logo-container'>
          <img src={logoIcon} alt='Proffy' />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingIcon}
          alt='Plataforma de estudos'
          className='hero-image'
        />
      </main>
      <footer>
        <div className='footer-wrapper'>
          <div className='welcome-container'>
            <div className='title'>
              <h1>Seja bem-vindo.</h1>
              <h3>O que deseja fazer?</h3>
            </div>

            <span className='total-connections'>
              Total de
              {totalConnections}
              conexões já realizadas
              <img src={purpleHeartIcon} alt='Coração roxo' />
            </span>
          </div>

          <div className='buttons-container'>
            <Link to='/study' className='study'>
              <img src={studyIcon} alt='Estudar' />
              Estudar
            </Link>

            <Link to='/give-classes' className='give-classes'>
              <img src={giveClassesIcon} alt='Dar aulas' />
              Dar aulas
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
