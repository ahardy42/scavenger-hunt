import React, {createContext, useContext, useState} from 'react';
import { Region } from 'react-native-maps';

export const RegionContext = createContext(null);

export function RegionProvider({ children }) {
    return (
        <RegionContext.Provider value={useState<Region>(null)}>
            {children}
        </RegionContext.Provider>
    );
}

export const useRegionContext: () => [Region, React.Dispatch<React.SetStateAction<Region>>] = () => useContext(RegionContext);