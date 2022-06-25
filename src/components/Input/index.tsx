/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className='input-block'>
      <label htmlFor={name}>{label}</label>
      <input type='text' id={name} {...rest} />
    </div>
  );
}

export default Input;
