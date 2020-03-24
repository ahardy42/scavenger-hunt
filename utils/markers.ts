import { LocationData } from "expo-location";
import { circle, point, randomPoint, bbox, BBox, Feature, Point, distance } from '@turf/turf';

const generateBbox: (location: LocationData, radius: number) => BBox = (location, radius) => {
    // generate a bbox from location and a radius
    let circleAroundPosition = circle(point([location.coords.longitude, location.coords.latitude]), radius, { units: 'meters' })
    return bbox(circleAroundPosition);
}

const filterFunc: (feature: Feature<Point>, location: LocationData) => boolean = (feature, location) => {
    return distance([location.coords.longitude, location.coords.latitude], feature.geometry.coordinates, { units: 'meters' }) > 5
}

export const initMarkerList: (location: LocationData, len: number) => Feature<Point>[] = (location, len) => {
    let markerArray = randomPoint(len, { bbox: generateBbox(location, 1000) }).features;
    return markerArray;
}

export const filterMarkersByProximity: (location: LocationData, markerList: Feature<Point>[]) => Feature<Point>[] = (location, markerList) => {
    let returnedList: Feature<Point>[] = [...markerList].filter(feature => filterFunc(feature, location));
    return returnedList;
}