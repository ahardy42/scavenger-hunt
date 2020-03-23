import React from 'react';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from './context/FormContext';

export type RootStackParamList = {
  Home: undefined,
  Map: undefined
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <FormProvider>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Map' component={MapScreen}/>
        </Stack.Navigator>
      </FormProvider>
    </NavigationContainer>
  );
}
