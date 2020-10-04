import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/HomePages/Landing';
import GiveClasses from '../pages/HomePages/GiveClasses';
import StudyTabs from '../routes/study.routes';
import Perfil from '../pages/HomePages/Pefil';

const { Navigator, Screen } = createStackNavigator();

function HomeRoutes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Perfil" component={Perfil} />
        <Screen name="StudyTabs" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
}

export default HomeRoutes;
