import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

import bookIcon from '../../../../assets/images/icons/book.png';
import onboardingBackgroundImage from '../../../../assets/images/onboarding-background.png';
import NextIcon from '../../../../assets/images/icons/next.png';

import { useNavigation } from '@react-navigation/native';

const FirstOnboarding: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigateToNextPage() {
    navigation.navigate('SecondOnboarding');
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
          <Text style={styles.textNumber}>01.</Text>
          <Text style={styles.textDescription}>
            Encontre vários professores para ensinar você
          </Text>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.actualPageShow}>
            <View style={styles.firstCircle}></View>
            <View style={styles.secondCircle}></View>
          </View>
          <TouchableOpacity onPress={() => handleNavigateToNextPage()}>
            <Image source={NextIcon} style={styles.arrowImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FirstOnboarding;
