import { Assignment } from "@/model/assignment";
import { Starship } from "@/model/starship";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';

export type AssignmentStoreData = {
    assignments: Assignment[];
};

const initialState: AssignmentStoreData = {
    assignments: [],
};

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        reset: (state) => ({
            ...state,
            assignments: [],
        }),
        addShip: (state, action: PayloadAction<Starship>) => ({
            ...state,
            assignments: [...state.assignments, { starship: action.payload }],
        }),
        removeShip: (state, action: PayloadAction<number>) => ({
            ...state,
            assignments: state.assignments.filter((elm, i) => i !== action.payload),
        }),
        assignGeneral: (state, action: PayloadAction<Assignment>) => ({
            ...state,
            assignments: state.assignments.map(elm => elm.starship.url !== action.payload.starship.url ? elm : action.payload),
        }),
        removeGeneral: (state, action: PayloadAction<Assignment>) => ({
            ...state,
            assignments: state.assignments.map(elm => elm.starship.url !== action.payload.starship.url || elm.general?.url !== action.payload.general?.url ? elm : { starship: action.payload.starship }),
        }),
    },
});

export type AssignmentStore = typeof store;

// Export actions
export const { reset, addShip, removeShip, assignGeneral, removeGeneral } = assignmentSlice.actions;

// Create reducer
export const assignmentReducer = assignmentSlice.reducer;

// Create store (for testing)
export const store = configureStore({
    reducer: assignmentReducer,
});

setupListeners(store.dispatch);