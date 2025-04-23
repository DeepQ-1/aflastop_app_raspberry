#!/bin/bash
# Raspberry Pi specific launcher for AflaStop
# Uses the most reliable approach for RPi hardware

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 3

# Set up special Raspberry Pi configuration
# Use a specific display setup for RPi
export DISPLAY=:0
unset WAYLAND_DISPLAY

# Most critical optimization for RPi
export CHROMIUM_FLAGS='--disable-gpu --disable-software-rasterizer'
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1 
export ELECTRON_USE_GBM=0
export ELECTRON_TRASH=trashcan

# Force GPU to software mode
export LIBGL_ALWAYS_SOFTWARE=1

# Memory / performance optimizations for RPi
export NODE_OPTIONS="--max-old-space-size=300"
ulimit -n 4096
ulimit -c 0

# Auto-restart the app if it crashes
handle_crash() {
  echo "Application crashed, restarting in 3 seconds..."
  sleep 3
  exec "$0"
}
trap handle_crash SIGTERM

# Change to app directory
cd "$(dirname "$0")"
echo "Starting electron for Raspberry Pi..."

# Use the simplest possible approach for Electron on RPi
NODE_ENV=production exec npx electron --no-sandbox electron/main.js