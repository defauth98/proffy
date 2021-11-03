import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

import logoImg from '../../../assets/images/logo.svg';
import landingImg from '../../../assets/images/landing.svg';

import studyIcon from '../../../assets/images/icons/study.svg';
import giveClassesIcon from '../../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../../assets/images/icons/purple-heart.svg';

import defaltAvatar from '../../../assets/images/default-avatar.png';

import logoutIcon from '../../../assets/images/icons/sign-out.svg';

import './styles.css';
import { useAuth } from '../../../contexts/auth';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <header>
        <div className="user-container">
          <Link className="user-button" to="/perfil">
            <img src={user?.avatar || defaltAvatar} alt="Logo-Usuário" />
            <h2>{`${user?.name} ${user?.surname}`}</h2>
          </Link>
        </div>
        <div className="logout-container">
          <button className="logout-button" onClick={signOut}>
            <div className="logout">
              <img src={logoutIcon} alt="Icone para voltar" />
            </div>
          </button>
        </div>
      </header>
      <main id="page-landing-content" className="content-container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />
      </main>
      <footer>
        <div className="footer-wrapper">
          <div className="welcome-container">
            <div className="title">
              <h1>Seja bem-vindo.</h1>
              <h3>O que deseja fazer?</h3>
            </div>

            <span className="total-connections">
              Total de
              {' '}
              {totalConnections}
              {' '}
              conexões já realizadas
              {' '}
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>
          </div>

          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Dar aulas" />
              Dar aulas
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
