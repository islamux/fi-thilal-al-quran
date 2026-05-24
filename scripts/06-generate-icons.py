#!/usr/bin/env python3
"""Generate PWA icons (192x192 and 512x512) for في ظلال القرآن."""

from PIL import Image, ImageDraw, ImageFont
import subprocess, os

OUT_DIR = "public/icons"
SIZES = [192, 512]
BG = (26, 54, 93)  # --color-primary
FG = (201, 168, 76)  # --color-accent

def font_path() -> str | None:
    try:
        result = subprocess.run(
            ["fc-match", "-f", "%{file}", "Tajawal"],
            capture_output=True, text=True
        )
        path = result.stdout.strip()
        if path and os.path.exists(path):
            return path
    except Exception:
        pass
    return None

def generate():
    os.makedirs(OUT_DIR, exist_ok=True)
    fp = font_path()

    for size in SIZES:
        img = Image.new("RGBA", (size, size), BG)
        draw = ImageDraw.Draw(img)

        # Draw a stylized open book shape
        margin = size // 6
        w = size - 2 * margin
        h = w * 3 // 4
        left = margin
        right = size - margin
        top = (size - h) // 2
        bottom = top + h

        # Book body
        draw.polygon([
            (left, top), (right, top), (size // 2 + w // 8, bottom)
        ], fill=FG, outline=None)

        draw.polygon([
            (left, top), (size // 2, top + h // 3), (size // 2, bottom),
            (size // 2 - w // 8, bottom)
        ], fill=(180, 150, 60))

        # Try to add "﷽" text
        if fp:
            font_size = size // 5
            try:
                font = ImageFont.truetype(fp, font_size)
                bbox = draw.textbbox((0, 0), "﷽", font=font)
                tw = bbox[2] - bbox[0]
                th = bbox[3] - bbox[1]
                tx = (size - tw) // 2
                ty = (size - th) // 2 - size // 12
                draw.text((tx, ty), "﷽", fill="white", font=font)
            except Exception:
                pass

        path = os.path.join(OUT_DIR, f"icon-{size}.png")
        img.save(path, "PNG")
        print(f"Generated {path} ({size}x{size})")

if __name__ == "__main__":
    generate()
