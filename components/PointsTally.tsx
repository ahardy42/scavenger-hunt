import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-material-ui';
import { useMarkerContext } from '../context/MarkerContext';

export default function PointsTally() {

    const [markerState] = useMarkerContext();

    const { markerListlen, numHit } = markerState;
    return (
        <View style={styles.container}>
            <Card >
                <View>
                    <Text style={styles.text}>Points: {numHit * 10}</Text>
                    <Text style={styles.text}>Markers: {markerListlen}</Text>
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