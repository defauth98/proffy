import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
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
  // @todo função de lembrar para entrar automaticamente
  // const [rememberMe, setRememberMe] = useState(false);

  const { signed, login, user } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (user && signed) {
      navigation.navigate('Landing');
    }
  }, [user]);

  function handleLogin() {
    login(email, password);
  }

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
            onPress={() => navigation.navigate('SignUp')}
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
          <TouchableOpacity>
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
