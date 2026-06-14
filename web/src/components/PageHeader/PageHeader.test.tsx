import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PageHeader from './index';
import { useAuth } from '../../contexts/auth';

// Mocking useAuth
jest.mock('../../contexts/auth');

const mockedUseAuth = useAuth as jest.Mock;

describe('PageHeader Component', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      user: {
        name: 'John',
        surname: 'Doe',
        avatar: 'http://avatar.com',
      },
    });
  });

  it('should render the title and children', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Estes são os proffys disponíveis.">
          <div data-testid="children">Child content</div>
        </PageHeader>
      </BrowserRouter>
    );

    expect(screen.getByText('Estes são os proffys disponíveis.')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should render the description when provided', () => {
    render(
      <BrowserRouter>
        <PageHeader title="Title" description="Description content" />
      </BrowserRouter>
    );

    expect(screen.getByText('Description content')).toBeInTheDocument();
  });

  it('should render user profile when title is not provided', () => {
    render(
      <BrowserRouter>
        <PageHeader subject="Matemática" />
      </BrowserRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Matemática')).toBeInTheDocument();
    expect(screen.getByAltText('Imagem de perfil')).toHaveAttribute('src', 'http://avatar.com');
  });
});
