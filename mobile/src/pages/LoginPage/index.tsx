import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import { AuthContext } from '../../contexts/auth';

import backgroundImage from '../../assets/images/signIn-background.png';
import logoImage from '../../assets/images/intro.png';

import FormInputs from '../../components/FormInputs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);

  const { login, user, signed, token } = useContext(AuthContext);

  const navigation = useNavigation();

  async function handleToggleCheckbox() {
    setSelection(!isSelected);
  }

  async function handleLogin() {
    await login(email, password);

    if (!!user) {
      navigateToLanding();
    }

    if (isSelected) {
      await AsyncStorage.setItem('@proffy:token', token);
    }
  }

  function navigateToLanding() {
    navigation.navigate('Landing');
  }

  useEffect(() => {
    async function isSigned() {
      const token = await AsyncStorage.getItem('@proffy:token');

      if (token) {
        navigateToLanding();
      }
    }

    isSigned();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoWrapper}>
        <ImageBackground
          resizeMode="contain"
          style={styles.backgroundImageWrapper}
          source={backgroundImage}
        >
          <Image
            style={styles.logoProffy}
            source={logoImage}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>

      <View style={styles.formWrapper}>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderText}>Fazer login</Text>
          <TouchableOpacity
            style={styles.formHeaderRightButton}
            onPress={() => navigation.navigate('SignUpWhoami')}
          >
            <Text style={styles.rightButtonText}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>

        <FormInputs
          setFirtInput={setEmail}
          setSecondInput={setPassword}
          firstInputPlaceholder="E-mail"
          secondInputPlaceholder="Senha"
          isSecondInputPassword={true}
        />

        <View style={styles.formFooter}>
          <TouchableOpacity style={styles.rememberContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={() => handleToggleCheckbox()}
              tintColors={{ true: '#04D361', false: '#000' }}
            />
            <Text style={styles.remember}>Lembrar-me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forget}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <RectButton style={styles.formButton} onPress={() => handleLogin()}>
          <Text style={styles.formButtonText}>Entrar</Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
}
