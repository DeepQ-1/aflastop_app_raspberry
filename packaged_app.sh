#!/bin/bash
# Use the packaged app directly

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
pkill -f vite-react-typescript-starter || true
sleep 2

# Reset display settings
export DISPLAY=:0
unset WAYLAND_DISPLAY

# Basic environment variables
export ELECTRON_NO_SANDBOX=1
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_USE_GBM=0
export LIBGL_ALWAYS_SOFTWARE=1

# Path to the packaged application
APP_PATH="/home/pi/aflastop_app_1-main/out/vite-react-typescript-starter-linux-arm64/vite-react-typescript-starter"

# Run the packaged app directly 
echo "Starting packaged app..."
exec "$APP_PATH" --no-sandbox