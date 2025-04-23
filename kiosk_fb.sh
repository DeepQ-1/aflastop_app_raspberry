#!/bin/bash

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
pkill -f vite-react-typescript-starter || true
sleep 1

# Set display environments to use Linux framebuffer directly
unset DISPLAY
unset WAYLAND_DISPLAY

# Completely disable all GPU and hardware acceleration
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_OZONE_PLATFORM=headless
export ELECTRON_ENABLE_LOGGING=1

# Set software rendering variables
export LIBGL_ALWAYS_SOFTWARE=1
export ELECTRON_USE_GBM=0

# Path to application
APP_PATH="$HOME/aflastop_app_1-main/out/vite-react-typescript-starter-linux-arm64/vite-react-typescript-starter"

# Run with minimal flags and safe rendering settings
"$APP_PATH" --ozone-platform=headless --disable-gpu --no-sandbox --disable-dev-shm-usage