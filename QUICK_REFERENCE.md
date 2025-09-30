# Team Pulse Dashboard - Quick Reference Card

## 🚀 Essential Commands

```bash
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run linter
```

## 📦 Import Patterns

### Redux Hooks (Always use these!)
```typescript
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
```

### Common Selectors
```typescript
import {
  selectCurrentUser,
  selectIsLead,
  selectAllMembers,
  selectSortedMembers,
  selectCurrentMember,
  selectStatusCounts,
} from '@/redux/selectors';
```

### Actions - Role
```typescript
import {
  toggleRole,
  switchRole,
  setUser,
  setRoleAndUser,
} from '@/redux/slices/roleSlice';
```

### Actions - Members
```typescript
import {
  updateMemberStatus,
  assignTask,
  updateTaskProgress,
  setStatusFilter,
  setSortBy,
} from '@/redux/slices/membersSlice';
```

## 🎯 Common Code Patterns

### 1. Read State
```typescript
const Component = () => {
  const isLead = useAppSelector(selectIsLead);
  const members = useAppSelector(selectSortedMembers);
  const currentUser = useAppSelector(selectCurrentUser);
  
  return <div>{currentUser}</div>;
};
```

### 2. Dispatch Actions
```typescript
const Component = () => {
  const dispatch = useAppDispatch();
  
  const handleClick = () => {
    dispatch(toggleRole());
  };
  
  return <button onClick={handleClick}>Toggle</button>;
};
```

### 3. Update Member Status
```typescript
const handleStatusChange = (status: Status) => {
  dispatch(updateMemberStatus({
    memberId: currentMember.id,
    status
  }));
};
```

### 4. Assign Task
```typescript
const handleAssign = () => {
  dispatch(assignTask({
    memberId: selectedMember,
    task: {
      title: taskTitle,
      dueDate: dueDate,
      progress: 0,
      completed: false
    }
  }));
};
```

### 5. Update Progress
```typescript
const handleProgress = (taskId: string, delta: number) => {
  const newProgress = task.progress + delta;
  dispatch(updateTaskProgress({
    memberId: currentMember.id,
    taskId,
    progress: newProgress
  }));
};
```

## 🎨 Responsive Classes

```typescript
// Mobile-first approach
<div className="text-sm sm:text-base lg:text-lg">

// Spacing
<div className="p-3 sm:p-4 lg:p-6">

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Flex layouts
<div className="flex flex-col sm:flex-row">

// Hide on mobile
<p className="hidden sm:block">Desktop only</p>

// Show only on mobile
<p className="block sm:hidden">Mobile only</p>
```

## 🔍 Redux DevTools

### Shortcuts
- `Ctrl+H` - Toggle DevTools
- `Ctrl+Q` - Toggle position
- `Ctrl+M` - Toggle monitor

### Features
- View state tree
- Time-travel debugging
- Action history
- State diff
- Export/import state

## 🧪 Quick Tests

### Test 1: Role Toggle
```
1. Toggle role switch
2. View should change
✓ Redux state updated
```

### Test 2: Task Assignment
```
1. Lead role
2. Assign task to Sarah
3. Check Redux DevTools
✓ Sarah's tasks array updated
```

### Test 3: Status Sync
```
1. Member role - Set "Meeting"
2. Lead role - Check badge
✓ Badge shows "Meeting"
```

### Test 4: Persistence
```
1. Make changes
2. Refresh page
✓ Data persists
```

## 🎯 Tailwind Status Colors

```css
text-status-working   /* Green */
text-status-break     /* Yellow */
text-status-meeting   /* Blue */
text-status-offline   /* Gray */

bg-status-working/10  /* Light green bg */
```

## 📊 Data Types

### Member
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

### Task
```typescript
{
  id: string,
  title: string,
  dueDate: string,
  progress: number,     // 0-100
  completed: boolean
}
```

## 🔧 Troubleshooting

### Port in use
```bash
npm run dev -- --port 3000
```

### Clear cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear localStorage
```typescript
localStorage.removeItem('teamPulseState');
```

### Reset everything
```typescript
import { resetStore } from '@/redux/store';
resetStore(); // Clears localStorage + reloads
```

## 📁 File Locations

```
Components:      src/components/*.tsx
Redux:           src/redux/
  Hooks:         src/redux/hooks.ts
  Selectors:     src/redux/selectors.ts
  Store:         src/redux/store.ts
  Slices:        src/redux/slices/*.ts
Pages:           src/pages/*.tsx
Styles:          src/index.css
Config:          tailwind.config.ts, vite.config.ts
```

## 🎓 Learning Resources

- **Redux Toolkit**: https://redux-toolkit.js.org/
- **React Hooks**: https://react.dev/reference/react
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## 📞 Need Help?

1. Check README.md
2. See TESTING.md for test scenarios
3. Read REDUX_ARCHITECTURE.md for Redux details
4. Check INSTALLATION.md for setup issues

---

**Keep this reference handy while developing!** 📌
