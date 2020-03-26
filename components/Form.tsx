import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { useFormContext } from '../context/FormContext';
import MyRadioButton from './MyRadioButton';

type FormProps = {
    children: string,
    contextName: 'SET_ACTIVITY' | 'SET_DISTANCE' | 'SET_DIFFICULTY',
    buttonsArr: string[],
}

export default function Form({ children, buttonsArr, contextName }: FormProps) {

    const [formState, formDispatch] = useFormContext();

    const handlePress: (value: string) => void = value => {
        formDispatch({ type: contextName, payload: value})
    }

    const value = formState[contextName.slice(4).toLowerCase()]

    return (
        <Card containerStyle={styles.container} title={children}>
            <View style={styles.buttonContainer}>
                {buttonsArr.map((el, i) => {
                    return (
                        <MyRadioButton height={50} key={i} value={el} checked={value === el} handlePress={handlePress}>{el}</MyRadioButton>
                    );
                })}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        marginTop: 10,
        borderRadius: 10,
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 25,
        textAlign: 'center'
    }
})