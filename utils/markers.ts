import { LocationData } from "expo-location";
import { LatLng } from 'react-native-maps';
import { circle, point, randomPoint, bbox, BBox, Feature, Point, distance, lineString, Polygon, polygon } from '@turf/turf';
import randomPointsOnPolygon from 'random-points-on-polygon';
import { snapArray } from './api';

const filterFunc: (feature: Feature<Point>, location: LocationData) => boolean = (feature, location) => {
    return distance([location.coords.longitude, location.coords.latitude], feature.geometry.coordinates, { units: 'meters' }) < 10
}

export const initMarkerList: (boundary: LatLng[], len: number) => Feature<Point>[] = (boundary, len) => {
    let poly = polygon([[...boundary.map(el => [el.longitude, el.latitude]), [boundary[0].longitude, boundary[0].latitude]]]);
    let markerArray = randomPointsOnPolygon(len, poly)
    return markerArray;
}

export const initSnappedMarkerList: (boundary: LatLng[], len: number) => Promise<Feature<Point>[]> = async (boundary, len) => {
    let poly = polygon([[...boundary.map(el => [el.longitude, el.latitude]), [boundary[0].longitude, boundary[0].latitude]]]);
    let markerArray = randomPointsOnPolygon(len, poly)
    let updatedArray = await snapArray(markerArray);
    return updatedArray;
}

export const findAdjacentMarker: (location: LocationData, markerList: Feature<Point>[]) => Feature<Point> = (location, markerList) => {
    let marker: Feature<Point> = markerList.find(feature => filterFunc(feature, location));
    return marker;
}