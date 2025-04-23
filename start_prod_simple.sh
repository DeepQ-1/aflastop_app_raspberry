#!/bin/bash
# Simplified production startup script

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 1

# Basic environment setup
export DISPLAY=:0
export ELECTRON_DISABLE_GPU=1
export ELECTRON_NO_SANDBOX=1
export NODE_ENV=production

# Change to project directory
cd "$(dirname "$0")"

# Build if needed
if [ ! -d "dist" ]; then
  echo "Building production version..."
  npm run build
fi

# Start the app
echo "Starting production app..."
npm run electron:start