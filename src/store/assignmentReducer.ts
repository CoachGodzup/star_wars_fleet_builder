import { Assignment } from "@/model/assignment";
import { Person } from "@/model/person";
import { Starship } from "@/model/starship";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

export type AssignmentStoreData = {
    assignments: Assignment[];
}

const initialState: AssignmentStoreData = {
    assignments: [],
}

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        addShip: (state, action: PayloadAction<Starship>) => ({
            ...state,
            assignments: [...state.assignments, { starship: action.payload }],
        }),
        removeShip: (state, action: PayloadAction<Starship>) => ({
            ...state,
            assignments: [...state.assignments.filter(elm => elm.starship.url !== action.payload.url)],
        }),
        assignGeneral: (state, action: PayloadAction<Assignment>) => ({
            ...state,
            assignments: [...state.assignments.map(elm => elm.starship.url !== action.payload.starship.url ? elm : action.payload)],
        }),
        removeGeneral: (state, action: PayloadAction<Assignment>) => ({
            ...state,
            assignments: [...state.assignments.map(elm => elm.starship.url !== action.payload.starship.url ? elm : { starship: action.payload.starship })],
        }),
    },
});

export type AssignmentStore = typeof store;

// Export actions
export const { addShip, removeShip, assignGeneral, removeGeneral } = assignmentSlice.actions

// Create reducer
export const assignmentReducer = assignmentSlice.reducer

// Create store (for testing)
export const store = configureStore({
  reducer: assignmentReducer,
})

setupListeners(store.dispatch)