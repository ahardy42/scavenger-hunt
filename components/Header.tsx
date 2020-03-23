import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Scavenger Hunt</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    text: {
        fontSize: 25,
        color: 'black'
    }
})