import smbus
import time

DEVICE_BUS = 11 #i2c bus address, can be checked with ls /dev/ or with sudo i2cdetect -l
DEVICE_ADDR = 0x30 #address of connected device(relay) can be checked with i2cdetect -y 11

bus = smbus.SMBus(DEVICE_BUS)

print("Relay turned off")
bus.write_byte_data(DEVICE_ADDR, 0x00, 0x00)

