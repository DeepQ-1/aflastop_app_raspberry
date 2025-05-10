#!/bin/bash

# Create a dedicated testing images directory completely outside the project
TEST_IMAGES_DIR="/tmp/aflastop_testing"
mkdir -p "$TEST_IMAGES_DIR"

# Capture images first (pass the testing directory to the script)
$(dirname "$0")/take_image_new.sh "$TEST_IMAGES_DIR"

# Get most recent TOP and BOTTOM images
LATEST_TOP_IMAGE=$(ls -t "$TEST_IMAGES_DIR"/*__TOP.jpg 2>/dev/null | head -1)
LATEST_BOTTOM_IMAGE=$(ls -t "$TEST_IMAGES_DIR"/*__BOTTOM.jpg 2>/dev/null | head -1)

# Check if images were captured successfully
if [ -z "$LATEST_TOP_IMAGE" ] || [ -z "$LATEST_BOTTOM_IMAGE" ]; then
  echo "Error: Images not captured or found in the $TEST_IMAGES_DIR directory"
  exit 1
fi

# Process TOP image
echo "Processing TOP image: $LATEST_TOP_IMAGE"
TOP_RESULT=$(python $(dirname "$0")/python_scripts/gen_mask_evaluate.py "$LATEST_TOP_IMAGE")
echo "$TOP_RESULT"

# Extract the number of glowing green pixels from TOP result
TOP_PIXELS=$(echo "$TOP_RESULT" | grep "Number of glowing green pixels:" | awk '{print $6}')

# Process BOTTOM image
echo "Processing BOTTOM image: $LATEST_BOTTOM_IMAGE"
BOTTOM_RESULT=$(python $(dirname "$0")/python_scripts/gen_mask_evaluate.py "$LATEST_BOTTOM_IMAGE")
echo "$BOTTOM_RESULT"

# Extract the number of glowing green pixels from BOTTOM result
BOTTOM_PIXELS=$(echo "$BOTTOM_RESULT" | grep "Number of glowing green pixels:" | awk '{print $6}')

# Calculate total glowing pixels
TOTAL_PIXELS=$((TOP_PIXELS + BOTTOM_PIXELS))

echo "TOTAL GLOWING GREEN PIXELS ACROSS BOTH IMAGES: $TOTAL_PIXELS"

# Evaluation based on pixel count thresholds
if [ "$TOTAL_PIXELS" -le 50 ]; then
  echo "TEST RESULT: NORMAL"
  TEST_STATUS="UREDAN"
elif [ "$TOTAL_PIXELS" -le 500 ]; then
  echo "TEST RESULT: SUSPICIOUS"
  TEST_STATUS="SUMNJIV"
else
  echo "TEST RESULT: POSITIVE"
  TEST_STATUS="POZITIVAN"
fi

# Output the result in a format that can be easily parsed by the app
echo "TEST_STATUS: $TEST_STATUS"
echo "TEST_PIXEL_COUNT: $TOTAL_PIXELS"