#!/bin/bash
# Script to build Electron app and create Debian package

echo "===== Building Electron Application ====="
cd "$(dirname "$0")"

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf out/ dist/

# Build the application
echo "Building web application..."
npm run build

echo "Building Electron application..."
npm run build:electron

echo "Creating Debian package..."
npm run electron:make

if [ -f "out/make/deb/arm64/vite-react-typescript-starter_0.0.0_arm64.deb" ]; then
    echo "===== Build Successful ====="
    echo "Debian package created at: out/make/deb/arm64/vite-react-typescript-starter_0.0.0_arm64.deb"
    exit 0
else
    echo "===== Build Failed ====="
    echo "Debian package was not created."
    exit 1
fi