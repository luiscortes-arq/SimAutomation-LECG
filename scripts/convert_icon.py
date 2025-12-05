"""
Convert PNG to ICO with multiple sizes
"""
from PIL import Image

# Load the PNG image
img = Image.open('resources/icon.png')

# Create ICO with multiple sizes
icon_sizes = [(16, 16), (32, 32), (48, 48), (256, 256)]
img.save('resources/icon.ico', format='ICO', sizes=icon_sizes)

print("Icon converted successfully!")
