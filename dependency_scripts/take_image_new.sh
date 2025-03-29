#!/bin/bash

# Define camera IDs (adjust if your camera IDs are different)
TOP_CAMERA_ID=0    # Camera with cokin filter
BOTTOM_CAMERA_ID=1 # Camera without cokin filter

# Define common settings
AWB="cloudy"
EXPOSURE="short"
SHARPNESS="2.0"
CONTRAST="1.0"
BRIGHTNESS="0.0"
SATURATION="1.0"
EV="0.0"
GAIN="8.0"

# Get current date and time for filename
DATETIME=$(date '+%d-%m-%Y_%H:%M:%S')

# Create images directory if it doesn't exist
mkdir -p images

# Capture image from TOP camera (with cokin filter, awb=incandescent)
libcamera-still -n \
    --camera $TOP_CAMERA_ID \
    --exposure $EXPOSURE \
    --awb $AWB \
    --sharpness $SHARPNESS \
    --contrast $CONTRAST \
    --brightness $BRIGHTNESS \
    --saturation $SATURATION \
    --ev $EV \
    --gain $GAIN \
    -o "images/${DATETIME}__TOP.jpg" \

# Capture image from BOTTOM camera (without cokin filter, awb=cloudy)
libcamera-still -n \
    --camera $BOTTOM_CAMERA_ID \
    --exposure $EXPOSURE \
    --awb $AWB \
    --sharpness $SHARPNESS \
    --contrast $CONTRAST \
    --brightness $BRIGHTNESS \
    --saturation $SATURATION \
    --ev $EV \
    --gain $GAIN \
    -o "images/${DATETIME}__BOTTOM.jpg"

echo "Images captured and saved to the 'images' folder:"
echo " - images/${DATETIME}__TOP.jpg"
echo " - images/${DATETIME}__BOTTOM.jpg"
