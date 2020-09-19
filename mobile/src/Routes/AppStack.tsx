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

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="SuccessPage" component={SuccessPage} />
        <Screen name="SignUpCrendetials" component={SignUpCrendetials} />
        <Screen name="SignUpWhoami" component={SignUpWhoami} />
        <Screen name="Login" component={Login} />
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="StudyTabs" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
