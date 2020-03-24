import React, {createContext, useContext, useReducer } from 'react';

type ProviderProps = {
    children: any
}

type FormState = {
    activity: string,
    distance: string,
    difficulty: string
}

type FormActions = 
    | {type: 'SET_ACTIVITY', payload: string}
    | {type: 'SET_DISTANCE', payload: string}
    | {type: 'SET_DIFFICULTY', payload: string}
    | {type: 'RESET_STATE'}

const reducer = (state: FormState, action: FormActions) => {
    switch (action.type) {
        case 'RESET_STATE':
            return { activity: '', distance: ''}
        case 'SET_ACTIVITY':
            return {...state, activity: action.payload}
        case 'SET_DISTANCE':
            return {...state, distance: action.payload}
        case 'SET_DIFFICULTY':
            return {...state, difficulty: action.payload}
        default:
            return state
    }
}

export const FormContext = createContext(null);

export const FormProvider = ({ children }: ProviderProps) => {
    return (
        <FormContext.Provider value={useReducer(reducer, {activity: '', distance: '', difficulty: ''})}>
            {children}
        </FormContext.Provider>
    );
}

export const useFormContext: () => [FormState, React.Dispatch<FormActions>] = () => useContext(FormContext);