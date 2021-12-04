import React, { useState } from 'react';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

import closedEyeIcon from '../../assets/images/icons/closedEye.png';
import EyeIcon from '../../assets/images/icons/eye.png';

interface FormInputsProps {
  setFirtInput: Function;
  setSecondInput?: Function;
  firstInputPlaceholder: string;
  secondInputPlaceholder?: string;
  isSecondInputPassword?: boolean;
}

const FormInputs: React.FC<FormInputsProps> = ({
  setFirtInput,
  setSecondInput,
  firstInputPlaceholder,
  secondInputPlaceholder,
  isSecondInputPassword,
}) => {
  const [passwordShow, setPasswordShow] = useState(false);

  function handleToggleEye() {
    if (passwordShow) {
      setPasswordShow(false);
      return;
    }

    setPasswordShow(true);
  }

  function renderPasswordShownButton() {
    if (isSecondInputPassword === false) {
      return;
    }

    return passwordShow ? (
      <Image source={EyeIcon} />
    ) : (
      <Image source={closedEyeIcon} />
    );
  }

  return (
    <View style={styles.formInputs}>
      <View
        style={[
          styles.inputWrapper,
          styles.formInputEmail,
          !setSecondInput ? styles.formInputPassword : null,
        ]}
      >
        <TextInput
          style={[styles.formInput]}
          placeholder={firstInputPlaceholder}
          onChangeText={(email) => setFirtInput(email)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {setSecondInput && (
        <View style={[styles.inputWrapper, styles.formInputPassword]}>
          <TextInput
            style={[styles.formInput]}
            placeholder={secondInputPlaceholder}
            secureTextEntry={passwordShow}
            onChangeText={(password) => setSecondInput(password)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.closedEyeIcon}
            onPress={handleToggleEye}
          >
            {renderPasswordShownButton()}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FormInputs;
