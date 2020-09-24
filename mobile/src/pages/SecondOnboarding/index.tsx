import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

import bookIcon from '../../assets/images/icons/book.png';
import onboardingBackgroundImage from '../../assets/images/onboarding-background.png';
import NextIcon from '../../assets/images/icons/next.png';

import OnboardingFooter from '../../components/OnboardingFooter';
import { useNavigation } from '@react-navigation/native';

const FirstOnboarding: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <ImageBackground
          source={onboardingBackgroundImage}
          style={styles.backgroundImage}
          resizeMode="center"
        >
          <Image source={bookIcon} style={styles.bookImage} />
        </ImageBackground>
      </View>
      <View style={styles.informationWrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.textNumber}>02.</Text>
          <Text style={styles.textDescription}>
            Ou dê aulas sobre o que você mais conhece
          </Text>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.actualPageShow}>
            <View style={styles.firstCircle}></View>
            <View style={styles.secondCircle}></View>
          </View>
          <TouchableOpacity onPress={() => handleNavigateToLogin()}>
            <Image source={NextIcon} style={styles.arrowImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FirstOnboarding;
