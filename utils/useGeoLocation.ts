import React from 'react';
import * as Location from 'expo-location';
import { LocationData, Accuracy } from 'expo-location';
import * as Permissions from 'expo-permissions';

type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

export const useGeoLocation: (shouldFollow: boolean) => [LocationData, Region] = shouldFollow => {

    const [region, setRegion] = React.useState<Region>({ latitude: null, longitude: null, latitudeDelta: null, longitudeDelta: null });
    const [location, setLocation] = React.useState<LocationData>(null);
    const removeRef = React.useRef(null);

    // on mount, retrieve location data and set the Region
    React.useEffect(() => {
        const _getLocationAsync: () => void = async () => {
            try {
                let { status } = await Permissions.askAsync(Permissions.LOCATION);
                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }

                let location = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5
                });

            } catch (error) {
                console.error(error);
            }
        }

        _getLocationAsync();

    }, [])

    // start following location / stop following based on a boolean
    React.useEffect(() => {

        if (shouldFollow) {
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
        } else {
            removeRef.current?.call();
        }

    }, [shouldFollow])

    return [location, region]

}