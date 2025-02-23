import { configureStore } from '@reduxjs/toolkit';
import {
  assignmentReducer,
  addShip,
  removeShip,
  assignGeneral,
  removeGeneral,
  AssignmentStore,
  reset,
} from '@/store/assignmentReducer';
import { Starship } from '@/model/starship';
import { mockStarship } from '../mocks/mock.starship';
import { mockPerson } from '../mocks/mock.person';
import { Person } from '@/model/person';
import { mockPeople } from '../mocks/mock.person.list';
import { starshipList } from '../mocks/mock.starship.list';

describe('assignmentReducer', () => {
  let store: AssignmentStore;

  beforeEach(() => {
    store = configureStore({ reducer: assignmentReducer });
  });

  afterAll(() => {
    store.dispatch(reset());
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
    store.dispatch(removeShip(0));
    const state = store.getState();
    expect(state.assignments).toHaveLength(0);
  });

  it('should assign a general to a starship', () => {
    const starship: Starship = mockStarship;
    const general: Person = mockPerson;
    store.dispatch(addShip(starship));
    store.dispatch(assignGeneral({ index: 0, general }));
    const state = store.getState();
    expect(state.assignments[0].general).toEqual(general);
  });

  it('should remove a general from a starship', () => {
    const starship: Starship = mockStarship;
    const general: Person = mockPerson;
    store.dispatch(addShip(starship));
    store.dispatch(assignGeneral({ index: 0, general }));
    store.dispatch(removeGeneral(0));
    const state = store.getState();
    expect(state.assignments[0].general).toBeUndefined();
  });

  it('should not overflow index', () => {
    const starship: Starship = mockStarship;
    const general: Person = mockPeople[0];

    store.dispatch(addShip(starship));
    store.dispatch(assignGeneral({ index: 2, general: general }));

    const state = store.getState();
    expect(state.assignments[0].general).toBeUndefined();
    expect(state.assignments[2]).toBeUndefined();
  });

  it('should move an already assigned general', () => {
    const firstStarship: Starship = starshipList[0];
    const secondStarship: Starship = starshipList[0];

    const general: Person = mockPeople[2];
    store.dispatch(addShip(firstStarship));
    store.dispatch(addShip(secondStarship));

    store.dispatch(assignGeneral({ index: 0, general: general }));
    store.dispatch(assignGeneral({ index: 1, general: general }));

    const state = store.getState();

    expect(state.assignments[1].general).toEqual(general);
    expect(state.assignments[0].general).not.toEqual(general);
  });

  it('should reset the store', () => {
    const starship: Starship = mockStarship;
    const general: Person = mockPerson;
    store.dispatch(addShip(starship));
    store.dispatch(assignGeneral({ index: 0, general }));
    store.dispatch(reset());
    const state = store.getState();
    expect(state.assignments).toHaveLength(0);
  });
});
