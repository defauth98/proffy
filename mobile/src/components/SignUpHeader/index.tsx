import React from 'react';
import { View, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const SignUpHeader: React.FC = () => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
      </View>
    </View>
  );
};

export default SignUpHeader;
