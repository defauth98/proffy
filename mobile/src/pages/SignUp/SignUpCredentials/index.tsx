import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import FormInputs from '../../../components/FormInputs';
import { AuthContext } from '../../../contexts/auth';

import api from '../../../services/api';

import styles from './styles';

interface SingUpCredentialsProps {
  route: {
    params: {
      name: string;
      surname: string;
    };
  };
}

const SignUpCrendetials: React.FC<SingUpCredentialsProps> = ({ route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputsFull, setInputsFull] = useState(false);

  const navigation = useNavigation();

  const { SignIn, user, signed } = useContext(AuthContext);

  useEffect(() => {
    if (email.length >= 6) {
      if (password.length >= 6) {
        setInputsFull(true);
      }
    }
  }, [email, password]);

  async function handleSignIn() {
    const { name, surname } = route.params;

    SignIn(name, surname, email, password);

    if (user && signed) {
      navigation.navigate('Landing');
    }
  }

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
        <Text style={styles.formTitle}>02. Email e senha</Text>
        <FormInputs
          setFirtInput={setEmail}
          setSecondInput={setPassword}
          firstInputPlaceholder="E-mail"
          secondInputPlaceholder="Senha"
          isSecondInputPassword={true}
        />
        <RectButton
          style={[styles.button, inputsFull && styles.buttonPurple]}
          onPress={() => {
            inputsFull ? handleSignIn() : null;
          }}
        >
          <Text
            style={[styles.buttonText, inputsFull && styles.buttonPurpleText]}
          >
            Próximo
          </Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpCrendetials;
