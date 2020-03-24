import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

type StartModalProps = {
    timer: number
}

export default function StartModal({timer}: StartModalProps) {
    return (
        <View style={styles.container}>
            <Modal
                transparent
                visible={timer > -1}
                animationType='fade'
            >
                <View style={styles.wrapper}>
                    {timer > 0 && <Text style={styles.text}>Starting in {timer}...</Text>}
                    {timer <= 0 && <Text style={styles.text}>Go!!!</Text>}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    wrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: '70%',
        width: '70%',
        borderRadius: 10,
        marginLeft: '15%',
        marginTop: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 45
    }
})