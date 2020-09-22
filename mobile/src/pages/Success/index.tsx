import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import doneIcon from '../../assets/images/icons/Feito.png';
import backgroundImage from '../../assets/images/success-background.png';

import styles from './styles';

const Success: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate('Login');
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
          <Text style={styles.title}>Cadastro concluído!</Text>
          <Text style={styles.description}>
            Agora você faz parte da plataforma da Proffy
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.buttonWrapper}>
        <RectButton
          style={styles.button}
          onPress={() => {
            handleNavigateToLogin();
          }}
        >
          <Text style={styles.buttonText}>Fazer login</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default Success;
