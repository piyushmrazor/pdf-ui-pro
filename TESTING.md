# Team Pulse Dashboard - Testing Guide

This document provides comprehensive manual testing scenarios to verify all features of the Team Pulse Dashboard.

## 🧪 Test Environment Setup

1. Open the application in your browser: http://localhost:5173 (dev) or the deployed URL
2. Open browser DevTools (F12) to:
   - Monitor Redux state changes (Redux DevTools Extension recommended)
   - Check localStorage persistence
   - Verify responsive behavior at different viewport sizes

## 📋 Test Scenarios

### Test 1: Role Switching & UI Updates

**Objective**: Verify role toggle properly updates Redux state and changes the view

**Steps**:
1. Load the application (default state: Member role, John Doe as current user)
2. Observe the header: Should show "John Doe" and "Member" highlighted
3. Observe the main view: Should show "Update Your Status" and "Your Tasks" cards
4. Click the role toggle switch in the header
5. Observe the switch animation and "Lead" label becomes highlighted
6. Observe the main view: Should now show "Team Status Overview", "Assign New Task", and "Team Members" sections

**Expected Results**:
- ✅ Role toggle switch works smoothly
- ✅ View changes from Member to Lead dashboard
- ✅ Redux state `role.currentRole` changes from 'member' to 'lead'
- ✅ No console errors
- ✅ Smooth transition between views

---

### Test 2: Task Assignment (Lead → Member)

**Objective**: Verify task assignment flow from Lead view to Member's task list

**Prerequisites**: Role = Lead

**Steps**:
1. In "Assign New Task" card, click "Team Member" dropdown
2. Select "Sarah Smith" from the list
3. Enter task title: "Complete project documentation"
4. Select due date: 7 days from today
5. Click "Assign Task" button
6. Observe toast notification appears
7. Toggle role to "Member"
8. Note: To see Sarah's tasks, you'd need to update currentUser to "Sarah Smith"
   - For this test, observe in Redux DevTools that Sarah's tasks array has increased
9. Switch back to Lead view
10. Find Sarah Smith's member card
11. Verify "Active" count increased

**Expected Results**:
- ✅ Form validates all fields are filled
- ✅ Toast notification: "Task assigned to Sarah Smith"
- ✅ Form clears after submission
- ✅ Redux state updated: Sarah's tasks array contains new task
- ✅ Task has unique ID, progress=0, completed=false
- ✅ Member card shows updated active task count

**Edge Cases to Test**:
- Try submitting form with empty title → Should show error toast
- Try submitting without selecting a member → Should show error toast
- Try submitting without due date → Should show error toast

---

### Test 3: Status Updates & Global Synchronization

**Objective**: Verify status changes reflect globally across views

**Prerequisites**: Role = Member, Current User = John Doe

**Steps**:
1. In "Update Your Status" section, observe current status (default: Working)
2. Click "On Break" button
3. Observe button becomes highlighted/active
4. Toggle to Lead role
5. Find John Doe's member card
6. Observe status badge shows "Break" (yellow)
7. Observe summary cards: "On Break" count increased, "Working" count decreased
8. Observe pie chart updated proportions

**Expected Results**:
- ✅ Status button provides visual feedback when clicked
- ✅ Redux state `members[0].status` updated to 'Break'
- ✅ Lead view reflects change immediately
- ✅ Summary counts update correctly
- ✅ Pie chart re-renders with new data
- ✅ Status badge color matches the status (yellow for Break)

**Repeat for all statuses**:
- Working (green)
- Meeting (blue)
- Offline (gray)

---

### Test 4: Task Progress & Auto-Completion

**Objective**: Verify task progress updates and automatic completion at 100%

**Prerequisites**: Role = Member, Current User = John Doe

**Steps**:
1. Locate task "Review code PR #234" (initial progress: 60%)
2. Observe progress bar shows 60%
3. Click the minus button (-)
4. Observe progress decreases to 50%
5. Click the "+Update Progress" button
6. Observe progress increases to 60%
7. Continue clicking "+Update Progress" until progress reaches 100%
   - Click 4 more times (70%, 80%, 90%, 100%)
8. At 100%, observe:
   - Toast notification: "Task completed! 🎉"
   - Task moves from active to completed section
   - Task appears with strike-through styling
   - Checkmark icon appears
9. Toggle to Lead role
10. Find John Doe's member card
11. Verify "Active" count decreased by 1, "Done" count increased by 1

**Expected Results**:
- ✅ Progress bar updates smoothly
- ✅ Percentage text updates
- ✅ Minus button disabled at 0%
- ✅ Plus button disabled at 100%
- ✅ Auto-completion triggers at progress=100
- ✅ Task moves to completed section
- ✅ Visual distinction for completed tasks
- ✅ Active task count updates in Lead view

---

### Test 5: Member Filtering

**Objective**: Verify status filter functionality in Lead view

**Prerequisites**: Role = Lead

