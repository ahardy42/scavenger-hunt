import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create Your Orienteering Course</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
        marginBottom: 20
    },
    text: {
        fontSize: 25,
        color: 'black',
        padding: 5
    }
})