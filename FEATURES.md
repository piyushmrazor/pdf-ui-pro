# Team Pulse Dashboard - Feature Documentation

Complete feature breakdown and technical details.

## 🎯 Core Features by Role

### 🔷 Global Features (Both Roles)

#### Header & Navigation
- **Logo Display**: Gradient-styled Team Pulse logo with icon
- **Current User Display**: Shows currently logged-in user with avatar icon
- **Role Toggle**: Switch between Team Lead and Team Member roles
  - Visual indicator showing active role
  - Smooth transition animation
  - Updates Redux state immediately
  - Persists to localStorage

#### Data Persistence
- **LocalStorage Integration**: All state saved automatically
  - Survives page refreshes
  - Survives browser restarts
  - Automatic serialization/deserialization
  - Error handling for storage quota

---

## 👔 Team Lead View

### 1. Status Summary Dashboard

**Summary Cards** (4 cards)
- 📊 Working Count
- 📊 Meeting Count  
- 📊 Break Count
- 📊 Offline Count

Each card displays:
- Icon representing the status
- Current count
- Color-coded based on status
- Real-time updates

**Technical Implementation**:
```typescript
// Computed from Redux state
const statusCounts = members.reduce((acc, member) => {
  acc[member.status] = (acc[member.status] || 0) + 1;
  return acc;
}, {});
```

### 2. Team Status Chart

**Pie Chart Visualization**
- Shows percentage distribution of team statuses
- Color-coded segments
- Interactive tooltips on hover
- Responsive legend
- Mobile-optimized labels

**Data Binding**:
- Automatically updates when member statuses change
- Uses Recharts library
- Themed colors match status badges

### 3. Task Assignment

**Task Creation Form**
- **Member Selector**: Dropdown list of all team members
- **Task Title**: Text input with validation
- **Due Date**: Date picker (prevents past dates)
- **Submit Button**: Assigns task and shows confirmation

**Validation Rules**:
- Member must be selected
- Task title cannot be empty
- Due date must be selected
- Due date cannot be in the past

**On Success**:
- Task added to member's task list
- Form clears automatically
- Toast notification shown
- Redux state updated
- Persisted to localStorage

### 4. Member Management

**Member List Display**
- Avatar (from DiceBear API)
- Full name
- Email address
- Current status badge
- Active task count
- Completed task count

**Filtering**:
- Filter by status (All, Working, Break, Meeting, Offline)
- Live filtering (no page reload)
- Shows "No members found" when filter returns empty

**Sorting**:
- Sort by Name (alphabetical A-Z)
- Sort by Active Tasks (descending, most tasks first)
- Live sorting (no page reload)
- Only counts non-completed tasks

**Grid Layout**:
- Desktop (>1280px): 3 columns
- Tablet (768-1279px): 2 columns  
- Mobile (<768px): 1 column

---

## 👤 Team Member View

### 1. Status Management

**Status Selector**
- 4 status buttons in 2x2 grid
- Current status highlighted
- One-click status updates
- Visual feedback (color, shadow)
- Icons for each status:
  - 🏃 Working (Activity icon)
  - ☕ On Break (Coffee icon)
  - 👥 In Meeting (Users icon)
  - 📴 Offline (WifiOff icon)

**Behavior**:
- Only one status active at a time
- Immediate Redux state update
- Reflected in Lead view instantly
- Updates summary counts
- Updates pie chart

### 2. Task Management

**Task List**
- Shows all tasks assigned to current user
- Separates active and completed tasks
- Each task displays:
  - Task title
  - Due date (formatted)
  - Progress bar (0-100%)
  - Current progress percentage
  - Progress control buttons

**Task Card Components**:
- **Progress Bar**: Visual representation (0-100%)
- **Minus Button**: Decrease progress by 10%
- **Plus Button**: Increase progress by 10%

**Progress Control Rules**:
- Minus button disabled when progress = 0%
- Plus button disabled when progress = 100%
- Progress clamped to 0-100 range
- Updates in 10% increments

**Auto-Completion Logic**:
```typescript
if (task.progress >= 100) {
  task.completed = true;
  // Show success toast
  // Move to completed section
}
```

**Completed Tasks Section**:
- Shows below active tasks
- Strike-through styling
- Checkmark icon
- Lighter background
- Read-only (no progress controls)

---

## 🎨 Design Features

### Responsive Breakpoints

```css
Mobile:  < 640px   (sm)
Tablet:  640-1024px (sm to lg)
Desktop: > 1024px   (lg+)
```

### Typography Scale

```css
Mobile:
- Headers: text-lg (18px)
- Body: text-sm (14px)
- Labels: text-xs (12px)

Desktop:
- Headers: text-xl to text-2xl (20-24px)
- Body: text-base (16px)
- Labels: text-sm (14px)
```

### Spacing System

```css
Mobile:
- Container padding: px-3 (12px)
- Card padding: p-4 (16px)
- Gap between elements: gap-2 (8px)

Desktop:
- Container padding: px-4 (16px)
- Card padding: p-6 (24px)
- Gap between elements: gap-4 (16px)
```

### Color System

**Status Colors**:
```css
--status-working: hsl(142, 76%, 36%)  /* Green */
--status-break: hsl(48, 96%, 53%)     /* Yellow */
--status-meeting: hsl(221, 83%, 53%)  /* Blue */
--status-offline: hsl(0, 0%, 60%)     /* Gray */
```

**Theme Colors**:
```css
--primary: hsl(245, 58%, 51%)         /* Purple-Blue */
--accent: hsl(280, 65%, 60%)          /* Purple */
--background: hsl(220, 25%, 97%)      /* Light Gray */
--foreground: hsl(220, 15%, 15%)      /* Dark Gray */
```

