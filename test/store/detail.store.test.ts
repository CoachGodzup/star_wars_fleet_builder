import { configureStore } from "@reduxjs/toolkit";
import { setName, setDescription, setCommander, detailReducer, DetailStore } from "@/store/detailReducer";
import { Person } from "@/model/person";

describe('detailReducer', () => {
    let store: DetailStore;

    beforeEach(() => {
        store = configureStore({
            reducer: detailReducer,
        });
    });

    it('should have initial state', () => {
        const state = store.getState();
        expect(state).toEqual({
            name: '',
            description: '',
            commander: null,
        });
    });

    it('should handle setName action', () => {
        store.dispatch(setName('John Doe'));
        const state = store.getState();
        expect(state.name).toBe('John Doe');
    });

    it('should handle setDescription action', () => {
        store.dispatch(setDescription('A detailed description'));
        const state = store.getState();
        expect(state.description).toBe('A detailed description');
    });

    it('should handle setCommander action', () => {
        const commander: Person = { id: 1, name: 'Commander Name' };
        store.dispatch(setCommander(commander));
        const state = store.getState();
        expect(state.commander).toEqual(commander);
    });
});