import React from 'react';
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent} from 'react-native';
// import { Button } from 'react-native-material-ui';

// just a button w/ different styling when it is "checked"

type MyRadioButtonProps = {
    children: string,
    checked: boolean,
    height: number,
    value: string,
    handlePress: (value: string) => void
}

export default function MyRadioButton({ checked, height, value, handlePress, children }: MyRadioButtonProps) {

    const _handlePress: (event: GestureResponderEvent) => void = event => {
        handlePress(value);
    }

    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#fff',
            borderColor: 'orange',
            borderWidth: 2,
            shadowColor: 'black',
            borderRadius: 3,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            height,
            shadowOffset: {
                width: 3,
                height: 3
            },
            shadowOpacity: 0.7,
            shadowRadius: 3
        },
        checkedButton: {
            backgroundColor: 'orange',
            shadowOffset: {
                width: 0,
                height: 0
            }
        },
        text: {
            fontSize: 20
        }
    })

    return (
        <TouchableOpacity 
            onPress={_handlePress}
            style={checked ? StyleSheet.flatten([styles.button, styles.checkedButton]) : styles.button}
        >
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}
