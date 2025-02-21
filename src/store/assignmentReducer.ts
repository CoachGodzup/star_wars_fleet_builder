import { Assignment } from '@/model/assignment';
import { Person } from '@/model/person';
import { Starship } from '@/model/starship';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export type AssignmentStoreData = {
  assignments: Assignment[];
};

const initialState: AssignmentStoreData = {
  assignments: [],
};

type AssignGeneralActionPayload = {
  index: number;
  general: Person;
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
      assignments: state.assignments.filter((_, i) => i !== action.payload),
    }),
    assignGeneral: (
      state,
      action: PayloadAction<AssignGeneralActionPayload>,
    ) => ({
      ...state,
      assignments: state.assignments
        .map((elm) =>
          elm.general?.url === action.payload.general.url
            ? { ...elm, general: undefined }
            : elm,
        )
        .map((elm, i) =>
          i !== action.payload.index
            ? elm
            : { ...elm, general: action.payload.general },
        ),
    }),
    removeGeneral: (state, action: PayloadAction<number>) => ({
      ...state,
      assignments: state.assignments.map((elm, index) =>
        index === action.payload ? { ...elm, general: undefined } : elm,
      ),
    }),
  },
});

export type AssignmentStore = typeof store;

// Export actions
export const { reset, addShip, removeShip, assignGeneral, removeGeneral } =
  assignmentSlice.actions;

// Create reducer
export const assignmentReducer = assignmentSlice.reducer;

// Create store (for testing)
export const store = configureStore({
  reducer: assignmentReducer,
});

setupListeners(store.dispatch);
