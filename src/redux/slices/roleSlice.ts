import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Available user roles in the application
 */
export type Role = 'lead' | 'member';

/**
 * Role slice state interface
 */
interface RoleState {
  currentRole: Role;
  currentUser: string;
  previousRole: Role | null;
}

const initialState: RoleState = {
  currentRole: 'member',
  currentUser: 'Nishu Kumar',
  previousRole: null,
};

/**
 * Role slice - manages current user role and identity
 * 
 * This slice handles:
 * - Switching between Team Lead and Team Member roles
 * - Tracking the current user
 * - Maintaining role history for potential undo functionality
 */
const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    /**
     * Switch to a specific role
     * Stores previous role for potential rollback
     * @param role - The role to switch to ('lead' or 'member')
     */
    switchRole: (state, action: PayloadAction<Role>) => {
      state.previousRole = state.currentRole;
      state.currentRole = action.payload;
    },

    /**
     * Toggle between lead and member roles
     * Convenience action for role switching
     */
    toggleRole: (state) => {
      state.previousRole = state.currentRole;
      state.currentRole = state.currentRole === 'lead' ? 'member' : 'lead';
    },

    /**
     * Set the current user
     * @param userName - The name of the current user
     */
    setUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },

    /**
     * Set both role and user at once
     * Useful for login/authentication flows
     * @param role - The user's role
     * @param userName - The user's name
     */
    setRoleAndUser: (state, action: PayloadAction<{ role: Role; userName: string }>) => {
      state.previousRole = state.currentRole;
      state.currentRole = action.payload.role;
      state.currentUser = action.payload.userName;
    },

    /**
     * Revert to previous role
     * Only works if there was a previous role
     */
    revertToPreviousRole: (state) => {
      if (state.previousRole !== null) {
        const temp = state.currentRole;
        state.currentRole = state.previousRole;
        state.previousRole = temp;
      }
    },

    /**
     * Reset role state to initial values
     */
    resetRoleState: (state) => {
      state.currentRole = initialState.currentRole;
      state.currentUser = initialState.currentUser;
      state.previousRole = null;
    },
  },
});

// Export all actions
export const {
  switchRole,
  toggleRole,
  setUser,
  setRoleAndUser,
  revertToPreviousRole,
  resetRoleState,
} = roleSlice.actions;

// Export reducer as default
export default roleSlice.reducer;
