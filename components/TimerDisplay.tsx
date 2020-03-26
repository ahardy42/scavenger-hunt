import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';

type TimerProps = {
    time: number
}

export default function TimerDisplay({ time }: TimerProps) {
    return (
        <View style={styles.container}>
            <Icon name='clock-o' type='font-awesome' size={40} color='orange' />
            <Text style={styles.text}>{moment(time, 'X').format('mm:ss')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        left: 15,
        top: 50,
        zIndex: 300
    },
    text: {
        fontSize: 25,
        paddingLeft: 10
    }
})