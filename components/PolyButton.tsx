import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {LatLng} from 'react-native-maps';

type ButtonProps = {
    coordsLen: number,
    setBoundary: React.Dispatch<React.SetStateAction<LatLng[]>>
}

export default function PolyButton({ coordsLen, coords, setBoundary }) {

    const handlePress: () => void = () => {
        if (coordsLen < 3) return;
        setBoundary(coords);
    }
    
    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.text}>Set Boundary</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 165, 0, 0.8)',
        color: '#fff',
        bottom: 50,
        left: '25%',
        width: '50%',
        padding: 10,
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