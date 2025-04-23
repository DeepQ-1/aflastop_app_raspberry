#!/bin/bash

# Check if WiFi is connected and get current SSID and IP
CONNECTED=$(iwconfig wlan0 | grep -c "ESSID:\"")
if [ "$CONNECTED" -eq 1 ]; then
  SSID=$(iwconfig wlan0 | grep ESSID | sed 's/.*ESSID:"\(.*\)".*/\1/')
  IP=$(ip addr show wlan0 | grep "inet " | awk '{print $2}' | cut -d/ -f1)
  echo "{\"connected\": true, \"ssid\": \"$SSID\", \"ip\": \"$IP\"}"
else
  echo "{\"connected\": false}"
fi