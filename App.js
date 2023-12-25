import React from 'react';
import { AppNavigator } from './AppNavigator';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}
