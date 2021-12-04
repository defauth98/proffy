import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import backgroundImage from '../../../assets/images/signIn-background.png';
import logoImage from '../../../assets/images/intro.png';

import FormInputs from '../../../components/FormInputs';
import { useAuth } from '../../../contexts/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [inputsFull, setInputsFull] = useState(false);

  const { signIn } = useAuth();

  const navigation = useNavigation();

  async function handleToggleCheckbox() {
    setSelection(!isSelected);
  }

  async function handleLogin() {
    await signIn(email, password, isSelected);
  }

  useEffect(() => {
    if (email.length >= 6) {
      if (password.length >= 3) {
        setInputsFull(true);
      }
    }
  }, [email, password]);

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
              tintColors={{ true: '#04D361', false: '#9c98a6' }}
              onFillColor="#fff"
            />
            <Text style={styles.remember}>Lembrar-me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}
          >
            <Text style={styles.forget}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <RectButton
          style={[styles.formButton, inputsFull && styles.buttonGreen]}
          onPress={() => {
            inputsFull ? handleLogin() : null;
          }}
        >
          <Text
            style={[
              styles.formButtonText,
              inputsFull && styles.buttonGreenText,
            ]}
          >
            Entrar
          </Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
}
