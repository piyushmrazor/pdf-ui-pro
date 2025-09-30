import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('teamPulseState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('teamPulseState', serializedState);
  } catch {
    // Ignore write errors
  }
};

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});
