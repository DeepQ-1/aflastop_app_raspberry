#!/bin/bash
# Single process script for maximum stability

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 2

# Basic environment setup - X11 only
export DISPLAY=:0
unset WAYLAND_DISPLAY

# Single process mode - prevent service crashes
export ELECTRON_RUN_AS_NODE=0
export ELECTRON_NO_ASAR=1
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_TRASH=trashcan
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export ELECTRON_USE_GBM=0

# Force software rendering
export LIBGL_ALWAYS_SOFTWARE=1
export LIBGL_ALWAYS_INDIRECT=1

# Additional memory settings for stability
export NODE_OPTIONS="--max-old-space-size=384"

# Change to app directory
cd "$(dirname "$0")"
echo "Starting electron in single-process mode..."

# Run with single process flags
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
  --single-process \
  --no-zygote \
  --no-sandbox \
  --disable-dev-shm-usage \
  --disable-http-cache \
  --disable-http2 \
  --disable-background-networking \
  --disable-default-apps \
  --disable-extensions \
  --disable-component-extensions-with-background-pages \
  --disable-ipc-flooding-protection \
  --disable-renderer-backgrounding \
  --disable-site-isolation-trials \
  --disable-threaded-scrolling \
  --disable-threaded-animation \
  --disable-hang-monitor \
  --disable-remote-fonts \
  --ozone-platform=x11 \
  electron/main.js