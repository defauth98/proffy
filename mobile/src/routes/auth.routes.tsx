import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/AuthPages/LoginPage';

import SignUpWhoami from '../pages/AuthPages/SignUp/SignUpWhoami';
import SignUpCrendetials from '../pages/AuthPages/SignUp/SignUpCredentials';
import SignSuccess from '../pages/AuthPages/SignSuccess';

import ForgetPassword from '../pages/AuthPages/RecoveryPassword';
import RecoverySuccess from '../pages/AuthPages/RecoverySuccess';

import FirstOnboarding from '../pages/AuthPages/Onboarding/FirstOnboarding';
import SecondOnboarding from '../pages/AuthPages/Onboarding/SecondOnboarding';

const { Navigator, Screen } = createStackNavigator();

function AuthRoutes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={Login} />

        <Screen name="SignUpWhoami" component={SignUpWhoami} />
        <Screen name="SignUpCrendetials" component={SignUpCrendetials} />
        <Screen name="SignSuccess" component={SignSuccess} />

        <Screen name="ForgetPassword" component={ForgetPassword} />
        <Screen name="RecoverySuccess" component={RecoverySuccess} />

        <Screen name="FirstOnboarding" component={FirstOnboarding} />
        <Screen name="SecondOnboarding" component={SecondOnboarding} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AuthRoutes;
