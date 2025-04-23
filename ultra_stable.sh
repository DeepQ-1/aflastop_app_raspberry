#!/bin/bash
# Ultra stable script with all network and GPU features disabled

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

# Disable network service to prevent crashes
export ELECTRON_DISABLE_NETWORK_SERVICE=1

# Force software rendering
export LIBGL_ALWAYS_SOFTWARE=1
export LIBGL_ALWAYS_INDIRECT=1

# Additional memory settings to improve stability
export NODE_OPTIONS="--max-old-space-size=512"

# Path to electron executable with ultra-minimal setup
cd "$(dirname "$0")"
echo "Starting electron in ultra-stable mode..."

# Use direct command with maximal stability flags
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
  --disable-dev-shm-usage \
  --ozone-platform=x11 \
  --no-sandbox \
  --disable-http-cache \
  --disable-http2 \
  --disable-background-networking \
  --disable-default-apps \
  --disable-extensions \
  --disable-component-extensions-with-background-pages \
  --disable-ipc-flooding-protection \
  --disable-renderer-backgrounding \
  --force-fallback-to-sw-compositing \
  electron/main.js