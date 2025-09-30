# Installation Guide - Team Pulse Dashboard

Complete installation instructions for developers, QA testers, and reviewers.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** version 18 or higher
- ✅ **npm** version 8 or higher (comes with Node.js)
- ✅ **Git** (for cloning repository)
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)
- ✅ Code editor (VS Code recommended)

### Check Your Environment

```bash
# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check npm version  
npm --version
# Should output: 8.x.x or higher

# Check Git
git --version
# Should output: git version 2.x.x or higher
```

### Install Node.js (if needed)

**Option 1: Using nvm (Recommended)**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js LTS
nvm install --lts

# Use Node.js LTS
nvm use --lts
```

**Option 2: Direct Download**

Visit https://nodejs.org/ and download the LTS version.

---

## 📥 Installation Methods

### Method 1: Quick Install (Existing Project)

```bash
# Navigate to project directory
cd pdf-ui-pro

# Install all dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

**Done!** ✅

---

### Method 2: Clone from Git

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd team-pulse-dashboard

# Install dependencies
npm install

# Start development
npm run dev
```

---

### Method 3: Automated Setup

```bash
# Navigate to project
cd pdf-ui-pro

# Run setup script
chmod +x SETUP.sh
./SETUP.sh

# Script will:
# - Check Node.js/npm
# - Install dependencies
# - Verify packages
# - Create .env file
# - Run linter
# - Test build
```

---

## 🔍 Verify Installation

### Step 1: Check Dependencies

```bash
# List all installed packages
npm list --depth=0

# Should see:
# ├── @reduxjs/toolkit@2.2.1
# ├── react@18.3.1
# ├── react-redux@9.1.0
# ├── tailwindcss@3.4.17
# ├── vite@5.4.19
# └── ... many more
```

### Step 2: Run Development Server

```bash
npm run dev
```

**Expected output**:
```
VITE v5.4.19  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Step 3: Open in Browser

1. Navigate to http://localhost:5173
2. You should see the Team Pulse Dashboard
3. Default view: Team Member (John Doe)
4. No errors in browser console

### Step 4: Test Basic Functionality

**Quick Smoke Test** (1 minute):

1. ✅ Toggle to Lead role → View changes
2. ✅ Toggle back to Member → View changes
3. ✅ Click a status button → Button highlights
4. ✅ No console errors

If all tests pass: **Installation Successful!** 🎉

---

## 🔧 Development Tools Setup (Optional)

### VS Code Extensions

Recommended extensions for better DX:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Redux DevTools

Install browser extension:
- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

### React Developer Tools

Install browser extension:
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

## 📦 Package Management

### Using npm

```bash
# Install dependencies
npm install

# Add new dependency
npm install package-name

# Remove dependency
npm uninstall package-name

# Update dependencies
npm update

# Audit security
npm audit
npm audit fix
```

### Using yarn (Alternative)

```bash
# Install yarn globally
npm install -g yarn

# Install dependencies
yarn install

# Add dependency
yarn add package-name

# Remove dependency
yarn remove package-name

# Update dependencies
yarn upgrade
```

---

## 🐛 Troubleshooting Installation

### Issue: "EACCES: permission denied"

**Solution**: Don't use sudo with npm

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Issue: "Module not found"

**Solution**: Reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 5173 already in use"

**Solution 1**: Kill existing process

```bash
# On macOS/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Solution 2**: Use different port

```bash
npm run dev -- --port 3000
```

### Issue: Build fails with TypeScript errors

**Solution**: Check TypeScript version

```bash
npm install typescript@latest --save-dev
npx tsc --noEmit
```

### Issue: Slow installation

**Solution**: Use faster registry

```bash
# Use different npm registry
npm install --registry=https://registry.npmjs.org/

# Or clear cache
npm cache clean --force
npm install
```

### Issue: "Cannot find module '@/components/...'"

**Solution**: Path alias issue - check `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Also check `vite.config.ts`:

```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
}
```

---

## 🔄 Update Project

### Get Latest Changes

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Restart dev server
npm run dev
```

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all to latest (within semver range)
npm update

# Update specific package
npm install package-name@latest

# Update to latest breaking versions (careful!)
npx npm-check-updates -u
npm install
```

---

## 🎯 Installation Checklist

Before considering installation complete:

- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Project cloned/downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] No installation errors
- [ ] Dev server starts (`npm run dev`)
- [ ] App opens in browser (http://localhost:5173)
- [ ] No console errors in browser
- [ ] Redux DevTools connected (if extension installed)
- [ ] Can toggle between roles
- [ ] Can assign tasks (Lead role)
- [ ] Can update status (Member role)
- [ ] LocalStorage working (data persists on refresh)
- [ ] Production build works (`npm run build`)
- [ ] Linter passes (`npm run lint`)

---

## 📞 Getting Help

### Installation Issues

1. **Check Prerequisites**: Ensure Node.js and npm are installed
2. **Clear Cache**: Run `npm cache clean --force`
3. **Reinstall**: Delete node_modules and reinstall
4. **Check Logs**: Read error messages carefully
5. **Search Issues**: Check GitHub issues for similar problems

### Resources

- **Node.js Documentation**: https://nodejs.org/docs/
- **npm Documentation**: https://docs.npmjs.com/
- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/

---

## ⚡ Quick Commands Reference

```bash
# Installation
npm install                 # Install all dependencies
npm install --legacy-peer-deps  # If peer dependency issues

# Development
npm start                   # Start dev server
npm run dev                 # Start dev server (same as start)
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run linter

# Troubleshooting
npm cache clean --force    # Clear npm cache
npm ci                     # Clean install from lockfile
npm audit                  # Check for vulnerabilities
npm audit fix              # Fix vulnerabilities

# Package Management
npm install package-name   # Add package
npm uninstall package-name # Remove package
npm update                 # Update packages
npm outdated              # Check outdated packages
```

---

## ✅ Post-Installation Next Steps

1. **Read the Documentation**:
   - [QUICKSTART.md](./QUICKSTART.md) - 5-minute tour
   - [FEATURES.md](./FEATURES.md) - Feature details
   - [TESTING.md](./TESTING.md) - Test the app

2. **Explore the Code**:
   - Start with `src/App.tsx`
   - Check Redux slices in `src/redux/slices/`
   - Review components in `src/components/`

3. **Customize**:
   - Update team members
   - Customize colors
   - Add your own features

4. **Deploy**:
   - Build for production
   - Deploy to hosting platform
   - Share your demo!

---

**Installation Complete! You're ready to build! 🚀**
