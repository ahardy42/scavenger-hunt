import React from 'react';
import { Marker, LatLng } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import { Feature, Point } from '@turf/turf';

type MarkerProps = {
    markerList: Feature<Point>[]
}

export default function MarkerList({ markerList }: MarkerProps) {

    return (
        <>
            {markerList.map(marker => {
                return (
                    <Marker
                        key={marker.geometry.coordinates[0]}
                        coordinate={{ longitude: marker.geometry.coordinates[0], latitude: marker.geometry.coordinates[1] }}
                    >
                        <Svg height='25' width='25'>
                            <Path d="M502,0H0V502" fill="#FFF" />
                            <Path d="M0,25H25V0" fill="orange" />
                        </Svg>
                    </Marker>
                );
            })}
        </>
    );
}