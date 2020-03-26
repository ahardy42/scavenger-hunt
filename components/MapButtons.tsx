import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormContext } from '../context/FormContext';
import { Icon } from 'react-native-elements';

type MapButtonProps = {
    handleCompass?: React.Dispatch<React.SetStateAction<boolean>>,
    handleLocation?: React.Dispatch<React.SetStateAction<boolean>>,
    mapRef: React.MutableRefObject<any>
}

export default function MapButtons({ mapRef, handleCompass, handleLocation }: MapButtonProps) {

    const [formState] = useFormContext();

    const _handleCompass: (e:any) => void = e => {
        handleCompass(bool => {
            if (bool) {
                mapRef.current.animateCamera({heading: 0})
            }
            return !bool
        });
    }

    const _handleLocation: (e:any) => void = e => {
        handleLocation(bool => !bool);
    }

    return (
        <View style={styles.container}>
            <Icon name='compass' type='font-awesome' size={25} color='orange' reverse onPress={_handleCompass}/>
            {formState.difficulty !== 'easy' && <Icon name='location-arrow' type='font-awesome' size={25} color='orange' reverse onPress={_handleLocation}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        left: 15,
        flexDirection: 'column',
        zIndex: 300
    }
})