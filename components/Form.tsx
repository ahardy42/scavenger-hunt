import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { RadioButton } from 'react-native-material-ui';
import { useFormContext } from '../context/FormContext';

type FormProps = {
    children: string,
    contextName: 'SET_ACTIVITY'|'SET_DISTANCE',
    buttonsArr: string[],
}

export default function Form({ children, buttonsArr, contextName }: FormProps) {

    const [formState, formDispatch] = useFormContext();

    const value = contextName.includes('ACTIVITY') ? formState.activity : formState.distance;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
            <View style={styles.buttonContainer}>
                {buttonsArr.map(el => {
                    return <RadioButton checked={value === el} value={el} label={el} onSelect={value => formDispatch({type: contextName, payload: value})} />
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        textAlign: 'center'
    }
})