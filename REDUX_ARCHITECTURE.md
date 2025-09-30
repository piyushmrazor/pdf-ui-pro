# Redux Architecture - Team Pulse Dashboard

Complete documentation of the Redux Toolkit implementation.

## 📚 Table of Contents

1. [Overview](#overview)
2. [Store Configuration](#store-configuration)
3. [Slices](#slices)
4. [Selectors](#selectors)
5. [Typed Hooks](#typed-hooks)
6. [Middleware](#middleware)
7. [Persistence](#persistence)
8. [Best Practices](#best-practices)

---

## Overview

This project uses **Redux Toolkit** for state management, following modern best practices:

- ✅ **createSlice** for reducers and actions
- ✅ **configureStore** for store setup
- ✅ **TypeScript** for full type safety
- ✅ **Memoized Selectors** for performance
- ✅ **Custom Typed Hooks** for cleaner code
- ✅ **LocalStorage Middleware** for persistence
- ✅ **Logger Middleware** for debugging

---

## Store Configuration

**Location**: `src/redux/store.ts`

### Store Setup

```typescript
export const store = configureStore({
  reducer: {
    members: membersReducer,  // Team members and tasks
    role: roleReducer,        // Current user and role
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { /* ... */ },
    }).concat(loggerMiddleware),
  preloadedState: loadState(),  // Load from localStorage
  devTools: process.env.NODE_ENV !== 'production',
});
```

### Type Exports

```typescript
// Inferred from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## Slices

### 1. Role Slice

**Location**: `src/redux/slices/roleSlice.ts`

**Purpose**: Manages current user identity and role

**State Shape**:
```typescript
{
  currentRole: 'lead' | 'member',
  currentUser: string,
  previousRole: 'lead' | 'member' | null
}
```

**Actions**:

| Action | Payload | Description |
|--------|---------|-------------|
| `switchRole` | `Role` | Switch to specific role |
| `toggleRole` | none | Toggle between roles |
| `setUser` | `string` | Set current user name |
| `setRoleAndUser` | `{ role, userName }` | Set both at once |
| `revertToPreviousRole` | none | Go back to previous role |
| `resetRoleState` | none | Reset to initial state |

**Usage Example**:
```typescript
import { useAppDispatch } from '@/redux/hooks';
import { toggleRole, setUser } from '@/redux/slices/roleSlice';

const Component = () => {
  const dispatch = useAppDispatch();
  
  // Toggle role
  dispatch(toggleRole());
  
  // Change user
  dispatch(setUser('Sarah Smith'));
  
  // Set both at once
  dispatch(setRoleAndUser({ role: 'lead', userName: 'Alex Brown' }));
};
```

---

### 2. Members Slice

**Location**: `src/redux/slices/membersSlice.ts`

**Purpose**: Manages team members, tasks, filters, and sorting

**State Shape**:
```typescript
{
  members: Member[],
  statusFilter: Status | 'All',
  sortBy: 'name' | 'tasks',
  isLoading: boolean,
  error: string | null
}
```

**Member Type**:
```typescript
{
  id: string,
  name: string,
  email: string,
  avatar: string,
  status: 'Working' | 'Break' | 'Meeting' | 'Offline',
  tasks: Task[]
}
```

**Task Type**:
```typescript
{
  id: string,
  title: string,
  dueDate: string,
  progress: number,    // 0-100
  completed: boolean
}
```

**Actions**:

| Action | Payload | Description |
|--------|---------|-------------|
| `updateMemberStatus` | `{ memberId, status }` | Update member's status |
| `assignTask` | `{ memberId, task }` | Assign new task to member |
| `updateTaskProgress` | `{ memberId, taskId, progress }` | Update task progress (0-100) |
| `toggleTaskCompletion` | `{ memberId, taskId, completed }` | Toggle task completion |
| `deleteTask` | `{ memberId, taskId }` | Delete a task |
| `setStatusFilter` | `Status \| 'All'` | Set member filter |
| `setSortBy` | `'name' \| 'tasks'` | Set sort preference |
| `addMember` | `Omit<Member, 'id'>` | Add new team member |
| `removeMember` | `string` | Remove member by ID |
| `setMembers` | `Member[]` | Bulk set all members |
| `setLoading` | `boolean` | Set loading state |
| `setError` | `string \| null` | Set error state |
| `clearFilters` | none | Reset all filters |

**Usage Example**:
```typescript
import { useAppDispatch } from '@/redux/hooks';
import {
  assignTask,
  updateTaskProgress,
  updateMemberStatus
} from '@/redux/slices/membersSlice';

const Component = () => {
  const dispatch = useAppDispatch();
  
  // Assign task
  dispatch(assignTask({
    memberId: 'm1',
    task: {
      title: 'New Feature',
      dueDate: '2025-10-15',
      progress: 0,
      completed: false
    }
  }));
  
  // Update progress
  dispatch(updateTaskProgress({
    memberId: 'm1',
    taskId: 't1',
    progress: 75
  }));
  
  // Update status
  dispatch(updateMemberStatus({
    memberId: 'm1',
    status: 'Meeting'
  }));
};
```

---

## Selectors

**Location**: `src/redux/selectors.ts`

Memoized selectors using `createSelector` from Redux Toolkit for optimal performance.

### Why Selectors?

1. **Performance**: Memoization prevents unnecessary recalculations
2. **Reusability**: Use same logic across components
3. **Testability**: Easier to test business logic
4. **Separation of Concerns**: Keep computation out of components

### Available Selectors

#### Role Selectors

```typescript
selectCurrentRole(state)        // Returns current role
selectCurrentUser(state)        // Returns current user name
selectIsLead(state)            // Returns boolean (memoized)
```

#### Member Selectors

```typescript
selectAllMembers(state)              // All members
selectStatusFilter(state)            // Current filter
selectSortBy(state)                  // Current sort
selectMemberById(memberId)(state)    // Specific member
selectCurrentMember(state)           // Current user's member data
selectFilteredMembers(state)         // Filtered by status (memoized)
selectSortedMembers(state)           // Sorted & filtered (memoized)
selectTotalMembers(state)            // Total count
selectMembersWithTasks(state)        // Members who have tasks
selectMembersWithoutTasks(state)     // Members with no tasks
```

#### Task Selectors

```typescript
selectTotalActiveTasks(state)              // Total active tasks
selectTotalCompletedTasks(state)           // Total completed tasks
selectCurrentMemberActiveTasks(state)      // Current user's active tasks
selectCurrentMemberCompletedTasks(state)   // Current user's completed tasks
selectMemberActiveTaskCount(memberId)(state)     // Count for specific member
selectMemberCompletedTaskCount(memberId)(state)  // Count for specific member
```

#### Chart Selectors

```typescript
selectStatusCounts(state)    // { Working: 2, Break: 1, ... } (memoized)
selectStatusChartData(state) // [{ name: 'Working', value: 2 }, ...] (memoized)
selectMembersByStatus(status)(state)  // Members with specific status
```

### Usage Example

```typescript
import { useAppSelector } from '@/redux/hooks';
import {
  selectSortedMembers,
  selectStatusCounts,
  selectCurrentMember
} from '@/redux/selectors';

const Component = () => {
  // Use selectors instead of raw state access
  const sortedMembers = useAppSelector(selectSortedMembers);
  const statusCounts = useAppSelector(selectStatusCounts);
  const currentMember = useAppSelector(selectCurrentMember);
  
  // Selectors are memoized - only recompute when dependencies change
  return (
    <div>
      <p>Total Working: {statusCounts.Working || 0}</p>
      <p>Current User: {currentMember?.name}</p>
    </div>
  );
};
```

---

## Typed Hooks

**Location**: `src/redux/hooks.ts`

### Why Typed Hooks?

- **Type Safety**: Automatic TypeScript inference
- **Less Boilerplate**: No need to type hooks everywhere
- **Best Practice**: Recommended by Redux Toolkit docs

### Available Hooks

```typescript
useAppDispatch()   // Typed version of useDispatch
useAppSelector()   // Typed version of useSelector
```

### Usage

```typescript
// ❌ Old way (untyped)
import { useDispatch, useSelector } from 'react-redux';
const dispatch = useDispatch();
const user = useSelector((state: RootState) => state.role.currentUser);

// ✅ New way (typed)
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/selectors';
const dispatch = useAppDispatch();
const user = useAppSelector(selectCurrentUser);
```

---

## Middleware

### 1. Logger Middleware

**Purpose**: Log actions and state changes in development

**When**: Only active in development mode

**Output**:
```
Action: members/assignTask
  Payload: { memberId: 'm1', task: {...} }
  Previous State: { ... }
  New State: { ... }
```

**Toggle**: Set `NODE_ENV=production` to disable

### 2. Persistence Middleware (Subscription)

**Purpose**: Automatically save state to localStorage

**Features**:
- Debounced saves (800ms delay)
- Error handling
- Prevents excessive writes

**How it works**:
```typescript
// Every time state changes, debounced save is scheduled
store.subscribe(() => {
  debouncedSaveState(store.getState());
});
```

---

## Persistence

### LocalStorage Strategy

**Key**: `teamPulseState`

**What's Saved**: Entire Redux state

**When**:
- On every action (debounced)
- Before page unload

**Loading**:
- On app initialization
- Via `preloadedState` in configureStore

### API

```typescript
// Save current state
saveState(state: RootState): void

// Load persisted state
loadState(): RootState | undefined

// Clear persisted data
clearPersistedState(): void

// Reset everything and reload
resetStore(): void
```

### Usage

```typescript
import { clearPersistedState, resetStore } from '@/redux/store';

// Clear persisted state (useful for logout)
clearPersistedState();

// Full reset (clears and reloads page)
resetStore();
```

### Debouncing

Saves are debounced to prevent excessive localStorage writes:

```typescript
// Saves happen 800ms after last action
const debouncedSaveState = debounce(saveState, 800);
```

**Benefits**:
- Reduces localStorage writes
- Improves performance
- Prevents quota issues

---

## Best Practices

### 1. Always Use Typed Hooks

```typescript
// ✅ Do this
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// ❌ Don't do this
import { useDispatch, useSelector } from 'react-redux';
```

### 2. Use Selectors for Derived Data

```typescript
// ✅ Do this (memoized, reusable)
const activeTasks = useAppSelector(selectCurrentMemberActiveTasks);

// ❌ Don't do this (computed every render)
const member = useAppSelector(state => state.members.members.find(...));
const activeTasks = member?.tasks.filter(t => !t.completed);
```

### 3. Keep Components Thin

```typescript
// ✅ Do this
const Component = () => {
  const sortedMembers = useAppSelector(selectSortedMembers);
  return <MemberList members={sortedMembers} />;
};

// ❌ Don't do this
const Component = () => {
  const members = useAppSelector(state => state.members.members);
  const filter = useAppSelector(state => state.members.statusFilter);
  const sort = useAppSelector(state => state.members.sortBy);
  
  const filtered = filter === 'All' ? members : members.filter(...);
  const sorted = [...filtered].sort(...);
  
  return <MemberList members={sorted} />;
};
```

### 4. Use Action Creators

```typescript
// ✅ Do this
dispatch(assignTask({ memberId, task }));

// ❌ Don't do this
dispatch({
  type: 'members/assignTask',
  payload: { memberId, task }
});
```

### 5. Leverage TypeScript

```typescript
// ✅ Full type safety
const dispatch = useAppDispatch();  // AppDispatch type
const members = useAppSelector(selectAllMembers);  // Member[] type

// Actions are typed
dispatch(assignTask({
  memberId: 'string',   // ✅ Required
  task: {
    title: 'string',    // ✅ Required
    dueDate: 'string',  // ✅ Required
    progress: 0,        // ✅ Required
    completed: false    // ✅ Required
  }
}));
```

---

## Advanced Patterns

### 1. Conditional Selectors

```typescript
// Select member only if in lead view
const currentMemberIfLead = useAppSelector(state => {
  if (state.role.currentRole !== 'lead') return null;
  return selectCurrentMember(state);
});
```

### 2. Parameterized Selectors

```typescript
// Create selector factory
const selectMemberTasks = (memberId: string) =>
  createSelector(
    [selectAllMembers],
    (members) => members.find(m => m.id === memberId)?.tasks || []
  );

// Use in component
const memberTasks = useAppSelector(selectMemberTasks('m1'));
```

### 3. Combining Selectors

```typescript
export const selectTeamStats = createSelector(
  [selectTotalMembers, selectTotalActiveTasks, selectStatusCounts],
  (totalMembers, activeTasks, statusCounts) => ({
    totalMembers,
    activeTasks,
    completedStatuses: statusCounts.Working || 0,
    avgTasksPerMember: activeTasks / totalMembers
  })
);
```

---

## Performance Optimization

### Selector Memoization

Selectors use memoization to prevent unnecessary recalculations:

```typescript
// Only recalculates when members or sortBy changes
export const selectSortedMembers = createSelector(
  [selectFilteredMembers, selectSortBy],
  (filteredMembers, sortBy) => {
    // Expensive sort operation
    return [...filteredMembers].sort(...);
  }
);
```

**Benefits**:
- Component only re-renders when result changes
- Expensive computations cached
- Better performance with large datasets

### Debounced Persistence

LocalStorage saves are debounced:

```typescript
// Saves 800ms after last action
const debouncedSaveState = debounce(saveState, 800);
```

**Benefits**:
- Fewer localStorage writes
- Better performance during rapid actions
- Prevents storage quota issues

---

## Debugging

### Redux DevTools

Install browser extension and use:

1. **Inspect State**: View entire state tree
2. **Time Travel**: Jump to any previous state
3. **Action History**: See all dispatched actions
4. **Diff**: Compare state changes
5. **Export/Import**: Save/load state snapshots

### Logger Middleware

In development, every action is logged:

```javascript
Action: members/assignTask
  Payload: { memberId: 'm1', task: {...} }
  Previous State: { members: [...], ... }
  New State: { members: [...], ... }  // Updated
```

---

## Testing Redux

### Testing Reducers

```typescript
import { membersSlice, assignTask } from './membersSlice';

test('assignTask adds task to member', () => {
  const initialState = {
    members: [{ id: 'm1', name: 'John', tasks: [] }],
    statusFilter: 'All',
    sortBy: 'name',
    isLoading: false,
    error: null
  };
  
  const action = assignTask({
    memberId: 'm1',
    task: { title: 'Test', dueDate: '2025-10-10', progress: 0, completed: false }
  });
  
  const newState = membersSlice.reducer(initialState, action);
  
  expect(newState.members[0].tasks).toHaveLength(1);
  expect(newState.members[0].tasks[0].title).toBe('Test');
});
```

### Testing Selectors

```typescript
import { selectStatusCounts } from './selectors';

test('selectStatusCounts counts members by status', () => {
  const state = {
    members: {
      members: [
        { id: '1', status: 'Working', ... },
        { id: '2', status: 'Working', ... },
        { id: '3', status: 'Break', ... }
      ],
      ...
    },
    role: { ... }
  };
  
  const counts = selectStatusCounts(state);
  
  expect(counts.Working).toBe(2);
  expect(counts.Break).toBe(1);
});
```

### Testing Components with Redux

```typescript
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';

test('renders current user name', () => {
  const store = configureStore({
    reducer: {
      role: roleReducer,
      members: membersReducer
    },
    preloadedState: {
      role: { currentRole: 'member', currentUser: 'Test User' }
    }
  });
  
  const { getByText } = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  
  expect(getByText('Test User')).toBeInTheDocument();
});
```

---

## Common Patterns

### 1. Dispatching Multiple Actions

```typescript
const handleBulkUpdate = () => {
  // Dispatch multiple actions in sequence
  dispatch(setStatusFilter('All'));
  dispatch(setSortBy('name'));
  dispatch(clearFilters());
};
```

### 2. Conditional Dispatching

```typescript
const handleStatusChange = (status: Status) => {
  // Only dispatch if status actually changed
  if (currentMember.status !== status) {
    dispatch(updateMemberStatus({ memberId: currentMember.id, status }));
    toast.success(`Status updated to ${status}`);
  }
};
```

### 3. Optimistic Updates

```typescript
const handleTaskCompletion = async (taskId: string) => {
  // Update UI immediately
  dispatch(toggleTaskCompletion({
    memberId: currentMember.id,
    taskId,
    completed: true
  }));
  
  try {
    // Sync with API (if you had one)
    await api.completeTask(taskId);
  } catch (error) {
    // Revert on error
    dispatch(toggleTaskCompletion({
      memberId: currentMember.id,
      taskId,
      completed: false
    }));
    toast.error('Failed to complete task');
  }
};
```

---

## Migration Guide

### From Component State to Redux

**Before**:
```typescript
const [filter, setFilter] = useState('All');
const filteredMembers = members.filter(m => 
  filter === 'All' || m.status === filter
);
```

**After**:
```typescript
const filter = useAppSelector(selectStatusFilter);
const filteredMembers = useAppSelector(selectFilteredMembers);
const dispatch = useAppDispatch();

// Update filter
dispatch(setStatusFilter('Working'));
```

### From Context to Redux

**Before**:
```typescript
const { currentUser, setCurrentUser } = useContext(UserContext);
```

**After**:
```typescript
const currentUser = useAppSelector(selectCurrentUser);
const dispatch = useAppDispatch();

dispatch(setUser('New User'));
```

---

## Troubleshooting

### State Not Updating

**Problem**: Component not re-rendering on state change

**Solutions**:
1. Check if using correct selector
2. Verify action is dispatched
3. Check Redux DevTools for action
4. Ensure component is connected to Redux

### Selector Not Memoizing

**Problem**: Selector recalculates on every render

**Check**:
1. Are you creating selector inside component? (Don't!)
2. Are dependencies correct?
3. Is input reference stable?

```typescript
// ❌ Wrong - creates new selector every render
const Component = () => {
  const data = useAppSelector(state => 
    createSelector([...], (...) => ...)
  );
};

// ✅ Correct - selector defined outside
const selectData = createSelector([...], (...) => ...);

const Component = () => {
  const data = useAppSelector(selectData);
};
```

### localStorage Not Persisting

**Check**:
1. Browser privacy mode disabled?
2. Storage quota not exceeded?
3. Check console for errors
4. Verify subscription is active

---

## Performance Tips

1. **Use Selectors**: Always prefer memoized selectors
2. **Normalize State**: Consider entity adapters for large datasets
3. **Split Slices**: Keep slices focused and small
4. **Batch Actions**: Use RTK's batch() if dispatching many at once
5. **Lazy Load**: Code-split routes and heavy components

---

## References

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Redux Style Guide](https://redux.js.org/style-guide/)
- [Reselect (Memoization)](https://github.com/reduxjs/reselect)
- [TypeScript with Redux](https://redux.js.org/usage/usage-with-typescript)

---

**This Redux implementation follows all modern best practices and is production-ready.** ✅
