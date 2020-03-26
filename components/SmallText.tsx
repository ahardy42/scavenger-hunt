import React from 'react';
import { Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

type SmallTextProps = {
    children: any,
    isVisible: boolean
}

export default function SmallText({ children, isVisible }: SmallTextProps) {

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center'
        },
        small: {
            display: isVisible ? 'flex' : 'none',
            fontSize: 15,
            color: 'rgb(255, 165, 0)'
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.small}>{children}</Text>
        </View>
    );
}