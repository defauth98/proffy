import React from 'react';
import { TextInput } from 'react-native';
import { View } from 'react-native';

import styles from './styles';

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
            secureTextEntry={isSecondInputPassword}
            onChangeText={(password) => setSecondInput(password)}
            autoCapitalize="none"
          />
        </View>
      )}
    </View>
  );
};

export default FormInputs;
