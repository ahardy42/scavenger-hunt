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
import MapButtons from '../components/MapButtons';
import HomeButton from '../components/HomeButton';

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
    const removeHeadingRef = React.useRef(null);
    const [timer, setTimer] = React.useState<number>(5);
    const timerRef = React.useRef<number>(null);
    const [formState] = useFormContext();
    const [markerState, markerDispatch] = useMarkerContext();
    const [heading, setHeading] = React.useState<number>(null);
    const [isHeading, setIsHeading] = React.useState<boolean>(false);
    const [isLocation, setIsLocation] = React.useState<boolean>(false);

    // refs
    const mapRef = React.useRef(null);

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
                let compass = await Location.watchHeadingAsync((res) => {
                    if (res.trueHeading > 0) {
                        setHeading(res.trueHeading);
                    }
                });
                removeRef.current = obj.remove;
                removeHeadingRef.current = compass.remove;
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

    React.useEffect(() => {
        if (heading && isHeading) {
            mapRef.current?.animateCamera({heading})
        }
    }, [heading, isHeading])

    // for medium difficulty users
    React.useEffect(() => {
        if (isLocation && formState.difficulty === 'medium') {
            setTimeout(() => {
                setIsLocation(false);
            },3000)
        }
    }, [isLocation, formState.difficulty])

    return (
        <View style={styles.container}>
            <PointsTally />
            <StartModal timer={timer} />
            <MapView
                ref={mapRef}
                style={styles.mapStyle}
                mapType='hybrid'
                initialRegion={region}
                showsUserLocation={isLocation || (timer > 0 || formState.difficulty === 'easy')}
                showsCompass
                compassOffset={{x: -5, y: 25}}
                showsScale
            >
                <MarkerList markerList={markerState.markers} />
            </MapView>
            <MapButtons mapRef={mapRef} handleCompass={setIsHeading} handleLocation={setIsLocation} />
            <HomeButton handlePress={() => navigation.navigate('Home')} />
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
