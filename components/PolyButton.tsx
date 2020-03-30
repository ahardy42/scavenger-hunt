import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {LatLng} from 'react-native-maps';

type ButtonProps = {
    coordsLen: number,
    setBoundary: React.Dispatch<React.SetStateAction<LatLng[]>>,
    coords: LatLng[],
    resetPolygon: () => void
}

export default function PolyButton({ coordsLen, coords, setBoundary, resetPolygon }: ButtonProps) {

    const handlePress: () => void = () => {
        if (coordsLen < 3) return;
        setBoundary(coords);
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={resetPolygon} style={styles.button}>
                <Text style={styles.text}>Reset Boundary</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.text}>Set Boundary</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        left: '25%',
        width: '50%'
    },
    button: {
        backgroundColor: 'rgba(255, 165, 0, 0.8)',
        color: '#fff',
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 3,
        shadowOffset: {
            width: 2,
            height: 2
        },
        zIndex: 500
    },
    text: {
        fontSize: 25,
        textAlign: 'center'
    }
})