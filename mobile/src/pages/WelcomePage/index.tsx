import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const WelcomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WelcomePage</Text>
    </View>
  );
};

export default WelcomePage;
