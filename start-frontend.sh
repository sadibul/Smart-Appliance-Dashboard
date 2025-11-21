#!/bin/bash

# Smart Energy Monitor - Frontend Server Script

echo "╔════════════════════════════════════════════════════════╗"
echo "║     Smart Energy Monitor - Frontend Server            ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

cd "$FRONTEND_DIR"

echo "🌐 Starting frontend server..."
echo ""
echo "   The dashboard will be available at:"
echo "   → http://localhost:8080"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Try Python first, then Node.js http-server
if command -v python3 &> /dev/null; then
    echo "✓ Using Python HTTP server"
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    echo "✓ Using Python HTTP server"
    python -m http.server 8080
elif command -v npx &> /dev/null; then
    echo "✓ Using Node.js HTTP server"
    npx http-server -p 8080
else
    echo "❌ No HTTP server found!"
    echo "   Please install Python or Node.js"
    exit 1
fi
