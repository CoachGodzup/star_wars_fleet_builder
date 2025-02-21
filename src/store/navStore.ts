import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

export enum Step {
    detail = 0,
    composition,
    general,
    done,
}

type NavStoreData = {
    lastValidStep: Step;
}

const initialState: NavStoreData = {
    lastValidStep: Step.detail,
}

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        next: (state) => ({
            ...state,
            lastValidStep: state.lastValidStep === Step.done ? Step.done : state.lastValidStep + 1,
        }),
        prev: (state) => ({
            ...state,
            lastValidStep: state.lastValidStep === Step.detail ? Step.detail : state.lastValidStep - 1,
        }),
        setStep: (state, action: PayloadAction<Step>) => ({
            ...state,
            lastValidStep: action.payload,
        }),
    },
});


// Export actions
export const { next, prev, setStep } = navSlice.actions

// Create reducer
export const navReducer = navSlice.reducer

// Create store (for testing)
export const store = configureStore({
  reducer: navReducer,
})

export type NavStore = typeof store;

setupListeners(store.dispatch)