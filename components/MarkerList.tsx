import React from 'react';
import { Marker, LatLng } from 'react-native-maps';
import { Feature, Point } from '@turf/turf';
let image = require('../assets/icons8-marker-x-50.png')

type MarkerProps = {
    markerList: Feature<Point>[]
}

export default function MarkerList({markerList}: MarkerProps) {

    return (
        <>
            {markerList.map(marker => {
                return (
                    <Marker
                        key={marker.geometry.coordinates[0]}
                        image={image}
                        coordinate={{longitude: marker.geometry.coordinates[0], latitude: marker.geometry.coordinates[1]}}
                    />
                );
            })}
        </>
    );
}