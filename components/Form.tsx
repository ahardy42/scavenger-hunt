import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { useFormContext } from '../context/FormContext';
import MyRadioButton from './MyRadioButton';
import SmallText from './SmallText';

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

    const returnActivityText: () => string = () => {
        switch (formState.activity) {
            case 'on-road':
                return 'Markers will be closer to roads'
            case 'off-road':
                return 'Markers will be dispersed randomly'
        }
    }

    const returnDifficultyText: () => string = () => {
        switch (formState.difficulty) {
            case 'easy':
                return 'user\'s location will always be shown on map';
            case 'medium':
                return 'user\'s location may be shown for 3 second intervals';
            case 'hard':
                return 'user\'s location is never shown on map'
        }
    }

    const returnDistanceText: () => string = () => {
        switch (formState.distance) {
            case 'short':
                return '6 checkpoints are generated on the map';
            case 'medium':
                return '10 checkpoints are generated on the map';
            case 'long':
                return '14 checkpoints are generated on the map';
        }
    }

    const renderSmallText: () => string = () => {
        switch (contextName) {
            case 'SET_ACTIVITY':
                return returnActivityText();
            case 'SET_DIFFICULTY':
                return returnDifficultyText();
            case 'SET_DISTANCE':
                return returnDistanceText();
        }
    }

    return (
        <Card containerStyle={styles.container} title={children}>
            <View style={styles.buttonContainer}>
                {buttonsArr.map((el, i) => {
                    return (
                        <MyRadioButton height={50} key={i} value={el} checked={value === el} handlePress={handlePress}>{el}</MyRadioButton>
                    );
                })}
            </View>
            <SmallText isVisible={!!value}>{renderSmallText()}</SmallText>
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