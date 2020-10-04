import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import backIcon from '../../../assets/images/icons/Voltar.png';
import backgroundImage from '../../../assets/images/signIn-background.png';
import logoImage from '../../../assets/images/intro.png';
import FormInputs from '../../../components/FormInputs';
import api from '../../../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [inputsFull, setInputsFull] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (email.length >= 6) {
      setInputsFull(true);
    }
  }, [email]);

  function handleForgetPassword() {
    api.post('/forget_password', { email }).then(() => {
      navigation.navigate('RecoverySuccess');
    });
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Image style={styles.backIcon} source={backIcon} />
        </TouchableOpacity>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderText}>Esqueceu sua senha?</Text>

          <Text style={styles.formHeaderDescription}>Não esquenta,</Text>
          <Text style={styles.formHeaderDescriptionSecondLine}>
            Vamos dar um jeito nisso.
          </Text>
        </View>

        <FormInputs setFirtInput={setEmail} firstInputPlaceholder="E-mail" />

        <RectButton
          style={[styles.formButton, inputsFull && styles.buttonGreen]}
          onPress={() => {
            inputsFull ? handleForgetPassword() : null;
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
