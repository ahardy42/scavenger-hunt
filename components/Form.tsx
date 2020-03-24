import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { RadioButton } from 'react-native-material-ui';
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
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
            <View style={styles.buttonContainer}>
                {buttonsArr.map((el, i) => {
                    return (
                        <MyRadioButton height={50} key={i} value={el} checked={value === el} handlePress={handlePress}>{el}</MyRadioButton>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        marginTop: 5
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        textAlign: 'center'
    }
})