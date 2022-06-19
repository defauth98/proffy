/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';
import { useAuth } from '../../contexts/auth';

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
          src={user?.avatar || 'images/default-avatar.png'}
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
          <img src='images/icons/back.png' alt='Voltar' />
        </Link>
        <span>{pageTitle}</span>
        <img src='images/logo.png' alt='Proffy' />
      </div>

      {renderTitleOrPerfil()}
    </header>
  );
}

export default PageHeader;
