import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-material-ui';

type PointsTallyProps = {
    markerListLen: number,
    initialLen: number
}

export default function PointsTally({ markerListLen, initialLen }) {
    return (
        <View style={styles.container}>
            <Card >
                <View>
                    <Text style={styles.text}>Points: {(initialLen - markerListLen) * 10}</Text>
                    <Text style={styles.text}>Markers: {markerListLen}</Text>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 25,
        padding: 5,
        borderRadius: 3,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.6,
        shadowColor: 'black',
        right: 15,
        height: 50,
        width: 120,
        zIndex: 100
    },
    text: {
        fontSize: 15,
        color: 'black',
        textAlign: 'right'
    }
})