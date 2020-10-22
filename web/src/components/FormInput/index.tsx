import React, { InputHTMLAttributes, useState } from 'react';

import './styles.css';

import Eye from '../../assets/images/icons/eye.svg';
import closedEye from '../../assets/images/icons/closedEye.svg';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
}

const FormInputs: React.FC<FormInputProps> = ({
  label,
  isPassword,
  ...rest
}) => {
  const [passwordShow, setPasswordShow] = useState(false);

  function handleTogglePasswordShow() {
    passwordShow ? setPasswordShow(false) : setPasswordShow(true);
  }

  return (
    <div className="label-float">
      {isPassword ? (
        <input
          placeholder=" "
          {...rest}
          type={passwordShow ? 'text' : 'password'}
        />
      ) : (
        <input placeholder=" " {...rest} type="text" />
      )}

      <label>{label}</label>
      {isPassword ? (
        <button onClick={handleTogglePasswordShow}>
          {passwordShow ? (
            <img src={closedEye} alt="Ocultar senha" className="inputIcon" />
          ) : (
            <img src={Eye} alt="Ocultar senha" className="inputIcon" />
          )}
        </button>
      ) : null}
    </div>
  );
};

export default FormInputs;
