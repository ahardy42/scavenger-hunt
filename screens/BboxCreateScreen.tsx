import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { LocationData, Accuracy } from 'expo-location';
// utilties
import { useFormContext } from '../context/FormContext';
import { useMarkerContext } from '../context/MarkerContext';
import { initMarkerList, initSnappedMarkerList } from '../utils/markers';
//comonents
import { usePolygonCreator, PolyBoundary } from '../components/PolyBoundary';
import PolyButton from '../components/PolyButton';
import MapView, { Region, LatLng } from 'react-native-maps';
import Instructions from '../components/Instructions';
import { StackActions } from '@react-navigation/native';
import { useRegionContext } from '../context/RegionContext';

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Bbox'
>;

type BboxCreateProps = {
    navigation: ProfileScreenNavigationProp
}

export default function BboxCreateScreen({ navigation }: BboxCreateProps) {

    const initialRegion = {
        latitude: 39.8333333,
        longitude: -98.585522,
        latitudeDelta: 50,
        longitudeDelta: 50
    }

    const [boundary, setBoundary] = React.useState<LatLng[]>([]);
    const [formState] = useFormContext();
    const [coords, addToPolygon] = usePolygonCreator();
    const [markerState, markerDispatch] = useMarkerContext();
    const [isFollowingUser, setFollowing] = React.useState<boolean>(true);
    const [finalRegion, setRegion] = useRegionContext();

    React.useEffect(() => {
        if (boundary.length) {
            // init markers
            if (formState.activity === 'on-road') {
                initSnappedMarkerList(boundary, 10)
                    .then(list => {
                        markerDispatch({type: 'SET_LIST', payload: list})
                    })
                    .catch(e => {
                        console.log(e);
                    })
            } else {
                let list = initMarkerList(boundary, 10);
                console.log('list is', list)
                markerDispatch({type: 'SET_LIST', payload: list})
            }
        }
    }, [boundary])

    React.useEffect(() => {
        if (markerState.markers.length) {
            navigation.navigate('Map');
        }
    }, [markerState.markers])


    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                mapType='hybrid'
                initialRegion={initialRegion}
                onPress={addToPolygon}
                onPanDrag={() => setFollowing(false)}
                onRegionChange={e => {setRegion(e)}}
                showsUserLocation
                followsUserLocation={isFollowingUser}
                onUserLocationChange={e => console.log(e.nativeEvent)}
            >
                <PolyBoundary coords={coords}/>
            </MapView>
            <Instructions coordsLen={coords.length}/>
            <PolyButton coordsLen={coords.length} coords={coords} setBoundary={setBoundary}/>
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