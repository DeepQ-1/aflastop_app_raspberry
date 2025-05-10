#!/bin/bash

# Create a dedicated calibration images directory completely outside the project
CALIB_IMAGES_DIR="/tmp/aflastop_calibration"
mkdir -p "$CALIB_IMAGES_DIR"

# Capture images first (pass the calibration directory to the script)
$(dirname "$0")/take_image_new.sh "$CALIB_IMAGES_DIR"

# Get most recent TOP and BOTTOM images
LATEST_TOP_IMAGE=$(ls -t "$CALIB_IMAGES_DIR"/*__TOP.jpg 2>/dev/null | head -1)
LATEST_BOTTOM_IMAGE=$(ls -t "$CALIB_IMAGES_DIR"/*__BOTTOM.jpg 2>/dev/null | head -1)

# Check if images were captured successfully
if [ -z "$LATEST_TOP_IMAGE" ] || [ -z "$LATEST_BOTTOM_IMAGE" ]; then
  echo "Error: Images not captured or found in the $CALIB_IMAGES_DIR directory"
  exit 1
fi

# Process TOP image
echo "Processing TOP image: $LATEST_TOP_IMAGE"
TOP_RESULT=$(python $(dirname "$0")/python_scripts/gen_mask_evaluate.py "$LATEST_TOP_IMAGE")
echo "$TOP_RESULT"

# Process BOTTOM image
echo "Processing BOTTOM image: $LATEST_BOTTOM_IMAGE"
BOTTOM_RESULT=$(python $(dirname "$0")/python_scripts/gen_mask_evaluate.py "$LATEST_BOTTOM_IMAGE")
echo "$BOTTOM_RESULT"