**Steps**:
1. Observe "Team Members" section showing all 5 members
2. Click "Filter by status" dropdown
3. Select "Working"
4. Observe only members with Working status displayed (John Doe, Emily Davis)
5. Member count should be 2
6. Select filter "Meeting"
7. Observe only Sarah Smith displayed
8. Select filter "Break"
9. Observe only Mike Johnson displayed
10. Select filter "Offline"
11. Observe only Alex Brown displayed
12. Select filter "All"
13. Observe all 5 members displayed again

**Expected Results**:
- ✅ Filter dropdown works correctly
- ✅ Members filtered based on current status
- ✅ Redux state `members.statusFilter` updates
- ✅ No members case shows empty state message
- ✅ Filter persists when switching roles and back

---

### Test 6: Member Sorting

**Objective**: Verify sorting functionality in Lead view

**Prerequisites**: Role = Lead, Filter = "All"

**Steps**:
1. Observe "Sort by" dropdown default value
2. Observe current member order
3. Select "Sort by: Name"
4. Observe members reordered alphabetically:
   - Alex Brown, Emily Davis, John Doe, Mike Johnson, Sarah Smith
5. Select "Sort by: Active Tasks"
6. Observe members reordered by number of active tasks (descending):
   - Members with most incomplete tasks appear first
   - Expected order: John Doe (2 active) → Emily Davis (1 active) → Sarah Smith (1 active) → others (0 active)

**Expected Results**:
- ✅ Sort dropdown updates correctly
- ✅ Redux state `members.sortBy` updates
- ✅ Members visually reorder
- ✅ Sorting considers only non-completed tasks
- ✅ Sort preference persists across role switches

---

### Test 7: LocalStorage Persistence

**Objective**: Verify state persists across page reloads

**Prerequisites**: Any role

**Steps**:
1. Make several changes:
   - Assign a new task to any member
   - Update a member's status
   - Change filter to "Working"
   - Change sort to "Active Tasks"
2. Open browser DevTools → Application → Local Storage
3. Verify `teamPulseState` entry exists
4. Click browser refresh (F5 or Cmd+R)
5. Wait for page to reload
6. Verify all changes persist:
   - Task still assigned
   - Status still updated
   - Filter still set to "Working"
   - Sort still set to "Active Tasks"

**Expected Results**:
- ✅ Redux state saved to localStorage on every change
- ✅ State restored from localStorage on page load
- ✅ No data loss on refresh
- ✅ localStorage keys properly namespaced

---

### Test 8: Responsive Design (Mobile)

**Objective**: Verify responsive behavior on mobile devices

**Steps**:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Select "iPhone 12 Pro" or similar mobile device
4. Verify Header:
   - Logo and title scale down
   - User info and role toggle wrap properly
   - No horizontal overflow
5. Role = Lead:
   - Summary cards display in 2-column grid
   - Chart and task form stack vertically
   - Member cards display in single column
   - Filter/sort dropdowns stack vertically
6. Role = Member:
   - Status selector shows 2x2 grid
   - Task cards display full width
   - Progress buttons are touch-friendly

**Expected Results**:
- ✅ No horizontal scrolling
- ✅ All text remains readable
- ✅ Buttons are touch-friendly (min 44px height)
- ✅ Proper spacing and padding
- ✅ Charts render correctly
- ✅ Dropdowns work on touch devices

---

### Test 9: Responsive Design (Tablet)

**Objective**: Verify responsive behavior on tablets

**Steps**:
1. Set viewport to 768px width (iPad portrait)
2. Role = Lead:
   - Summary cards: 2x2 grid
   - Chart and task form: side by side
   - Member cards: 2 columns
3. Set viewport to 1024px width (iPad landscape)
4. Role = Lead:
   - Summary cards: 4 columns
   - Member cards: 2 or 3 columns

**Expected Results**:
- ✅ Layout adapts to tablet breakpoints
- ✅ Good use of available space
- ✅ Readable typography
- ✅ Touch-friendly controls

---

### Test 10: Redux Toolkit Compliance

**Objective**: Verify proper Redux Toolkit usage

**Tools**: Redux DevTools Extension

**Steps**:
1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. Perform actions and observe:
   - `role/switchRole` when toggling role
   - `members/updateMemberStatus` when changing status
   - `members/assignTask` when assigning a task
   - `members/updateTaskProgress` when updating progress
   - `members/setStatusFilter` when filtering
   - `members/setSortBy` when sorting
4. Inspect state tree structure
5. Use "Jump" feature to time-travel through state changes

**Expected Results**:
- ✅ All actions dispatched through Redux
- ✅ Action names follow Redux Toolkit conventions
- ✅ State shape matches defined types
- ✅ No direct state mutations (Immer handles immutability)
- ✅ State changes are predictable and traceable

---

### Test 11: Accessibility (a11y)

**Objective**: Verify keyboard navigation and screen reader support

**Steps**:
1. Tab through all interactive elements
2. Verify focus indicators are visible
3. Test keyboard shortcuts:
   - Enter/Space on status buttons
   - Tab navigation through form fields
   - Arrow keys in dropdowns
4. Test with screen reader (VoiceOver, NVDA, or JAWS):
   - Status buttons announce pressed state
   - Task progress controls have labels
   - Form inputs have associated labels

