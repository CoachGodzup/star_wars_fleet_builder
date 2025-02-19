import { configureStore } from "@reduxjs/toolkit";
import { assignmentReducer, addShip, removeShip, assignGeneral, removeGeneral, AssignmentStore } from "@/store/assignmentReducer";
import { Starship } from "@/model/starship";
import { Assignment } from "@/model/assignment";
import { mockStarship } from "../mocks/mock.starship";
import { mockPerson } from "../mocks/mock.person";
import { Person } from "@/model/person";

describe('assignmentReducer', () => {
    let store: AssignmentStore;

    beforeEach(() => {
        store = configureStore({ reducer: assignmentReducer });
    });

    it('should add a starship', () => {
        const starship: Starship = mockStarship;
        store.dispatch(addShip(starship));
        const state = store.getState();
        expect(state.assignments).toHaveLength(1);
        expect(state.assignments[0].starship).toEqual(starship);
    });

    it('should remove a starship', () => {
        const starship: Starship = mockStarship;
        store.dispatch(addShip(starship));
        store.dispatch(removeShip(starship));
        const state = store.getState();
        expect(state.assignments).toHaveLength(0);
    });

    it('should assign a general to a starship', () => {
        const starship: Starship = mockStarship;
        const general: Person = mockPerson;
        const assignment: Assignment = { starship, general };
        store.dispatch(addShip(starship));
        store.dispatch(assignGeneral(assignment));
        const state = store.getState();
        expect(state.assignments[0].general).toEqual(assignment.general);
    });

    it('should remove a general from a starship', () => {
        const starship: Starship = mockStarship;
        const general: Person = mockPerson;
        const assignment: Assignment = { starship, general };
        store.dispatch(addShip(starship));
        store.dispatch(assignGeneral(assignment));
        store.dispatch(removeGeneral(assignment));
        const state = store.getState();
        expect(state.assignments[0].general).toBeUndefined();
    });
});