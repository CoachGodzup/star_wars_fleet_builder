'use client'

import { configureStore } from '@reduxjs/toolkit';
import { detailReducer } from './detailReducer';

const rootReducer = {
    detail: detailReducer
    // Add your reducers here
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootStore = typeof store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;