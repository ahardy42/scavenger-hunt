import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationData, Accuracy } from 'expo-location';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
// utils
import { findAdjacentMarker } from '../utils/markers';
import { useFormContext } from '../context/FormContext';
import { useMarkerContext } from '../context/MarkerContext';
import { useRegionContext } from '../context/RegionContext';
// components
import MarkerList from '../components/MarkerList';
import StartModal from '../components/StartModal';
import PointsTally from '../components/PointsTally';

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Map'
>;

type HomeScreenProps = {
    navigation: ProfileScreenNavigationProp
}

export default function MapScreen({ navigation }: HomeScreenProps) {

    const [region] = useRegionContext();
    const [location, setLocation] = React.useState<LocationData>(null);
    const removeRef = React.useRef(null);
    const [timer, setTimer] = React.useState<number>(5);
    const timerRef = React.useRef<number>(null);
    const [formState] = useFormContext();
    const [markerState, markerDispatch] = useMarkerContext();

    // get location of user on load
    // start following location / stop following based on a boolean
    React.useEffect(() => {

        const _followLocationAsync: () => void = async () => {
            try {
                let { status } = await Permissions.askAsync(Permissions.LOCATION);
                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }

                let obj = await Location.watchPositionAsync({ accuracy: Accuracy.High, timeInterval: 5000, distanceInterval: 5 }, setLocation);
                removeRef.current = obj.remove;
            } catch (error) {
                console.error(error);
            }
        }

        _followLocationAsync();

    }, []);

    // start countdown
    React.useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setTimer(time => time - 1)
        }, 1000);
    }, [])

    React.useEffect(() => {
        if (timer < -5) {
            clearInterval(timerRef.current);
        }
    }, [timer])

    // remove nearby markers on location change
    React.useEffect(() => {
        if (location) {
            let nearbyMarker = findAdjacentMarker(location, markerState.markers);
            if (nearbyMarker !== undefined) {
                markerDispatch({ type: 'DELETE_MARKER', payload: nearbyMarker })
            }
        }
    }, [location, markerState])

    return (
        <View style={styles.container}>
            <PointsTally />
            <StartModal timer={timer} />
            <MapView
                style={styles.mapStyle}
                mapType='hybrid'
                initialRegion={region}
                showsUserLocation={timer > 0 || formState.difficulty === 'easy'}
            >
                <MarkerList markerList={markerState.markers} />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
