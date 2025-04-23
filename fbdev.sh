#!/bin/bash
# Use the framebuffer directly with ozone

# Kill any existing instances
pkill -f electron || true
pkill -f vite || true
sleep 3

# Use framebuffer directly
unset DISPLAY
unset WAYLAND_DISPLAY

# Basic environment settings
export ELECTRON_NO_SANDBOX=1
export ELECTRON_DISABLE_GPU=1
export ELECTRON_DISABLE_HARDWARE_ACCELERATION=1
export ELECTRON_USE_GBM=0
export ELECTRON_ENABLE_LOGGING=1
export LIBGL_ALWAYS_SOFTWARE=1
export NODE_ENV=production

# Special Raspberry Pi Ozone platform settings
export ELECTRON_OZONE_PLATFORM=eglfs
export QT_QPA_PLATFORM=eglfs
export QT_QPA_EGLFS_INTEGRATION=eglfs_kms
export QT_QPA_EGLFS_ALWAYS_SET_MODE=1
export QT_QPA_EGLFS_KMS_CONFIG=/home/pi/aflastop_app_1-main/eglfs_kms_config.json

# Create EGLFS config if it doesn't exist
if [ ! -f /home/pi/aflastop_app_1-main/eglfs_kms_config.json ]; then
  cat > /home/pi/aflastop_app_1-main/eglfs_kms_config.json << EOF
{
  "device": "/dev/dri/card0",
  "outputs": [
    {
      "name": "HDMI-A-1",
      "size": {
        "width": 800,
        "height": 480
      },
      "physicalSize": {
        "width": 800,
        "height": 480
      }
    }
  ]
}
EOF
fi

# Run the app with simplified configuration
cd "$(dirname "$0")"
echo "Starting electron with EGLFS..."

# Run electron with restart loop
while true; do
  npm run electron:start -- --no-sandbox
  
  echo "App crashed, restarting in 3 seconds..."
  sleep 3
done