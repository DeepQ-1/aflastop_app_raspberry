#!/bin/bash
# Script to install Debian package and create desktop shortcut

echo "===== Installing AflaStop Application ====="
cd "$(dirname "$0")"

# Install required system dependencies for Electron on Raspberry Pi
echo "Installing system dependencies..."
sudo apt update
sudo apt install -y libgtk-3-0 libx11-xcb1 libxss1 libnss3 libatk-bridge2.0-0 libgtk-3-dev \
    libgbm1 libasound2 libgconf-2-4 unclutter xserver-xorg xinit

# Check if the Debian package exists
if [ ! -f "out/make/deb/arm64/vite-react-typescript-starter_0.0.0_arm64.deb" ]; then
    echo "Error: Debian package not found!"
    echo "Please run build_app.sh first."
    exit 1
fi

# Install the Debian package
echo "Installing Debian package..."
sudo apt install -y ./out/make/deb/arm64/vite-react-typescript-starter_0.0.0_arm64.deb

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "Error: Installation failed!"
    exit 1
fi

# Create desktop shortcut
echo "Creating desktop shortcut..."
cat > /home/pi/Desktop/AflaStop.desktop << EOL
[Desktop Entry]
Version=1.0
Name=AflaStop
Comment=AflaStop Application
Exec=/usr/bin/vite-react-typescript-starter
Icon=/usr/lib/vite-react-typescript-starter/resources/app/public/logo.svg
Terminal=false
Type=Application
Categories=Utility;
StartupNotify=true
EOL

# Make the desktop shortcut executable
chmod +x /home/pi/Desktop/AflaStop.desktop

# Create autostart entry
echo "Creating autostart entry..."
mkdir -p /home/pi/.config/autostart
cat > /home/pi/.config/autostart/aflastop.desktop << EOL
[Desktop Entry]
Type=Application
Name=AflaStop
Comment=AflaStop Application
Exec=/usr/bin/vite-react-typescript-starter
Icon=/usr/lib/vite-react-typescript-starter/resources/app/public/logo.svg
Terminal=false
X-GNOME-Autostart-enabled=true
StartupNotify=true
Categories=Utility;
EOL

# Create systemd service
echo "Creating systemd service..."
cat > /tmp/aflastop.service << EOL
[Unit]
Description=AflaStop Application
After=graphical.target

[Service]
ExecStartPre=/bin/sleep 5
User=pi
Environment="DISPLAY=:0"
Environment="WAYLAND_DISPLAY=wayland-0"
Environment="ELECTRON_DISABLE_GPU=1"
Environment="ELECTRON_DISABLE_HARDWARE_ACCELERATION=1"
Environment="ELECTRON_NO_SANDBOX=1"
Environment="ELECTRON_USE_GL=none"
Environment="ELECTRON_ENABLE_LOGGING=1"
ExecStart=/home/pi/aflastop_app_1-main/kiosk.sh
Restart=always
RestartSec=10s
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=graphical.target
EOL

# Install and enable the service
sudo cp /tmp/aflastop.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable aflastop.service

# Make kiosk script executable
chmod +x /home/pi/aflastop_app_1-main/kiosk.sh

echo "===== Installation Completed ====="
echo "You can now:"
echo "1. Double-click the desktop shortcut to run the application"
echo "2. Reboot to have the application start automatically"
echo "3. Run 'sudo systemctl start aflastop.service' to start the application now"