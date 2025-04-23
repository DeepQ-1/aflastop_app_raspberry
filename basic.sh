#!/bin/bash
# Most basic pure X11 renderer with no hardware acceleration at all

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 2

# Basic environment setup - X11 only
export DISPLAY=:0
unset WAYLAND_DISPLAY

# Turn off all possible hardware acceleration
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_USE_GBM=0
export ELECTRON_OZONE_PLATFORM_HINT=x11
export ELECTRON_OZONE_PLATFORM=x11

# Force software rendering
export LIBGL_ALWAYS_SOFTWARE=1
export LIBGL_ALWAYS_INDIRECT=1

# Path to electron executable with absolute minimal flags
cd "$(dirname "$0")"
echo "Starting electron in basic mode..."

# Use direct command with minimal flags
/home/pi/aflastop_app_1-main/node_modules/electron/dist/electron \
  --disable-gpu \
  --disable-software-rasterizer \
  --disable-gpu-compositing \
  --disable-gpu-memory-buffer-compositor \
  --disable-gpu-early-initialization \
  --disable-gpu-sandbox \
  --disable-accelerated-2d-canvas \
  --disable-accelerated-video-decode \
  --disable-native-gpu-memory-buffers \
  --disable-webgl \
  --in-process-gpu \
  --ozone-platform=x11 \
  --no-sandbox \
  --force-fallback-to-sw-compositing \
  electron/main.js