import React from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
// components
import { Button, Divider } from 'react-native-elements';
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

        if (!formState.activity || !formState.distance || !formState.difficulty) return;

        navigation.navigate('Bbox');

    }

    React.useEffect(() => {
        navigation.addListener('focus', () => formDispatch({ type: 'RESET_STATE' }))
    }, [])

    return (
        <ImageBackground source={require('../assets/Topographic-Map-Pattern-5.png')} style={{ flex: 1, width: Dimensions.get('screen').width }} imageStyle={{ resizeMode: 'cover' }}>
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
                    <Button
                        buttonStyle={{ borderColor: 'black' }}
                        containerStyle={{ width: Dimensions.get('screen').width * 0.7 }}
                        disabled={!formState.difficulty || !formState.activity || !formState.distance}
                        onPress={handlePress}
                        type='outline'
                        raised
                        title='Select Playground!'
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    buttonWrapper: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
        color: 'black',
        marginTop: 10
    },
    button: {
        width: 100,
        fontStyle: 'normal',
        fontSize: 20
    }
})