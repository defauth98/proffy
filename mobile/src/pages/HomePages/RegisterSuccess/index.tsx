import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import doneIcon from '../../../assets/images/icons/Feito.png';
import backgroundImage from '../../../assets/images/success-background.png';

import styles from './styles';

const RegisterSuccess: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigateTolanding() {
    navigation.navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <Image source={doneIcon} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Cadastro!</Text>
          <Text style={styles.description}>
            Tudo certo, seu cadastro está na nossa lista de professores. Agora é
            só ficar de olho no seu WhatsApp.
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.buttonWrapper}>
        <RectButton
          style={styles.button}
          onPress={() => {
            handleNavigateTolanding();
          }}
        >
          <Text style={styles.buttonText}>Ir para landing</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default RegisterSuccess;
