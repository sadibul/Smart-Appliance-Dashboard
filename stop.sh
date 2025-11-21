#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

stop_proc() {
  local name="$1" pid_file="$SCRIPT_DIR/$2"
  if [[ -f "$pid_file" ]]; then
    local pid="$(cat "$pid_file")"
    if kill -0 "$pid" 2>/dev/null; then
      echo "Stopping $name (PID $pid)..."
      kill "$pid" && rm -f "$pid_file"
    else
      echo "$name already stopped." && rm -f "$pid_file"
    fi
  else
    echo "$name not running (no pid file)."
  fi
}

stop_proc "Backend" backend.pid
stop_proc "Frontend" frontend.pid

echo "All processes stopped."
