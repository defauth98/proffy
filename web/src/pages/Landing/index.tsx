import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import logoutIcon from '../../assets/images/icons/sign-out.svg';

import './styles.css';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

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
          <Link className="user-button" to="/">
            <img
              src="https://avatars3.githubusercontent.com/u/52966246?s=460&u=42fc97534542db683f3daab62ce627e92bef846f&v=4"
              alt="Logo-Usuário"
            />
            <h2>Daniel Ribeiro</h2>
          </Link>
        </div>
        <div className="logout-container">
          <Link to="/">
            <div className="logout">
              <img src={logoutIcon} alt="" />
            </div>
          </Link>
        </div>
      </header>
      <div id="page-landing-content" className="content-container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />
      </div>
      <footer className="landing-footer">
        <div className="welcome-container">
          <h1>Seja bem-vindo.</h1>
          <h3>O que deseja fazer?</h3>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{' '}
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>

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
      </footer>
    </div>
  );
};

export default Landing;
