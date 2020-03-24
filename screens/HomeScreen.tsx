import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
// components
import { Divider, Button } from 'react-native-material-ui';
import Header from '../components/Header';
import Form from '../components/Form';
// utilities
import { useFormContext } from '../context/FormContext';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeScreenProps = {
    navigation: ProfileScreenNavigationProp
}

export default function HomeScreen({ navigation }: HomeScreenProps) {

    const [formState, formDispatch] = useFormContext();

    function handlePress() {

        if (!formState.activity || !formState.distance) return;

        navigation.navigate('Map');

    }

    React.useEffect(() => {
       navigation.addListener('focus', () => formDispatch({type: 'RESET_STATE'}))
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <Form buttonsArr={['on-road', 'off-road']} contextName='SET_ACTIVITY'>
                Activity Type
            </Form>
            <Divider />
            <Form buttonsArr={['easy', 'medium', 'hard']} contextName='SET_DIFFICULTY'>
                Difficulty
            </Form>
            <Divider />
            <Form buttonsArr={['short', 'medium', 'long']} contextName='SET_DISTANCE'>
                Distance
            </Form>
            <View style={styles.buttonWrapper}>
                <Button onPress={handlePress} primary raised text='Start!'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center'
    }
})