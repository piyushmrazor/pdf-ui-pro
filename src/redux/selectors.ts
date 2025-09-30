import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Status } from './slices/membersSlice';

// ============================================
// Role Selectors
// ============================================

/**
 * Select the current role (lead or member)
 */
export const selectCurrentRole = (state: RootState) => state.role.currentRole;

/**
 * Select the current user name
 */
export const selectCurrentUser = (state: RootState) => state.role.currentUser;

/**
 * Check if current user is a team lead
 */
export const selectIsLead = createSelector(
  [selectCurrentRole],
  (role) => role === 'lead'
);

// ============================================
// Members Selectors
// ============================================

/**
 * Select all members
 */
export const selectAllMembers = (state: RootState) => state.members.members;

/**
 * Select current status filter
 */
export const selectStatusFilter = (state: RootState) => state.members.statusFilter;

/**
 * Select current sort preference
 */
export const selectSortBy = (state: RootState) => state.members.sortBy;

/**
 * Select a specific member by ID
 */
export const selectMemberById = (memberId: string) => 
  createSelector(
    [selectAllMembers],
    (members) => members.find(m => m.id === memberId)
  );

/**
 * Select the current user's member data
 */
export const selectCurrentMember = createSelector(
  [selectAllMembers, selectCurrentUser],
  (members, currentUser) => members.find(m => m.name === currentUser)
);

/**
 * Select member count by status - Memoized
 */
export const selectStatusCounts = createSelector(
  [selectAllMembers],
  (members) => {
    return members.reduce((acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    }, {} as Record<Status, number>);
  }
);

/**
 * Select filtered members based on current filter
 */
export const selectFilteredMembers = createSelector(
  [selectAllMembers, selectStatusFilter],
  (members, filter) => {
    if (filter === 'All') return members;
    return members.filter(m => m.status === filter);
  }
);

/**
 * Select sorted and filtered members
 */
export const selectSortedMembers = createSelector(
  [selectFilteredMembers, selectSortBy],
  (filteredMembers, sortBy) => {
    return [...filteredMembers].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // Sort by active tasks (descending)
      const aActiveTasks = a.tasks.filter(t => !t.completed).length;
      const bActiveTasks = b.tasks.filter(t => !t.completed).length;
      return bActiveTasks - aActiveTasks;
    });
  }
);

/**
 * Select total team member count
 */
export const selectTotalMembers = createSelector(
  [selectAllMembers],
  (members) => members.length
);

/**
 * Select total active tasks across all members
 */
export const selectTotalActiveTasks = createSelector(
  [selectAllMembers],
  (members) => {
    return members.reduce((total, member) => {
      return total + member.tasks.filter(t => !t.completed).length;
    }, 0);
  }
);

/**
 * Select total completed tasks across all members
 */
export const selectTotalCompletedTasks = createSelector(
  [selectAllMembers],
  (members) => {
    return members.reduce((total, member) => {
      return total + member.tasks.filter(t => t.completed).length;
    }, 0);
  }
);

/**
 * Select current member's active tasks
 */
export const selectCurrentMemberActiveTasks = createSelector(
  [selectCurrentMember],
  (currentMember) => {
    if (!currentMember) return [];
    return currentMember.tasks.filter(t => !t.completed);
  }
);

/**
 * Select current member's completed tasks
 */
export const selectCurrentMemberCompletedTasks = createSelector(
  [selectCurrentMember],
  (currentMember) => {
    if (!currentMember) return [];
    return currentMember.tasks.filter(t => t.completed);
  }
);

/**
 * Select members by status
 */
export const selectMembersByStatus = (status: Status) =>
  createSelector(
    [selectAllMembers],
    (members) => members.filter(m => m.status === status)
  );

/**
 * Select chart data for status distribution
 */
export const selectStatusChartData = createSelector(
  [selectStatusCounts],
  (statusCounts) => {
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  }
);

/**
 * Select members with tasks (for quick filtering)
 */
export const selectMembersWithTasks = createSelector(
  [selectAllMembers],
  (members) => members.filter(m => m.tasks.length > 0)
);

/**
 * Select members without tasks
 */
export const selectMembersWithoutTasks = createSelector(
  [selectAllMembers],
  (members) => members.filter(m => m.tasks.length === 0)
);

/**
 * Select member's active task count
 */
export const selectMemberActiveTaskCount = (memberId: string) =>
  createSelector(
    [selectAllMembers],
    (members) => {
      const member = members.find(m => m.id === memberId);
      if (!member) return 0;
      return member.tasks.filter(t => !t.completed).length;
    }
  );

/**
 * Select member's completed task count
 */
export const selectMemberCompletedTaskCount = (memberId: string) =>
  createSelector(
    [selectAllMembers],
    (members) => {
      const member = members.find(m => m.id === memberId);
      if (!member) return 0;
      return member.tasks.filter(t => t.completed).length;
    }
  );

