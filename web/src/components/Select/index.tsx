/* eslint-disable react/jsx-props-no-spreading */

import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

function Select({
  label, name, options, ...rest
}: SelectProps) {
  return (
    <div className='select-block'>
      <label htmlFor={name}>{label}</label>
      <select id={name} {...rest}>
        <option value='' hidden disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
