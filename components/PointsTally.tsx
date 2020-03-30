import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMarkerContext } from '../context/MarkerContext';
import { Badge } from 'react-native-elements';
import Svg, { Path } from 'react-native-svg';

export default function PointsTally() {

    const [markerState] = useMarkerContext();

    const { numHit, markerListlen } = markerState;

    const setStatusColor: () => 'success'|'error'|'warning' = () => {
        let ratio = numHit / markerListlen;
        if (ratio > 0.75) {
            return 'success'
        }
        if (ratio > 0.5) {
            return 'warning'
        }
        return 'error'
    }
    
    return (
        <View style={styles.container}>
            <Svg height='50' width='50'>
                <Path d="M502,0H0V502" fill="#FFF" />
                <Path d="M0,50H50V0" fill="orange" />
            </Svg>
            <Badge value={`${numHit}/${markerListlen}`} status={setStatusColor()} badgeStyle={{width: 25, height: 25, borderRadius: 15}} containerStyle={{position: 'absolute', top: -4, right: -4}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 45,
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
        zIndex: 100
    },
    text: {
        fontSize: 15,
        color: 'black',
        textAlign: 'right'
    }
})