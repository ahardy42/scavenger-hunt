import { Position, Feature, Point } from '@turf/turf';

const snapToRoads: (postion: Position) => Promise<Position> = async position => {
    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position[1]}&lon=${position[0]}&format=json&osm_type=W`);
    let json = await response.json();

    return [parseFloat(json.lon), parseFloat(json.lat)]
}

export const snapArray: (markerList: Feature<Point>[]) => Promise<Feature<Point>[]> = async markerList => {
    let newArray = Promise.all(markerList.map(async el => {
        try {
            let res = await snapToRoads(el.geometry.coordinates);
            el.geometry.coordinates = res;
            return el;
        } catch (error) {
            throw error;
        }
    }));

    return newArray;
}