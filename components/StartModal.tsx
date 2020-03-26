import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-elements';

type StartModalProps = {
    timer: number,
    isGameOver: boolean,
    handleModalClose: (func: () => void) => void
}

export default function StartModal({ timer, isGameOver, handleModalClose }: StartModalProps) {
    const navigator = useNavigation();
    return (
        <View style={styles.container}>
            <Modal
                transparent
                visible={timer > -1 || isGameOver}
                animationType='fade'
            >
                {timer > -1 && (
                    <View style={styles.wrapper}>
                        {timer > 0 && <Text style={styles.text}>Starting in {timer}...</Text>}
                        {timer <= 0 && <Text style={styles.text}>Go!!!</Text>}
                    </View>
                )}
                {timer < -1 && isGameOver && (
                    <View style={styles.wrapper}>
                        <Text style={styles.text}>You Won!</Text>
                        <Button 
                            style={styles.button} 
                            type='clear' 
                            buttonStyle={{backgroundColor: 'rgba(255, 165, 0, 0.7)', marginTop: 10}} 
                            title='Play Again!'
                            titleStyle={{color: '#fff'}}
                            onPress={() => handleModalClose(() => navigator.navigate('Home'))}
                        />
                    </View>
                )}
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
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
    },
    button: {

    }
})