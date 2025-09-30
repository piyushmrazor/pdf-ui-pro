# Contributing to Team Pulse Dashboard

Thank you for your interest in contributing to Team Pulse Dashboard! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

1. **Clear title** describing the bug
2. **Steps to reproduce** the issue
3. **Expected behavior** vs **actual behavior**
4. **Screenshots** or videos (if applicable)
5. **Environment details**:
   - Browser and version
   - Operating system
   - Screen size/viewport
   - Role and current user when bug occurred

### Suggesting Features

Feature requests are welcome! Please provide:

1. **Use case**: Why is this feature needed?
2. **Proposed solution**: How should it work?
3. **Alternatives considered**: Other approaches you've thought about
4. **Additional context**: Mockups, examples, etc.

## 💻 Development Setup

### Prerequisites

- Node.js 18+ (use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn
- Git

### Initial Setup

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/team-pulse-dashboard.git
cd team-pulse-dashboard

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/team-pulse-dashboard.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update types if modifying data structures

3. **Test your changes**:
   - Test in multiple browsers
   - Test on mobile/tablet/desktop viewports
   - Verify Redux state updates correctly
   - Check for console errors
   - Run linter: `npm run lint`

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**:
   - Go to GitHub
   - Click "Compare & pull request"
   - Fill in the PR template
   - Link related issues

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type
- Use type inference where reasonable

```typescript
// Good
interface User {
  id: string;
  name: string;
}

const user: User = { id: '1', name: 'John' };

// Avoid
const user: any = { id: '1', name: 'John' };
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use proper prop types

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
};
```

### Redux

- Use Redux Toolkit exclusively
- Follow slice naming conventions
- Keep reducers pure
- Use payload creators for complex actions

```typescript
// Good
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});
```

### CSS/Tailwind

- Use Tailwind utilities first
- Keep custom CSS minimal
- Use CSS variables for theming
- Follow mobile-first approach

```tsx
// Good - Mobile first
<div className="text-sm sm:text-base lg:text-lg">

// Avoid - Desktop first
<div className="text-lg md:text-base sm:text-sm">
```

## 🏗️ Project Structure

When adding new features, follow the existing structure:

```
/src
  /components       - Reusable UI components
    /ui             - shadcn/ui components (don't modify)
  /redux
    /slices         - Redux Toolkit slices
  /pages            - Page-level components
  /hooks            - Custom React hooks
  /lib              - Utility functions
```

### Adding New Components

1. Create component in `/src/components/YourComponent.tsx`
2. Export from the file
3. Import and use in parent components
4. Add to storybook (if applicable)

### Adding Redux State

1. Create new slice in `/src/redux/slices/yourSlice.ts`
2. Define types and initial state
3. Create reducers
4. Export actions
5. Add to store in `/src/redux/store.ts`

## 🧪 Testing Guidelines

### Manual Testing

Before submitting PR:

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile viewport (DevTools)
- [ ] Test all user flows affected
- [ ] Test edge cases
- [ ] Verify Redux state updates
- [ ] Check for console errors
- [ ] Test localStorage persistence

### Writing Tests (Future)

When tests are added:

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🎨 UI/UX Guidelines

- **Consistency**: Match existing design patterns
- **Accessibility**: Include ARIA labels, keyboard navigation
- **Responsive**: Test on mobile, tablet, desktop
- **Performance**: Avoid unnecessary re-renders
- **Feedback**: Provide loading states, error messages, success confirmations

## 📚 Documentation

When adding features:

- Update README.md if user-facing
- Add JSDoc comments for complex functions
- Update TESTING.md with new test scenarios
- Include usage examples

## 🔍 Code Review Process

All PRs will be reviewed for:

1. **Functionality**: Does it work as intended?
2. **Code Quality**: Is it clean and maintainable?
3. **Performance**: Any performance implications?
4. **Accessibility**: Is it accessible?
5. **Responsiveness**: Works on all screen sizes?
6. **Tests**: Are appropriate tests included?
7. **Documentation**: Is documentation updated?

## 🚫 What to Avoid

- Large PRs (keep them focused and small)
- Mixing multiple concerns in one PR
- Breaking changes without discussion
- Modifying core dependencies without reason
- Removing existing features without discussion
- Direct state mutations in Redux
- Hardcoded values (use constants)
- Ignoring TypeScript errors

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console warnings/errors
- [ ] Tested on multiple browsers
- [ ] Tested on mobile/tablet/desktop
- [ ] Redux state tested
- [ ] localStorage tested (if applicable)
- [ ] Linter passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

## 🎯 Priority Areas for Contribution

Current priority areas:

1. **Unit Tests**: Add Jest/Vitest tests for Redux slices
2. **Component Tests**: Add React Testing Library tests
3. **E2E Tests**: Add Playwright/Cypress tests
4. **Dark Mode Toggle**: Add UI control for theme switching
5. **Auto-Reset Timer**: Implement status auto-reset after inactivity
6. **Member Management**: Add/remove members dynamically
7. **Task Editing**: Edit task details after creation
8. **Notifications**: Browser notifications for task assignments
9. **Analytics**: Additional charts and insights
10. **Export**: Export data as CSV/PDF

## 💡 Questions?

- Open a discussion on GitHub
- Reach out to maintainers
- Check existing issues/PRs

---

**Thank you for contributing! 🙌**
