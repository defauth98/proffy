import React, { useState } from 'react';

import { KeyboardAvoidingView, View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import FormInputs from '../../components/FormInputs';

import styles from './styles';

const SignUpWhoami: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const navigation = useNavigation();

  function handleNavigateToNextPage() {
    navigation.navigate('SignUpCrendetials', { name, surname });
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
          setFirtInput={setName}
          setSecondInput={setSurname}
          firstInputPlaceholder="Nome"
          secondInputPlaceholder="Sobrenome"
          isSecondInputPassword={false}
        />
        <RectButton
          style={[styles.button, styles.buttonPurple]}
          onPress={() => handleNavigateToNextPage()}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpWhoami;
