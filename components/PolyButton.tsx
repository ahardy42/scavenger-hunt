import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ButtonProps = {
    coordsLen: number,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PolyButton({ coordsLen, setIsEditing }) {

    const handlePress: () => void = () => {
        if (coordsLen < 3) return;
        setIsEditing(false);
    }
    return (
        <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.button}>
            <Text style={styles.text}>Set Boundary</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        marginLeft: -50,
        width: 100,
        zIndex: 500
    },
    text: {
        fontSize: 15,
        textAlign: 'center'
    }
})