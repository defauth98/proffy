import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import FormInputs from '../../components/FormInputs';

import styles from './styles';

const SignUpCrendetials: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.titleWrapper}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Crie sua conta gratuíta</Text>
          <Text style={styles.textDescription}>
            Basta preencher esses dados e você estará conosco.
          </Text>
        </View>
      </View>
      <View style={styles.formWrapper}>
        <Text style={styles.formTitle}>01. Quem é você?</Text>
        <FormInputs
          setFirtInput={setEmail}
          setSecondInput={setPassword}
          firstInputPlaceholder="Nome"
          secondInputPlaceholder="Sobrenome"
          isSecondInputPassword={false}
        />
        <RectButton style={styles.button}>
          <Text style={styles.buttonText}>Próximo</Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpCrendetials;
