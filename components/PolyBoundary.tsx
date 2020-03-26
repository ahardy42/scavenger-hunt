import React from 'react';
import { Polygon, MapEvent, LatLng, Point, Polyline, Circle,  } from 'react-native-maps';

// hook to emit polygon / editing state
export const usePolygonCreator: () => [LatLng[], (e: any) => void] = () => {

    const [coords, setCoords] = React.useState<LatLng[]>([]);

    const addToPolygon: (e: any) => void = e => {
        e.persist();
        setCoords(prevState => [...prevState, e.nativeEvent.coordinate])
    }

    return [coords, addToPolygon]
}

// PolyBoundary Component
type PolyProps = {
    coords: LatLng[],
}

export function PolyBoundary({ coords }: PolyProps) {

    return (
        <>
            {coords.length < 2 && <Circle center={coords[0]} radius={5} strokeWidth={5} strokeColor='rgb(255, 165, 0)'/>}
            {coords.length < 3 && <Polyline coordinates={coords} strokeWidth={5} strokeColor='rgb(255, 165, 0)'/>}
            <Polygon
                coordinates={coords}
                strokeColor='rgb(255, 165, 0)'
                fillColor='rgba(255, 165, 0, 0.4)'
                strokeWidth={5}
            />
        </>
    );
}