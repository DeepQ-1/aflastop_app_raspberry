#!/bin/bash
# Final ultra-stable script combining the best settings

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 2

# Basic environment setup - X11 only
export DISPLAY=:0
unset WAYLAND_DISPLAY

# Single process mode - prevent service crashes
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_USE_GBM=0
export ELECTRON_OZONE_PLATFORM=x11

# Force software rendering
export LIBGL_ALWAYS_SOFTWARE=1
export LIBGL_ALWAYS_INDIRECT=1

# Additional memory settings for stability
export NODE_OPTIONS="--max-old-space-size=384"

# Change to app directory
cd "$(dirname "$0")"
echo "Starting electron in final mode..."

# Run electron directly with the most minimal configuration
NODE_ENV=production npx electron --no-sandbox electron/main.js