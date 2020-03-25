import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, {Region, LatLng} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationData, Accuracy } from 'expo-location';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
// utils
import { filterMarkersByProximity, initMarkerList, initSnappedMarkerList } from '../utils/markers';
import { useFormContext } from '../context/FormContext';
import { Feature, Point } from '@turf/turf';
// components
import MarkerList from '../components/MarkerList';
import StartModal from '../components/StartModal';
import PointsTally from '../components/PointsTally';
import { usePolygonCreator, PolyBoundary } from '../components/PolyBoundary';
import PolyButton from '../components/PolyButton';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Map'
>;

type HomeScreenProps = {
    navigation: ProfileScreenNavigationProp
}

export default function MapScreen({ navigation }: HomeScreenProps) {

    const initialRegion = {
        latitude: 39.8333333,
        longitude: -98.585522,
        latitudeDelta: 50,
        longitudeDelta: 50
    }
    const [region, setRegion] = React.useState<Region>(initialRegion);
    const [location, setLocation] = React.useState<LocationData>(null);
    const removeRef = React.useRef(null);
    const [markerList, setList] = React.useState<Feature<Point>[]>([]);
    // setting the polygon boundary to use in game
    const [isEditing, setEditing] = React.useState<boolean>(true);
    const [boundary, setBoundary] = React.useState<LatLng[]>([]);
    const [coords, addToPolygon] = usePolygonCreator();
    const [timer, setTimer] = React.useState<number>(5);
    const timerRef = React.useRef<number>(null);
    const [formState] = useFormContext();

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

    // on mount, retrieve location data and set the Region
    React.useEffect(() => {

        const _getRegionAsync: () => void = async () => {
            try {
                let { status } = await Permissions.askAsync(Permissions.LOCATION);
                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }

                let location = await Location.getCurrentPositionAsync({});
                // set the region
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

        _getRegionAsync();

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
        setList(prevState => filterMarkersByProximity(location, prevState))
    }, [location])

    React.useEffect(() => {
        if (!isEditing && coords.length) {
            setBoundary(coords);
        }
    }, [isEditing, coords])

    React.useEffect(() => {
        if (boundary.length) {
            // init markers
            if (formState.activity === 'on-road') {
                initSnappedMarkerList(boundary, 10)
                    .then(list => {
                        setList(list);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            } else {
                setList(initMarkerList(boundary, 10))
            }
        }
    }, [boundary])

    return (
        <View style={styles.container}>
            <PointsTally initialLen={10} markerListLen={markerList.length} />
            <StartModal timer={timer}/>
            <MapView 
                style={styles.mapStyle} 
                initialRegion={initialRegion} 
                onPress={e => addToPolygon(e, isEditing)}
                followsUserLocation={timer > 0} 
                showsUserLocation={timer > 0 || formState.difficulty === 'easy'}
            >
                <MarkerList markerList={markerList}/>
                {isEditing && <PolyBoundary coords={coords} />}
            </MapView>
            {isEditing && <PolyButton coordsLen={coords.length} setIsEditing={setEditing}/>}
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
  