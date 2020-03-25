import { LocationData } from "expo-location";
import { LatLng } from 'react-native-maps';
import { circle, point, randomPoint, bbox, BBox, Feature, Point, distance, lineString } from '@turf/turf';
import { snapArray } from './api';

const generateBbox: (boundary: LatLng[]) => BBox = (boundary) => {
    // generate a bbox from a boundary array drawn on a map. this is used to create random marker locations
    try {
        let poly = lineString(boundary.map(el => [el.longitude, el.latitude]))
        console.log(poly);
        return bbox(poly);
    } catch (error) {
        console.log(error)
    }
}

const filterFunc: (feature: Feature<Point>, location: LocationData) => boolean = (feature, location) => {
    return distance([location.coords.longitude, location.coords.latitude], feature.geometry.coordinates, { units: 'meters' }) > 5
}

export const initMarkerList: (boundary: LatLng[], len: number) => Feature<Point>[] = (boundary, len) => {
    let markerArray = randomPoint(len, { bbox: generateBbox(boundary) }).features;
    return markerArray;
}

export const initSnappedMarkerList: (boundary: LatLng[], len: number) => Promise<Feature<Point>[]> = async (boundary, len) => {
    let markerArray = randomPoint(len, { bbox: generateBbox(boundary) }).features;
    let updatedArray = await snapArray(markerArray);
    return updatedArray;
}

export const filterMarkersByProximity: (location: LocationData, markerList: Feature<Point>[]) => Feature<Point>[] = (location, markerList) => {
    let returnedList: Feature<Point>[] = [...markerList].filter(feature => filterFunc(feature, location));
    return returnedList;
}