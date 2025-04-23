#!/bin/bash
# Production mode startup script for AflaStop app with Raspberry Pi optimizations

# Kill any existing instances first
pkill -f electron || true
pkill -f vite || true
pkill -f vite-react-typescript-starter || true
sleep 1

# Basic display setup 
export DISPLAY=:0

# Force software rendering for Electron
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export NODE_ENV=production

# Set rendering variables for Raspberry Pi
export LIBGL_ALWAYS_SOFTWARE=1
export LIBGL_SOFTWARE_RENDERER=1
export MESA_GL_VERSION_OVERRIDE=3.0

# Change to project directory
cd "$(dirname "$0")"

# Build the app if it doesn't exist
if [ ! -d "dist" ]; then
  echo "Building application..."
  npm run build
fi

# Start the electron app
echo "Starting application in production mode..."
npm run electron:start