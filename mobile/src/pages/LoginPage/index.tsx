import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import backgroundImage from '../../assets/images/signIn-background.png';
import logoImage from '../../assets/images/intro.png';

export default function LoginPage() {
  const navigation = useNavigation();

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
        <View style={styles.formInputs}>
          <View style={[styles.inputWrapper, styles.formInputEmail]}>
            <TextInput style={[styles.formInput]} placeholder="E-mail" />
          </View>

          <View style={[styles.inputWrapper, styles.formInputPassword]}>
            <TextInput style={[styles.formInput]} placeholder="Senha" />
          </View>
        </View>
        <View style={styles.formFooter}>
          <TouchableOpacity>
            <Text style={styles.remember}>Lembrar-me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forget}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <RectButton style={styles.formButton}>
          <Text style={styles.formButtonText}>Entrar</Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
}
