import React from 'react';

import AuthRoutes from './auth.routes';
import HomeRoutes from './home.routes';

import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/auth';

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8257E5',
  },
});

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#E6E6F0" />
      </View>
    );
  }

  return signed ? <HomeRoutes /> : <AuthRoutes />;
};

export default Routes;
