#!/bin/bash
# Framebuffer-specific startup script

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 2

# Set display environments for framebuffer
unset DISPLAY
unset WAYLAND_DISPLAY
export NODE_ENV=development
export DEVTOOLS=0

# Framebuffer specific settings
export ELECTRON_OZONE_PLATFORM=headless
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_USE_GBM=0
export LIBGL_ALWAYS_SOFTWARE=1

# Path to electron executable
ELECTRON_PATH="/home/pi/aflastop_app_1-main/node_modules/electron/dist/electron"

cd "$(dirname "$0")"
echo "Starting electron in framebuffer mode..."
"$ELECTRON_PATH" --ozone-platform=headless --disable-gpu --disable-dev-shm-usage electron/main.js