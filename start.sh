#!/usr/bin/env bash
set -e

# Simple launcher for Smart Appliance Dashboard
# Starts backend (Node) and frontend (static server) locally.
# Usage:
#   chmod +x start.sh stop.sh
#   ./start.sh
#   (to stop) ./stop.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "== Starting Smart Appliance Dashboard =="

if [[ ! -d "$BACKEND_DIR" ]]; then
  echo "Backend directory not found: $BACKEND_DIR" >&2
  exit 1
fi
if [[ ! -d "$FRONTEND_DIR" ]]; then
  echo "Frontend directory not found: $FRONTEND_DIR" >&2
  exit 1
fi

echo "-> Launching backend (port 3000)..."
(cd "$BACKEND_DIR" && nohup node server.js > server.log 2>&1 & echo $! > "$SCRIPT_DIR/backend.pid")
sleep 2
echo "   Backend PID $(cat "$SCRIPT_DIR/backend.pid")"

echo "-> Launching frontend static server (port 8080)..."
(cd "$FRONTEND_DIR" && nohup python3 -m http.server 8080 > frontend.log 2>&1 & echo $! > "$SCRIPT_DIR/frontend.pid")
sleep 2
echo "   Frontend PID $(cat "$SCRIPT_DIR/frontend.pid")"

echo "\nBackend API:   http://localhost:3000/api/live"
echo "Dashboard URL: http://localhost:8080/dashboard-final.html"
echo "Control API:  POST http://localhost:3000/api/control { action: 'on' | 'off' }"
echo "Logs:         backend/server.log, frontend/frontend.log"
echo "Stop:         ./stop.sh"
echo "============================================================"
