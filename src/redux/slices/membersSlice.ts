import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

/**
 * Available status types for team members
 */
export type Status = 'Working' | 'Break' | 'Meeting' | 'Offline';

/**
 * Task interface representing a single task
 */
export interface Task {
  id: string;
  title: string;
  dueDate: string;
  progress: number; // 0-100
  completed: boolean;
}

/**
 * Member interface representing a team member
 */
export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: Status;
  tasks: Task[];
}

/**
 * Members slice state interface
 */
interface MembersState {
  members: Member[];
  statusFilter: Status | 'All';
  sortBy: 'name' | 'tasks';
  isLoading: boolean;
  error: string | null;
}

const initialMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    status: 'Working',
    tasks: [
      {
        id: 't1',
        title: 'Review code PR #234',
        dueDate: '2025-10-05',
        progress: 60,
        completed: false,
      },
      {
        id: 't2',
        title: 'Update documentation',
        dueDate: '2025-10-03',
        progress: 30,
        completed: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah.smith@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    status: 'Meeting',
    tasks: [
      {
        id: 't3',
        title: 'Design new dashboard',
        dueDate: '2025-10-10',
        progress: 80,
        completed: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    status: 'Break',
    tasks: [],
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    status: 'Working',
    tasks: [
      {
        id: 't4',
        title: 'Fix bug in payment module',
        dueDate: '2025-10-02',
        progress: 100,
        completed: true,
      },
      {
        id: 't5',
        title: 'Setup CI/CD pipeline',
        dueDate: '2025-10-08',
        progress: 40,
        completed: false,
      },
    ],
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    status: 'Offline',
    tasks: [],
  },
];

const initialState: MembersState = {
  members: initialMembers,
  statusFilter: 'All',
  sortBy: 'name',
  isLoading: false,
  error: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    /**
     * Update a member's status
     * @param memberId - The ID of the member to update
     * @param status - The new status to set
     */
    updateMemberStatus: (state, action: PayloadAction<{ memberId: string; status: Status }>) => {
      const member = state.members.find(m => m.id === action.payload.memberId);
      if (member) {
        member.status = action.payload.status;
      }
    },

    /**
     * Assign a new task to a member
     * @param memberId - The ID of the member to assign the task to
     * @param task - The task data (without ID)
     */
    assignTask: (state, action: PayloadAction<{ memberId: string; task: Omit<Task, 'id'> }>) => {
      const member = state.members.find(m => m.id === action.payload.memberId);
      if (member) {
        const newTask: Task = {
          ...action.payload.task,
          id: `t${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        member.tasks.push(newTask);
      }
    },

    /**
     * Update task progress and auto-complete if reaches 100%
     * @param memberId - The member ID
     * @param taskId - The task ID
     * @param progress - The new progress value (0-100)
     */
    updateTaskProgress: (state, action: PayloadAction<{ memberId: string; taskId: string; progress: number }>) => {
      const member = state.members.find(m => m.id === action.payload.memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === action.payload.taskId);
        if (task) {
          // Clamp progress between 0 and 100
          task.progress = Math.max(0, Math.min(100, action.payload.progress));
          // Auto-complete when reaching 100%
          task.completed = task.progress >= 100;
        }
      }
    },

    /**
     * Mark a task as completed (or uncompleted)
     * @param memberId - The member ID
     * @param taskId - The task ID
     * @param completed - Whether the task is completed
     */
    toggleTaskCompletion: (state, action: PayloadAction<{ memberId: string; taskId: string; completed: boolean }>) => {
      const member = state.members.find(m => m.id === action.payload.memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === action.payload.taskId);
        if (task) {
          task.completed = action.payload.completed;
          // Set progress to 100 if marking as completed
          if (action.payload.completed && task.progress < 100) {
            task.progress = 100;
          }
        }
      }
    },

    /**
     * Delete a task from a member
     * @param memberId - The member ID
     * @param taskId - The task ID to delete
     */
    deleteTask: (state, action: PayloadAction<{ memberId: string; taskId: string }>) => {
      const member = state.members.find(m => m.id === action.payload.memberId);
      if (member) {
        member.tasks = member.tasks.filter(t => t.id !== action.payload.taskId);
      }
    },

    /**
     * Set the status filter for the member list
     * @param filter - The status to filter by, or 'All' for no filter
     */
    setStatusFilter: (state, action: PayloadAction<Status | 'All'>) => {
      state.statusFilter = action.payload;
    },

    /**
     * Set the sort preference for the member list
     * @param sortBy - Sort by 'name' or 'tasks' (active task count)
     */
    setSortBy: (state, action: PayloadAction<'name' | 'tasks'>) => {
      state.sortBy = action.payload;
    },

    /**
     * Add a new member to the team
     * @param member - The member data (without ID if auto-generated)
     */
    addMember: (state, action: PayloadAction<Omit<Member, 'id'> & { id?: string }>) => {
      const newMember: Member = {
        ...action.payload,
        id: action.payload.id || `m${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tasks: action.payload.tasks || [],
      };
      state.members.push(newMember);
    },

    /**
     * Remove a member from the team
     * @param memberId - The ID of the member to remove
     */
    removeMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(m => m.id !== action.payload);
    },

    /**
     * Set all members (useful for bulk updates or API sync)
     * @param members - Array of members
     */
    setMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },

    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Set error state
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /**
     * Clear all filters and sorting
     */
    clearFilters: (state) => {
      state.statusFilter = 'All';
      state.sortBy = 'name';
    },
  },
});

// Export all actions
export const {
  updateMemberStatus,
  assignTask,
  updateTaskProgress,
  toggleTaskCompletion,
  deleteTask,
  setStatusFilter,
  setSortBy,
  addMember,
  removeMember,
  setMembers,
  setLoading,
  setError,
  clearFilters,
} = membersSlice.actions;

// Export reducer as default
export default membersSlice.reducer;
