# Deployment Guide - Team Pulse Dashboard

This guide provides step-by-step instructions for deploying the Team Pulse Dashboard to various platforms.

## 🚀 Quick Deployment

The app is currently deployed on **Lovable** platform:

**Live Demo**: https://lovable.dev/projects/850bfe48-d275-4744-96fb-95ec206aec87

## 📦 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass (`npm run lint`)
- [ ] Production build works (`npm run build`)
- [ ] No console errors in production build
- [ ] Environment variables configured (if any)
- [ ] README.md is up to date
- [ ] Package.json has correct project name and version

## 🌐 Platform-Specific Deployment

### Option 1: Vercel (Recommended)

**Prerequisites**: Vercel account and Vercel CLI

**Method 1: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? team-pulse-dashboard
# - Directory? ./
# - Override settings? No
```

**Method 2: Using Vercel Dashboard**

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click "Deploy"

**Vercel Configuration** (optional):

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Option 2: Netlify

**Prerequisites**: Netlify account and Netlify CLI

**Method 1: Using Netlify CLI**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod --dir=dist

# Or use the deploy command with build
netlify deploy --prod --build
```

**Method 2: Using Netlify Dashboard**

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)
5. Click "Deploy site"

**Netlify Configuration**:

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### Option 3: GitHub Pages

**Prerequisites**: GitHub repository

**Steps**:

1. Install `gh-pages` package:

```bash
npm install --save-dev gh-pages
```

2. Update `package.json` scripts:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/team-pulse-dashboard/', // Replace with your repo name
  // ... rest of config
});
```

4. Deploy:

```bash
npm run deploy
```

5. Enable GitHub Pages in repository settings:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages / root

**URL**: https://yourusername.github.io/team-pulse-dashboard/

---

### Option 4: Railway

**Prerequisites**: Railway account

**Steps**:

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm run preview`
6. Add environment variables (if needed)
7. Click "Deploy"

**Railway Configuration**:

Create `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### Option 5: Render

**Prerequisites**: Render account

**Steps**:

1. Go to https://render.com
2. Click "New" → "Static Site"
3. Connect your repository
4. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Click "Create Static Site"

---

### Option 6: Firebase Hosting

**Prerequisites**: Firebase project and Firebase CLI

**Steps**:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Configuration:
# - What do you want to use as public directory? dist
# - Configure as single-page app? Yes
# - Set up automatic builds with GitHub? (optional) Yes

# Build the app
npm run build

# Deploy
firebase deploy --only hosting
```

---

## 🔧 Build Optimization

### Production Build Tips

```bash
# Build with production optimizations
npm run build

# Analyze bundle size
npm run build -- --mode analyze

# Preview production build locally
npm run preview
```

### Optimization Checklist

- [ ] Minimize bundle size
- [ ] Enable tree-shaking
- [ ] Optimize images (convert to WebP if needed)
- [ ] Enable gzip/brotli compression
- [ ] Set proper cache headers
- [ ] Remove unused dependencies
- [ ] Code splitting for routes (if app grows)

---

## 🌍 Environment Variables

If you need environment variables for deployment:

**Create `.env.production`**:

```env
VITE_APP_NAME=Team Pulse Dashboard
VITE_API_URL=https://randomuser.me/api
```

**Access in code**:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Platform-specific configuration**:

- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Environment Variables
- **Railway**: Add in Project Settings → Variables

---

## 🔒 Security Considerations

Before deploying to production:

- [ ] No API keys or secrets in client-side code
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Content Security Policy headers configured
- [ ] CORS properly configured (if using external APIs)
- [ ] Dependencies audited (`npm audit`)

---

## 📊 Post-Deployment Verification

After deployment, verify:

1. **Functionality**:
   - [ ] All features work as expected
   - [ ] No 404 errors for routes
   - [ ] Assets load correctly
   - [ ] Redux state persists

2. **Performance**:
   - [ ] Page load time < 3 seconds
   - [ ] Lighthouse score > 90
   - [ ] No memory leaks
   - [ ] Smooth animations

3. **Responsive**:
   - [ ] Test on real mobile device
   - [ ] Test on tablet
   - [ ] Test on different screen sizes

4. **Browser Compatibility**:
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

---

## 🔄 Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linter
      run: npm run lint
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
        working-directory: ./
```

---

## 🆘 Troubleshooting

### Build Fails

**Error**: "Module not found"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error**: "Out of memory"
```bash
# Solution: Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Deployment Fails

**Issue**: Routes return 404
- **Solution**: Configure rewrites/redirects for SPA
- See platform-specific configuration above

**Issue**: Assets not loading
- **Solution**: Check `base` path in `vite.config.ts`
- Ensure paths are relative or absolute as needed

### Performance Issues

**Issue**: Large bundle size
```bash
# Analyze bundle
npm run build
# Check dist/ folder sizes
```

**Solution**:
- Lazy load routes
- Code split large components
- Optimize images
- Remove unused dependencies

---

## 📞 Support

For deployment issues:
- Check platform documentation
- Review build logs
- Verify configuration files
- Test production build locally first

---

**Last Updated**: September 30, 2025
