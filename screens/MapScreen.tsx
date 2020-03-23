import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Map'
>;

type HomeScreenProps = {
    navigation: ProfileScreenNavigationProp
}

export default function MapScreen({ navigation }: HomeScreenProps) {
    return (
        <View>

        </View>
    );
}