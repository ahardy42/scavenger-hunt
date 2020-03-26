import React from 'react';
import { Text } from 'react-native';
import { Marker, Circle } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import { Feature, Point } from '@turf/turf';

type MarkerProps = {
    markerList: Feature<Point>[],
    vicinityRadius: number
}

export default function MarkerList({ markerList, vicinityRadius }: MarkerProps) {

    return (
        <>
            {markerList.map((marker, i) => {
                return (
                    <>
                        <Circle
                            center={{ longitude: marker.geometry.coordinates[0], latitude: marker.geometry.coordinates[1] }}
                            radius={vicinityRadius}
                            strokeColor='rgb(255, 165, 0)'
                            fillColor='rgba(255, 165, 0, 0.3)'
                        />
                        <Marker
                            key={i}
                            coordinate={{ longitude: marker.geometry.coordinates[0], latitude: marker.geometry.coordinates[1] }}
                        >
                            <Svg height='25' width='25'>
                                <Path d="M502,0H0V502" fill="#FFF" />
                                <Path d="M0,25H25V0" fill="orange" />
                            </Svg>
                        </Marker>
                    </>
                );
            })}
        </>
    );
}