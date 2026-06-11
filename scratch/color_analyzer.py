import os
from PIL import Image

image_dir = "/home/neo/ANTIGRAVITY WORK FOLDERS/Reggae Kitchen/Product Images/drive-download-20260611T162601Z-3-001"
images = sorted([f for f in os.listdir(image_dir) if f.endswith('.jpg')])

for img_name in images:
    path = os.path.join(image_dir, img_name)
    with Image.open(path) as img:
        # Convert to RGB
        img_rgb = img.convert('RGB')
        # Get dimensions
        w, h = img.size
        # Get center crop (middle 40% of the image)
        box = (int(w * 0.3), int(h * 0.3), int(w * 0.7), int(h * 0.7))
        crop_img = img_rgb.crop(box)
        
        # Calculate average color
        pixels = list(crop_img.getdata())
        r_avg = sum(p[0] for p in pixels) / len(pixels)
        g_avg = sum(p[1] for p in pixels) / len(pixels)
        b_avg = sum(p[2] for p in pixels) / len(pixels)
        
        # Print results
        print(f"File: {img_name} | Size: {w}x{h} | Avg Center RGB: ({r_avg:.1f}, {g_avg:.1f}, {b_avg:.1f})")
