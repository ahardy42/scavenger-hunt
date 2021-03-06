import React, { createContext, useContext, useReducer, useState } from 'react';
import { Feature, Point } from '@turf/turf';

type ProviderProps = {
    children: any
}

type MarkerState = {
    markers: Feature<Point>[],
    markerListlen: number,
    numHit: number
}

type MarkerActions =
    | { type: 'SET_LIST', payload: Feature<Point>[] }
    | { type: 'DELETE_MARKER', payload: Feature<Point> }
    | { type: 'RESET_STATE' }

const initialState = {
    markers: [],
    markerListlen: 0,
    numHit: 0
}

const reducer = (state: MarkerState, action: MarkerActions) => {
    switch (action.type) {
        case 'SET_LIST':
            return { markers: action.payload, markerListlen: action.payload.length, numHit: 0 };
        case 'DELETE_MARKER':
            let updatedMarkers = state.markers.filter(marker => marker.id !== action.payload.id);
            let updatedNum = state.numHit + 1;
            return { ...state, markers: updatedMarkers, numHit: updatedNum };
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}

export const MarkerContext = createContext(null);

export const MarkerProvider = ({ children }: ProviderProps) => {

    const [markerState, markerDispatch] = useReducer(reducer, initialState);
    const [isGameOver, setGameOver] = useState<boolean>(false)

    React.useEffect(() => {
        if (markerState.markerListlen && markerState.markerListlen === markerState.numHit) {
            return setGameOver(true);
        }
        
        if (!markerState.markerListlen) {
            return setGameOver(false);
        }

    }, [markerState]);
    
    return (
        <MarkerContext.Provider value={[markerState, markerDispatch, isGameOver]}>
            {children}
        </MarkerContext.Provider>
    );
}

export const useMarkerContext: () => [MarkerState, React.Dispatch<MarkerActions>, boolean] = () => useContext(MarkerContext);