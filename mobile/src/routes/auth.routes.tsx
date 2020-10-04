import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/StudyTabs/GiveClasses';
import StudyTabs from './study.routes';
import Login from '../pages/LoginPage';

import SignUpWhoami from '../pages/SignUp/SignUpWhoami';
import SignUpCrendetials from '../pages/SignUp/SignUpCredentials';
import SignSuccess from '../pages/SignSuccess';

import ForgetPassword from '../pages/RecoveryPassword';
import RecoverySuccess from '../pages/RecoverySuccess';

import FirstOnboarding from '../pages/Onboarding/FirstOnboarding';
import SecondOnboarding from '../pages/Onboarding/SecondOnboarding';

const { Navigator, Screen } = createStackNavigator();

// === auth.stack.routes ===
// login
// cadastro
// success page

// === user.stack.routes ===
// Landing
// give classes

// == study tabs

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={Login} />

        <Screen name="SignUpWhoami" component={SignUpWhoami} />
        <Screen name="SignUpCrendetials" component={SignUpCrendetials} />
        <Screen name="SignSuccess" component={SignSuccess} />

        <Screen name="ForgetPassword" component={ForgetPassword} />
        <Screen name="RecoverySuccess" component={RecoverySuccess} />

        <Screen name="Landing" component={Landing} />

        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="StudyTabs" component={StudyTabs} />

        <Screen name="FirstOnboarding" component={FirstOnboarding} />
        <Screen name="SecondOnboarding" component={SecondOnboarding} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
