import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { useStopWatch } from '../utils/useStopWatch';

type TimerDisplayProps = {
    countDown: number
}

export default function TimerDisplay({ countDown }: TimerDisplayProps) {

    // game time
    const [seconds, start] = useStopWatch();

    React.useEffect(() => {
        if (countDown === 0) {
            start();
        }
    }, [countDown])

    return (
        <View style={styles.container}>
            <Icon name='clock-o' type='font-awesome' size={40} color='orange' />
            <Text style={styles.text}>{moment(seconds, 'X').format('mm:ss')}</Text>
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