import { configureStore } from '@reduxjs/toolkit';
import { navReducer, NavStore, next, prev, setStep } from '@/store/navStore';
import { Step } from '@/store/navStore';

describe('navStore', () => {
  let store: NavStore;

  beforeEach(() => {
    store = configureStore({ reducer: navReducer });
  });

  it('should initialize with the correct state', () => {
    const state = store.getState();
    expect(state.lastValidStep).toBe(Step.detail);
  });

  it('should handle next action', () => {
    store.dispatch(next());
    const state = store.getState();
    expect(state.lastValidStep).toBe(Step.detail + 1);
  });

  it('should handle prev action', () => {
    store.dispatch(next()); // Move to the next step first
    store.dispatch(prev());
    const state = store.getState();
    expect(state.lastValidStep).toBe(Step.detail);
  });

  it('should handle setStep action', () => {
    store.dispatch(setStep(Step.general));
    const state = store.getState();
    expect(state.lastValidStep).toBe(Step.general);
  });

  it('should not go below Step.detail when prev action is dispatched', () => {
    store.dispatch(prev());
    const state = store.getState();
    expect(state.lastValidStep).toBe(Step.detail);
  });

  it('should not go above Step.done when next action is dispatched', () => {
    store.dispatch(setStep(Step.complete));
    store.dispatch(next());
    const state = store.getState();
    expect(state.lastValidStep).toBe(Step.complete);
  });
});
