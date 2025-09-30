#!/bin/bash

# Team Pulse Dashboard - Setup Script
# This script helps set up the project for development

set -e  # Exit on error

echo "🚀 Team Pulse Dashboard - Setup Script"
echo "======================================"
echo ""

# Check Node.js
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Or use nvm: https://github.com/nvm-sh/nvm"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# Check npm
echo ""
echo "📦 Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm version: $NPM_VERSION"

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
echo "This may take a few minutes..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Verify critical packages
echo ""
echo "🔍 Verifying critical packages..."

PACKAGES=("react" "react-dom" "@reduxjs/toolkit" "react-redux" "tailwindcss" "vite")

for package in "${PACKAGES[@]}"; do
    if npm list "$package" &> /dev/null; then
        echo "  ✅ $package"
    else
        echo "  ❌ $package - MISSING!"
    fi
done

# Create .env file if not exists
echo ""
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env 2>/dev/null || echo "VITE_APP_NAME=Team Pulse Dashboard" > .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Run linter check
echo ""
echo "🔍 Running linter check..."
npm run lint

if [ $? -eq 0 ]; then
    echo "✅ No linting errors!"
else
    echo "⚠️  Some linting issues found (can be fixed later)"
fi

# Build test
echo ""
echo "🏗️  Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Production build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Final summary
echo ""
echo "======================================"
echo "✨ Setup Complete!"
echo "======================================"
echo ""
echo "📚 Next steps:"
echo "  1. Start dev server:    npm run dev"
echo "  2. Open browser:        http://localhost:5173"
echo "  3. Read the docs:       cat README.md"
echo "  4. Run tests:           cat TESTING.md"
echo ""
echo "🎉 Happy coding!"
echo ""
