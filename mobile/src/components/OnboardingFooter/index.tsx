import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

import Arrow from '../../assets/images/icons/seta.png';

interface OnboardingFooterProps {
  first?: boolean;
}

const OnboardingFooter: React.FC<OnboardingFooterProps> = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.actualPageShow}>
        <View style={styles.firstCircle}></View>
        <View style={styles.secondCircle}></View>
      </View>
      <TouchableOpacity>
        <Image source={Arrow} />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingFooter;
