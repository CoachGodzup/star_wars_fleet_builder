'use client'

import { configureStore } from '@reduxjs/toolkit';
import { detailReducer } from './detailReducer';
import { assignmentReducer } from './assignmentReducer';
import { navReducer } from './navStore';

const rootReducer = {
    nav: navReducer,
    detail: detailReducer,
    assignment: assignmentReducer,
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