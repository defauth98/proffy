/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';
import { useAuth } from '../../contexts/auth';

import avatarImage from '../../assets/images/default-avatar.png';
import backIcon from '../../assets/images/icons/back.png';
import logoIcon from '../../assets/images/logo.png';

interface PageHeaderProps {
  title?: string;
  subject?: string;
  description?: string;
  perfil?: boolean;
  pageTitle?: string;
  children?: ReactNode;
}

function PageHeader({
  children,
  title,
  description,
  pageTitle,
  subject,
}: PageHeaderProps) {
  const { user } = useAuth();

  function renderTitleOrPerfil() {
    if (title) {
      return (
        <div className='header-content'>
          <strong>{title}</strong>
          {children}
          {description && <p>{description}</p>}
        </div>
      );
    }
    return (
      <div className='header-content header-image'>
        <img
          src={user?.avatar || avatarImage}
          alt='Imagem de perfil'
          className='perfil-image'
        />

        <h1 className='perfil-name'>
          {`${user?.name} ${user?.surname}` || 'Not found'}
        </h1>
        <h3 className='perfil-subject'>{subject || ' '}</h3>
      </div>
    );
  }

  return (
    <header className='page-header'>
      <div className='top-bar-container'>
        <Link to='/'>
          <img src={backIcon} alt='Voltar' />
        </Link>
        <span>{pageTitle}</span>
        <img src={logoIcon} alt='Proffy' />
      </div>

      {renderTitleOrPerfil()}
    </header>
  );
}

export default PageHeader;
