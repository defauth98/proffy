import React from 'react';

import AuthRoutes from './auth.routes';
import StudyRoutes from './study.routes';

import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/auth';

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return signed ? <StudyRoutes /> : <AuthRoutes />;
};

export default Routes;
