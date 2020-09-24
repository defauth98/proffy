import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from '../Routes/StudyTabs';
import Login from '../pages/LoginPage';
import SignUpWhoami from '../pages/SignUpWhoami';
import SignUpCrendetials from '../pages/SignUpCredentials';
import SuccessPage from '../pages/Success';

import FirstOnboarding from '../pages/FirstOnboarding';
import SecondOnboarding from '../pages/SecondOnboarding';

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
        <Screen name="FirstOnboarding" component={FirstOnboarding} />
        <Screen name="SecondOnboarding" component={SecondOnboarding} />

        <Screen name="Login" component={Login} />

        <Screen name="SignUpWhoami" component={SignUpWhoami} />
        <Screen name="SignUpCrendetials" component={SignUpCrendetials} />

        <Screen name="SuccessPage" component={SuccessPage} />

        <Screen name="Landing" component={Landing} />

        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="StudyTabs" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
