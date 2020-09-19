import React from 'react';
import { TextInput } from 'react-native';
import { View } from 'react-native';

import styles from './styles';

const FormInputs = () => {
  return (
    <View style={styles.formInputs}>
      <View style={[styles.inputWrapper, styles.formInputEmail]}>
        <TextInput style={[styles.formInput]} placeholder="E-mail" />
      </View>

      <View style={[styles.inputWrapper, styles.formInputPassword]}>
        <TextInput style={[styles.formInput]} placeholder="Senha" />
      </View>
    </View>
  );
};

export default FormInputs;
