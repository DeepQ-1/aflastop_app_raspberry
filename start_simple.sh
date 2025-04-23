#!/bin/bash
# Ultra minimal startup script focusing only on X11 platform

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 2

# Basic environment setup - explicitly use X11
export DISPLAY=:0
unset WAYLAND_DISPLAY
export ELECTRON_OZONE_PLATFORM=x11
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_USE_GBM=0
export LIBGL_ALWAYS_SOFTWARE=1
export NODE_ENV=development
export DEVTOOLS=0

# Launch direct method with minimal flags
cd "$(dirname "$0")"

echo "Starting electron with X11 fallback..."
/home/pi/aflastop_app_1-main/node_modules/electron/dist/electron --no-sandbox --ozone-platform=x11 --disable-gpu electron/main.js