import { Person } from "@/model/person";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

export type DetailStoreData = {
    name: string;
    description: string;
    commander?: Person;
}

const initialState: DetailStoreData = {
    name: '',
    description: '',
}

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => ({
            ...state,
            name: action.payload,
        }),
        setDescription: (state, action: PayloadAction<string>) => ({
            ...state,
            description: action.payload,
        }),
        setCommander: (state, action: PayloadAction<Person>) => ({
            ...state,
            commander: action.payload,
        }),
    },
});

export type DetailStore = typeof store;

// Export actions
export const { setName, setDescription, setCommander } = detailSlice.actions

// Create reducer
export const detailReducer = detailSlice.reducer

// Create store (for testing)
export const store = configureStore({
  reducer: detailReducer,
})

setupListeners(store.dispatch)