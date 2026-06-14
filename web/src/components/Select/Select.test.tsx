import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from './index';

describe('Select Component', () => {
  const options = [
    { value: 'Artes', label: 'Artes' },
    { value: 'Biologia', label: 'Biologia' },
    { value: 'Ciências', label: 'Ciências' },
  ];

  it('should render the select with a label and options', () => {
    render(<Select label="Matéria" name="subject" options={options} />);

    expect(screen.getByLabelText('Matéria')).toBeInTheDocument();

    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should have the default disabled option', () => {
    render(<Select label="Matéria" name="subject" options={options} />);

    const defaultOption = screen.getByText('Selecione uma opção');
    expect(defaultOption).toBeInTheDocument();
    expect(defaultOption).toBeDisabled();
  });
});