**Expected Results**:
- ✅ All interactive elements keyboard accessible
- ✅ Visible focus indicators
- ✅ ARIA labels on controls
- ✅ Semantic HTML structure
- ✅ Screen reader friendly

---

### Test 12: Empty States

**Objective**: Verify proper handling of empty states

**Steps**:
1. Role = Member
2. Set current user to "Mike Johnson" or "Alex Brown" (users with no tasks)
3. Verify empty state message: "No tasks assigned yet"
4. Role = Lead
5. Filter by a status no one has (if possible)
6. Verify empty state: "No members found with the selected filter"

**Expected Results**:
- ✅ Graceful empty state messages
- ✅ Helpful icons in empty states
- ✅ No layout breaks
- ✅ Clear user guidance

---

### Test 13: Data Validation

**Objective**: Verify form validation and error handling

**Prerequisites**: Role = Lead

**Steps**:
1. In "Assign New Task" form:
2. Click "Assign Task" without filling any fields
3. Observe error toast: "Please fill in all fields"
4. Fill only member name, leave task title empty
5. Click "Assign Task"
6. Observe same error toast
7. Fill member and title, leave due date empty
8. Click "Assign Task"
9. Observe error toast
10. Fill all fields correctly
11. Click "Assign Task"
12. Observe success toast

**Expected Results**:
- ✅ Form validation prevents invalid submissions
- ✅ Clear error messages
- ✅ No task created with invalid data
- ✅ Success feedback on valid submission

---

### Test 14: Multiple Users Simulation

**Objective**: Simulate multiple team members using the app

**Steps**:
1. Role = Member, User = John Doe
2. Update status to "Meeting"
3. Update task progress to 80%
4. Switch current user to "Emily Davis" (via Redux or console)
5. Update her status to "Break"
6. Update her task progress
7. Toggle to Lead role
8. Verify all changes reflected correctly
9. Verify summary cards accurate
10. Verify pie chart accurate

**Expected Results**:
- ✅ Each member's data isolated
- ✅ Status changes don't affect other members
- ✅ Task progress updates correctly per member
- ✅ Global view (Lead) aggregates all data correctly

---

## 🎯 Acceptance Criteria Verification

Use this checklist for final verification:

### Mandatory Features

- [ ] Role toggle updates `role.currentRole` in Redux
- [ ] Role toggle updates `role.currentUser` in Redux
- [ ] Lead view shows all team members
- [ ] Lead view shows status summary cards with correct counts
- [ ] Lead view allows task assignment
- [ ] Lead view allows filtering members by status
- [ ] Lead view allows sorting members by name or active tasks
- [ ] Member view allows status updates
- [ ] Member view shows assigned tasks
- [ ] Member view allows progress updates (+10%/-10%)
- [ ] Tasks auto-complete when progress reaches 100%
- [ ] Redux Toolkit used for all global state
- [ ] No component-level state for persisted data
- [ ] App is responsive (mobile, tablet, desktop)
- [ ] LocalStorage persistence works

### Bonus Features

- [ ] Pie chart visualization (Recharts)
- [ ] Toast notifications for user actions
- [ ] Dark mode theming (CSS variables ready)
- [ ] Accessible UI (ARIA labels, keyboard navigation)
- [ ] TypeScript for type safety
- [ ] Loading states and error handling

---

## 🐛 Bug Reporting Template

If you find a bug during testing, report it using this template:

```
**Bug Title**: [Short description]

**Severity**: Critical / High / Medium / Low

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happened]

**Screenshots/Videos**:
[If applicable]

**Environment**:
- Browser: 
- Viewport size: 
- Role: 
- Current User: 

**Redux State** (from DevTools):
```json
[Paste relevant state]
```

**Console Errors**:
```
[Paste any console errors]
```
```

---

## 🚀 Performance Testing

### Load Time Test

1. Open Network tab in DevTools
2. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
3. Verify:
   - Initial page load < 2 seconds
   - No unnecessary network requests
   - Assets properly cached

### Interaction Performance

1. Rapidly toggle between roles (10 times)
2. Assign 10 tasks quickly
3. Update progress on multiple tasks
4. Verify no lag or freezing

**Expected Results**:
- ✅ Smooth animations
- ✅ No UI freezing
- ✅ Quick Redux state updates
- ✅ Efficient re-renders

---

## 📱 Cross-Browser Testing

Test on the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

Verify:
- Layout consistency
- Functionality parity
- No browser-specific bugs

---

## ✅ Final Acceptance Checklist

Before marking the project as complete:

- [ ] All Test Scenarios (1-14) passed
- [ ] All Mandatory Features checked
- [ ] Responsive on mobile, tablet, desktop
- [ ] LocalStorage persistence working
- [ ] No console errors or warnings
- [ ] Redux DevTools shows proper action flow
- [ ] Accessibility tested (keyboard navigation)
- [ ] README is complete and accurate
- [ ] Code is clean and well-commented
- [ ] Ready for deployment

---

**Happy Testing! 🎉**
