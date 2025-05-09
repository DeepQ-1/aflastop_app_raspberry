import cv2
import numpy as np
import sys

# Load the image from command line argument
if len(sys.argv) > 1:
    image_path = sys.argv[1]
else:
    print("No image path provided. Usage: python gen_mask_evaluate.py <image_path>")
    sys.exit(1)

image = cv2.imread(image_path)

# Convert the image to the HSV color space
hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

# Define the HSV range for isolating green color (adjust according to your needs)
lower_green_strict = np.array([50, 100, 100])  # Narrowing down to pure green hues
upper_green_strict = np.array([95, 255, 255])

# Create a mask to detect the green glowing areas
mask = cv2.inRange(hsv_image, lower_green_strict, upper_green_strict)

# Count the number of green (non-zero) pixels
green_pixels_count = np.count_nonzero(mask)

# Get the total number of pixels in the image
total_pixels = image.shape[0] * image.shape[1]

# Calculate the percentage of glowing green pixels
green_pixels_percentage = (green_pixels_count / total_pixels) * 100

# Assess if the corn is safe
if green_pixels_percentage > 0:
    safety_status = "Corn is NOT safe"
else:
    safety_status = "Corn is safe"

# Print the results
print(f"Percentage of glowing green pixels: {green_pixels_percentage:.2f}%")
print(f"Number of glowing green pixels: {green_pixels_count}")
print(safety_status)

# Save the mask image
import os
# Use the same directory as the input image
output_dir = os.path.dirname(image_path)
output_filename = os.path.basename(image_path).replace('.jpg', '_mask.jpg')
output_mask_path = os.path.join(output_dir, output_filename)

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

cv2.imwrite(output_mask_path, mask)
print(f"Mask image saved as: {output_mask_path}")