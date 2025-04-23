#!/bin/bash
# Most basic minimal script possible

# Kill any existing instances and clear memory
pkill -f electron || true
pkill -f vite || true
sync && echo 3 > /proc/sys/vm/drop_caches
sleep 3

# Don't use X11 at all - go completely headless
unset DISPLAY
unset WAYLAND_DISPLAY
export NODE_ENV=production

# Disable all networking features that are causing crashes
export ELECTRON_DISABLE_NETWORKING=1
export CHROMIUM_FLAGS='--disable-gpu --disable-extensions --disable-software-rasterizer'
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_USE_GBM=0
export ELECTRON_OZONE_PLATFORM=headless
export ELECTRON_NO_ASAR=1

# Bare minimum app with maximum compatibility
cd "$(dirname "$0")"
echo "Starting minimal electron..."

# Create a wrapper function that restarts on crash
while true; do
  /home/pi/aflastop_app_1-main/node_modules/electron/dist/electron \
    --no-sandbox \
    electron/main.js
  
  echo "App exited, restarting in 3 seconds..."
  sleep 3
done