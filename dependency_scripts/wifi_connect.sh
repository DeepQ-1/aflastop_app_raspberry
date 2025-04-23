#!/bin/bash

SSID="$1"
PASSWORD="$2"

if [ -z "$SSID" ]; then
  echo "Error: SSID is required"
  exit 1
fi

# Try using nmcli first (NetworkManager) - more modern approach
if command -v nmcli &> /dev/null; then
  echo "Using NetworkManager to connect..."
  
  if [ -z "$PASSWORD" ]; then
    # Open network
    nmcli device wifi connect "$SSID"
  else
    # Secured network
    nmcli device wifi connect "$SSID" password "$PASSWORD"
  fi
  
  # Check exit status
  if [ $? -eq 0 ]; then
    echo "Connected to $SSID successfully"
    exit 0
  fi
  
  echo "NetworkManager failed, trying wpa_supplicant..."
fi

# Fallback to wpa_supplicant method
# Configure WiFi using wpa_cli
if [ -z "$PASSWORD" ]; then
  # Open network
  wpa_cli -i wlan0 add_network > /dev/null
  NETWORK_ID=$(wpa_cli -i wlan0 list_networks | tail -n1 | cut -f1)
  wpa_cli -i wlan0 set_network "$NETWORK_ID" ssid "\"$SSID\"" > /dev/null
  wpa_cli -i wlan0 set_network "$NETWORK_ID" key_mgmt NONE > /dev/null
else
  # Secured network
  wpa_cli -i wlan0 add_network > /dev/null
  NETWORK_ID=$(wpa_cli -i wlan0 list_networks | tail -n1 | cut -f1)
  wpa_cli -i wlan0 set_network "$NETWORK_ID" ssid "\"$SSID\"" > /dev/null
  wpa_cli -i wlan0 set_network "$NETWORK_ID" psk "\"$PASSWORD\"" > /dev/null
fi

# Enable and select the network
wpa_cli -i wlan0 enable_network "$NETWORK_ID" > /dev/null
wpa_cli -i wlan0 select_network "$NETWORK_ID" > /dev/null
wpa_cli -i wlan0 save_config > /dev/null

# Wait for connection
echo "Connecting to $SSID..."
sleep 5

# Check if connection was successful
if ping -c 1 8.8.8.8 > /dev/null 2>&1; then
  echo "Connected to $SSID successfully"
  exit 0
else
  echo "Failed to connect to $SSID"
  exit 1
fi