import { configureStore } from "@reduxjs/toolkit";
import { assignmentReducer, addShip, removeShip, assignGeneral, removeGeneral, AssignmentStore, reset } from "@/store/assignmentReducer";
import { Starship } from "@/model/starship";
import { Assignment } from "@/model/assignment";
import { mockStarship } from "../mocks/mock.starship";
import { mockPerson } from "../mocks/mock.person";
import { Person } from "@/model/person";
import { starshipList } from "../mocks/mock.starship.list";
import { mockPeople } from "../mocks/mock.person.list";

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

    it('should not assign a general to a non-existing starship', () => {
        const storedStarship: Starship = starshipList[0];
        const assignedStarship: Starship = starshipList[1];
        const general: Person = mockPerson;
        const assignment: Assignment = { starship: assignedStarship, general };
        store.dispatch(addShip(storedStarship));
        store.dispatch(assignGeneral(assignment));
        const state = store.getState();
        expect(state.assignments[0].general).not.toEqual(assignment.general);
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

    it('should not remove a non-assigned general', () => {
        const starship: Starship = mockStarship;
        const storedGeneral: Person = mockPeople[0];
        const assignedGeneral: Person = mockPeople[1];
        const storedAssignment: Assignment = { starship, general: storedGeneral };
        const removedAssignment: Assignment = { starship, general: assignedGeneral };
        store.dispatch(addShip(starship));
        store.dispatch(assignGeneral(storedAssignment));
        store.dispatch(removeGeneral(removedAssignment));
        const state = store.getState();
        expect(state.assignments[0].general).toEqual(storedGeneral);
        expect(state.assignments[0].general).not.toEqual(assignedGeneral);
    });

    it('should remove general if general of new assignment is empty', () => {
        const general: Person = mockPerson;
        
        const starship: Starship = starshipList[0];

        const firstAssignment: Assignment = { starship, general };
        const secondAssignment: Assignment = { starship };

        store.dispatch(addShip(starship));

        store.dispatch(assignGeneral(firstAssignment));
        store.dispatch(assignGeneral(secondAssignment));

        const state = store.getState();
        expect(state.assignments.length).toEqual(1);
        expect(state.assignments[0].general).not.toEqual(general);
    });

    it('should reset the store', () => {
        const starship: Starship = mockStarship;
        const general: Person = mockPerson;
        const assignment: Assignment = { starship, general };
        store.dispatch(addShip(starship));
        store.dispatch(assignGeneral(assignment));
        store.dispatch(reset());
        const state = store.getState();
        expect(state.assignments).toHaveLength(0);
    });
});