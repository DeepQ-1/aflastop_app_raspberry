import cv2
import numpy as np

# Load the image
image_path = 'corn_under_uv.jpg'  # replace with your file path
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
output_mask_path = 'green_glow_mask.jpg'  # specify the output filename
cv2.imwrite(output_mask_path, mask)
print(f"Mask image saved as: {output_mask_path}")