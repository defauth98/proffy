import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInputs: React.FC<FormInputProps> = ({ label }) => {
  return (
    <div className="label-float">
      <input type="text" placeholder=" " />
      <label>{label}</label>
    </div>
  );
};

export default FormInputs;
