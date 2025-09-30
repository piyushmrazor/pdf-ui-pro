# Quick Start Guide - Team Pulse Dashboard

Get up and running in 5 minutes! ⚡

## 🚀 Installation (2 minutes)

```bash
# Navigate to project
cd pdf-ui-pro

# Install dependencies (this may take 1-2 minutes)
npm install

# Or use yarn
yarn install
```

## ▶️ Start Development Server (30 seconds)

```bash
# Start the dev server
npm run dev

# Or use the start alias
npm start
```

Open http://localhost:5173 in your browser.

## 🎮 Quick Feature Tour (2 minutes)

### 1. Explore Member View (30 seconds)

**You'll see**:
- Update Your Status (4 button grid)
- Your Tasks (if any assigned to John Doe)

**Try this**:
- Click "On Break" → Button highlights
- Click "In Meeting" → Button highlights  
- If you have tasks, click "+Update Progress"

### 2. Explore Lead View (1 minute)

**Switch to Lead**:
- Click the toggle switch in top-right header
- "Lead" label should highlight

**You'll see**:
- 4 summary cards (Working, Meeting, Break, Offline counts)
- Pie chart showing team distribution
- Assign New Task form
- Team Members grid

**Try this**:
1. **Assign a task**:
   - Select "Sarah Smith"
   - Enter title: "Test Task"
   - Pick tomorrow's date
   - Click "Assign Task"
   - ✅ Toast: "Task assigned to Sarah Smith"

2. **Filter members**:
   - Click "Filter by status" dropdown
   - Select "Working"
   - See only Working members

3. **Sort members**:
   - Click "Sort by" dropdown
   - Select "Active Tasks"
   - Members reorder by task count

### 3. Test Status Sync (30 seconds)

1. Switch to Member role
2. Click any status button
3. Switch back to Lead role
4. Find your member card (John Doe)
5. ✅ Status badge updated!
6. ✅ Summary card count changed!
7. ✅ Pie chart updated!

### 4. Test Persistence (30 seconds)

1. Make any changes (assign task, change status)
2. Refresh the page (F5)
3. ✅ All changes persisted!

## 📱 Test Responsiveness (30 seconds)

```bash
# Open DevTools
F12 (Windows/Linux) or Cmd+Option+I (Mac)

# Toggle device toolbar
Ctrl+Shift+M (Windows/Linux) or Cmd+Shift+M (Mac)

# Select iPhone or iPad
# Verify layout adapts correctly
```

## 🎯 Common Tasks

### Build for Production

```bash
npm run build
# Output in dist/ folder
```

### Preview Production Build

```bash
npm run preview
# Opens at http://localhost:4173
```

### Run Linter

```bash
npm run lint
```

## 🔧 Customize Initial Data

Edit `/src/redux/slices/membersSlice.ts`:

```typescript
const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Your Name',
    email: 'your.email@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YourName',
    status: 'Working',
    tasks: []
  },
  // Add more members...
];
```

## 🎨 Customize Theme

Edit `/src/index.css`:

```css
:root {
  --primary: 245 58% 51%;        /* Change primary color */
  --status-working: 142 76% 36%; /* Change status colors */
  /* ... more customization */
}
```

## 🐛 Troubleshooting

### Port already in use?

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Dependencies not installing?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build failing?

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for missing dependencies
npm install
```

## 📚 Next Steps

- 📖 Read full [README.md](./README.md)
- 🧪 Review [TESTING.md](./TESTING.md) for test scenarios
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options
- 🤝 Check [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute
- ✨ Explore [FEATURES.md](./FEATURES.md) for detailed features

## 🎉 You're Ready!

Start building amazing team productivity features! 

**Happy coding! 💻**
