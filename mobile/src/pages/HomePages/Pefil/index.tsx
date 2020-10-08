import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../../contexts/auth';

import styles from './styles';

const Perfil: React.FC = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text>{user?.id}</Text>
    </View>
  );
};

export default Perfil;
