from adafruit_extended_bus import ExtendedI2C as I2C
import adafruit_ads1x15.ads1015 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

i2c = I2C(11) #i2c bus address, can be checked with ls /dev/ or with sudo i2cdetect -l

ads = ADS.ADS1015(i2c)

chan = AnalogIn(ads, ADS.P0)
print(chan.value, chan.voltage)

if chan.voltage > 2:
	print("Tray is OPEN")
else:
	print("Tray is CLOSED")

