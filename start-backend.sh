#!/bin/bash

# Smart Energy Monitor - Quick Setup Script
# This script will set up and run your energy monitoring dashboard

echo "╔════════════════════════════════════════════════════════╗"
echo "║     Smart Energy Monitor - Quick Setup                ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "   Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo ""

# Step 1: Install Backend Dependencies
echo "📦 Step 1: Installing backend dependencies..."
cd "$BACKEND_DIR"

if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo "✓ Backend dependencies installed successfully"
    else
        echo "❌ Failed to install backend dependencies"
        exit 1
    fi
else
    echo "✓ Backend dependencies already installed"
fi

echo ""

# Step 2: Start Backend Server
echo "🚀 Step 2: Starting backend server..."
echo ""
echo "   The backend will run on http://localhost:3000"
echo "   Keep this terminal window open!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the server
npm start
