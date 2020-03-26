import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMarkerContext } from '../context/MarkerContext';

type HomeButtonProps = {
    handlePress: () => void
}

export default function HomeButton({ handlePress }: HomeButtonProps) {

    const [,markerDispatch] = useMarkerContext();

    const _handlePress: () => void = () => {
        markerDispatch({type: 'RESET_STATE'});
        handlePress();
    }

    return (
        <View style={styles.container}>
            <Icon name='home' type='font-awesome' size={25} color='orange' reverse onPress={_handlePress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        right: 15,
        zIndex: 300
    }
})