### Dark Mode

Full dark mode support via CSS variables:

```css
.dark {
  --background: hsl(220, 25%, 8%)
  --card: hsl(220, 20%, 12%)
  /* ... all other dark variants */
}
```

Activate by adding `class="dark"` to `<html>` element.

---

## 🔧 Technical Features

### Redux Toolkit Architecture

**Store Structure**:
```typescript
{
  role: {
    currentRole: 'lead' | 'member',
    currentUser: string
  },
  members: {
    members: Member[],
    statusFilter: Status | 'All',
    sortBy: 'name' | 'tasks'
  }
}
```

**Key Reducers**:

**roleSlice**:
- `switchRole(role)` - Change current role
- `setUser(userName)` - Change current user

**membersSlice**:
- `updateMemberStatus({ memberId, status })` - Update status
- `assignTask({ memberId, task })` - Assign new task
- `updateTaskProgress({ memberId, taskId, progress })` - Update task
- `setStatusFilter(status)` - Set filter
- `setSortBy(sortType)` - Set sort preference

### Component Hierarchy

```
App
├── Provider (Redux)
├── QueryClientProvider
├── TooltipProvider
└── BrowserRouter
    └── Routes
        ├── Index (/)
        │   ├── Header
        │   └── [TeamLeadView | TeamMemberView]
        │       ├── TeamLeadView
        │       │   ├── Summary Cards (x4)
        │       │   ├── TeamStatusChart
        │       │   ├── TaskForm
        │       │   └── MemberCard (mapped)
        │       └── TeamMemberView
        │           ├── StatusSelector
        │           └── TaskList
        └── NotFound (*)
```

### Performance Optimizations

1. **Memoization**: Use of React.memo for expensive components
2. **Selector Optimization**: Redux selectors avoid unnecessary re-renders
3. **Code Splitting**: Routes lazy-loaded (future enhancement)
4. **Bundle Size**: Tree-shaking enabled
5. **LocalStorage**: Debounced writes (via Redux subscription)

### Accessibility Features

- Semantic HTML5 elements
- ARIA labels on all interactive controls
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Alt text on images
- Proper heading hierarchy

---

## 📊 Data Flow

### Task Assignment Flow

```
Lead View (TaskForm)
  ↓
  User fills form and submits
  ↓
  Validation checks
  ↓
  dispatch(assignTask({ memberId, task }))
  ↓
  Redux Reducer updates member.tasks[]
  ↓
  State saved to localStorage
  ↓
  UI re-renders
  ↓
  Toast notification shown
  ↓
  Form resets
```

### Status Update Flow

```
Member View (StatusSelector)
  ↓
  User clicks status button
  ↓
  dispatch(updateMemberStatus({ memberId, status }))
  ↓
  Redux Reducer updates member.status
  ↓
  State saved to localStorage
  ↓
  UI re-renders globally
  ↓
  Lead View:
    - Member card badge updates
    - Summary cards recount
    - Pie chart re-renders
```

### Progress Update Flow

```
Member View (TaskList)
  ↓
  User clicks +/- progress button
  ↓
  Calculate new progress
  ↓
  dispatch(updateTaskProgress({ memberId, taskId, progress }))
  ↓
  Redux Reducer:
    - Updates task.progress
    - Sets task.completed = true if progress >= 100
  ↓
  State saved to localStorage
  ↓
  UI re-renders
  ↓
  If completed:
    - Task moves to completed section
    - Toast notification shown
    - Lead view active count decreases
```

---

## 🎁 Bonus Features Implemented

### ✅ Implemented

1. **Chart Visualization** (Recharts)
   - Pie chart for status distribution
   - Interactive tooltips
   - Responsive sizing
   - Themed colors

2. **LocalStorage Persistence**
   - Automatic state saving
   - State restoration on load
   - Error handling
   - Namespaced keys

3. **Dark Mode Support** (CSS ready)
   - Full theme variables
   - Light and dark color schemes
   - Toggle UI not yet implemented

4. **Toast Notifications**
   - Task assignment confirmations
   - Task completion celebrations
   - Error messages
   - Customizable positioning

5. **TypeScript**
   - Full type coverage
   - Type-safe Redux
   - Interface definitions
   - Compile-time error catching

6. **Accessible UI**
   - ARIA labels
   - Keyboard navigation
   - Focus management
   - Screen reader support

### ⬜ Not Yet Implemented

1. **Auto-Reset Timer**
   - Status auto-reset after 10 minutes
   - Requires setTimeout implementation
   - Consider visibility API

2. **Dark Mode Toggle**
   - UI control to switch themes
   - Persist preference
   - System preference detection

---

## 🔄 Future Enhancements

### High Priority
- Unit tests (Jest + React Testing Library)
- E2E tests (Playwright or Cypress)
- Dark mode toggle UI
- Auto-reset timer implementation

### Medium Priority
- Task editing
- Task deletion
- Member add/remove
- Advanced analytics
- Notification system
- Search functionality

### Low Priority
- PWA support
- Offline mode
- Export functionality
- Time tracking
- Multi-language support
- Advanced permissions

---

## 📈 Metrics & Analytics

### Bundle Size (Estimated)
- Main bundle: ~150KB (gzipped)
- Vendor bundle: ~300KB (gzipped)
- Total: ~450KB (gzipped)

### Performance Targets
- Initial load: < 2 seconds
- Time to Interactive: < 3 seconds
- First Contentful Paint: < 1.5 seconds
- Lighthouse Score: > 90

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile 90+

---

**For detailed testing procedures, see [TESTING.md](./TESTING.md)**

**For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

**For contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)**
