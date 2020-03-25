import React from 'react';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from './context/FormContext';
import { MarkerProvider } from './context/MarkerContext';
import { RegionProvider } from './context/RegionContext';
import BboxCreateScreen from './screens/BboxCreateScreen';

export type RootStackParamList = {
  Home: undefined,
  Bbox: undefined,
  Map: undefined
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <FormProvider>
        <MarkerProvider>
          <RegionProvider>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name='Home' component={HomeScreen}/>
              <Stack.Screen options={{headerShown: false}} name='Bbox' component={BboxCreateScreen}/>
              <Stack.Screen options={{headerShown: false}} name='Map' component={MapScreen}/>
            </Stack.Navigator>
          </RegionProvider>
        </MarkerProvider>
      </FormProvider>
    </NavigationContainer>
  );
}
