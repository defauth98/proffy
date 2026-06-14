import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './index';

describe('Input Component', () => {
  it('should render the input with a label', () => {
    render(<Input label="Nome completo" name="name" />);

    const labelElement = screen.getByLabelText('Nome completo');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('id', 'name');
  });

  it('should pass additional props to the input element', () => {
    render(<Input label="Nome completo" name="name" placeholder="Digite seu nome" />);

    const inputElement = screen.getByPlaceholderText('Digite seu nome');
    expect(inputElement).toBeInTheDocument();
  });
});
