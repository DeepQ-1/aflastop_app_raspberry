#!/bin/bash

# Ensure we have sudo permissions
if [ "$(id -u)" -ne 0 ]; then
  echo "This script needs to be run with sudo"
  exit 1
fi

# Force a new scan
iwlist wlan0 scan > /dev/null 2>&1
sleep 1

# Get all available networks
NETWORKS=$(iwlist wlan0 scan | grep -E 'ESSID|Quality|Encryption' | tr -d '\n' | sed 's/ESSID:/\nESSID:/g' | grep ESSID | sort -u)

# Start JSON array
echo "["

# Process each network
FIRST=true
while read -r line; do
  SSID=$(echo "$line" | grep -o 'ESSID:"[^"]*"' | cut -d'"' -f2)
  
  # Skip empty SSIDs
  if [ -z "$SSID" ]; then
    continue
  fi
  
  # Add comma if not the first item
  if [ "$FIRST" = false ]; then
    echo ","
  else
    FIRST=false
  fi
  
  # Output network info as JSON object
  echo -n "  { \"ssid\": \"$SSID\" }"
done <<< "$NETWORKS"

# End JSON array
echo ""
echo "]"