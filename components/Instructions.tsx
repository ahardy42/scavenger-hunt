import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type InstructionsProps = {
    coordsLen: number
}

export default function Instructions({ coordsLen }: InstructionsProps) {
    let instructions =  coordsLen < 1 ? 'Click on the map to start drawing a game Boundary' :
                        coordsLen < 2 ? 'Now keep clicking to create a box' : 'When finished, press the button at the bottom of the screen'
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{instructions}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 35,
        left: '5%',
        width: '90%',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        color: '#fff'
    }
})