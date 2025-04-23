#!/bin/bash
# Development mode startup script for AflaStop app with Raspberry Pi optimizations

# Kill any existing instances first
pkill -f electron || true
pkill -f vite || true
pkill -f vite-react-typescript-starter || true
sleep 1

# Configure X11 display settings
export DISPLAY=:0
export XCURSOR_THEME=""
export XCURSOR_SIZE=0

# Force software rendering for Electron
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_NO_SANDBOX=1
export NODE_ENV=development
export DEVTOOLS=0

# Set rendering variables for Raspberry Pi
export LIBGL_ALWAYS_SOFTWARE=1
export LIBGL_SOFTWARE_RENDERER=1
export MESA_GL_VERSION_OVERRIDE=3.0

# Change to project directory
cd "$(dirname "$0")"

# Run in development mode with special flags for Raspberry Pi
echo "Starting application in development mode with software rendering..."
npm run dev:electron