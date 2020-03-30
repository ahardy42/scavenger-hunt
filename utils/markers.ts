import { LocationData } from "expo-location";
import { LatLng } from 'react-native-maps';
import { circle, point, randomPoint, bbox, BBox, Feature, Point, distance, lineString, Polygon, polygon } from '@turf/turf';
import randomPointsOnPolygon from 'random-points-on-polygon';
import { snapArray } from './api';

const filterFunc: (feature: Feature<Point>, location: LocationData, vicinityRadius: number) => boolean = (feature, location, vicinityRadius) => {
    return distance([location.coords.longitude, location.coords.latitude], feature.geometry.coordinates, { units: 'meters' }) < vicinityRadius
}

export const initMarkerList: (boundary: LatLng[], len: number) => Feature<Point>[] = (boundary, len) => {
    let poly = polygon([[...boundary.map(el => [el.longitude, el.latitude]), [boundary[0].longitude, boundary[0].latitude]]]);
    let markerArray: Feature<Point>[] = randomPointsOnPolygon(len, poly)
    markerArray.forEach((marker, index) => marker.id = index)
    return markerArray;
}

export const initSnappedMarkerList: (boundary: LatLng[], len: number) => Promise<Feature<Point>[]> = async (boundary, len) => {
    let poly = polygon([[...boundary.map(el => [el.longitude, el.latitude]), [boundary[0].longitude, boundary[0].latitude]]]);
    let markerArray: Feature<Point>[] = randomPointsOnPolygon(len, poly)
    markerArray.forEach((marker, index) => marker.id = index)
    let updatedArray = await snapArray(markerArray);
    return updatedArray;
}

export const findAdjacentMarker: (location: LocationData, markerList: Feature<Point>[], vicinityRadius: number) => Feature<Point> = (location, markerList, vicinityRadius) => {
    let marker: Feature<Point> = markerList.find(feature => filterFunc(feature, location, vicinityRadius));
    return marker;
}