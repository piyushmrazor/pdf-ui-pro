import { configureStore, Middleware } from '@reduxjs/toolkit';
import membersReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';

// ============================================
// LocalStorage Persistence
// ============================================

const STORAGE_KEY = 'teamPulseState';

/**
 * Load state from localStorage
 * Returns undefined if no state exists or parsing fails
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return undefined;
  }
};

/**
 * Save state to localStorage with error handling
 */
export const saveState = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
    // Ignore write errors (quota exceeded, etc.)
  }
};

/**
 * Debounce helper for localStorage saves
 * Prevents excessive writes on rapid state changes
 */
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// ============================================
// Middleware
// ============================================

/**
 * Logger middleware for development
 * Logs actions and state changes to console
 */
const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  const isDevelopment = import.meta.env.MODE !== 'production';
  
  if (isDevelopment) {
    console.group(`Action: ${action.type}`);
    console.log('Payload:', action.payload);
    console.log('Previous State:', store.getState());
  }
  
  const result = next(action);
  
  if (isDevelopment) {
    console.log('New State:', store.getState());
    console.groupEnd();
  }
  
  return result;
};

// ============================================
// Store Configuration
// ============================================

/**
 * Configure and create the Redux store
 * - Combines reducers for members and role
 * - Adds custom middleware
 * - Loads persisted state from localStorage
 */
export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Enable serialization checks in development
      serializableCheck: {
        // Ignore these action types if needed
        ignoredActions: [],
        // Ignore these field paths in the state
        ignoredActionPaths: [],
        ignoredPaths: [],
      },
    }).concat(loggerMiddleware),
  // Load initial state from localStorage
  preloadedState: loadState(),
  // Enable Redux DevTools in development
  devTools: import.meta.env.MODE !== 'production',
});

// ============================================
// TypeScript Types
// ============================================

/**
 * Infer the `RootState` type from the store itself
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Infer the `AppDispatch` type from the store itself
 */
export type AppDispatch = typeof store.dispatch;

// ============================================
// State Persistence Subscription
// ============================================

/**
 * Debounced save to prevent excessive localStorage writes
 * Saves state 800ms after the last action
 */
const debouncedSaveState = debounce((state: any) => {
  saveState(state);
}, 800);

/**
 * Subscribe to store updates and save to localStorage
 * Uses debouncing to optimize performance
 */
store.subscribe(() => {
  const state = store.getState();
  debouncedSaveState(state);
});

/**
 * Clear persisted state from localStorage
 * Useful for testing or user logout
 */
export const clearPersistedState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear persisted state:', err);
  }
};

/**
 * Reset store to initial state
 * Clears localStorage and reloads the page
 */
export const resetStore = (): void => {
  clearPersistedState();
  window.location.reload();
};

