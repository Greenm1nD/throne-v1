#!/usr/bin/env python3
"""
Split the 6-crown sheet (Crowns.png) into individual transparent crown icons,
named per VIP tier. Requires only Pillow.

Usage: python3 scripts/split_crowns.py [source]
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "images"
NAMES = ["noble", "baron", "duke", "crown", "sovereign", "monarch"]
PAD = 16


def clean(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    r, g, b, a = img.split()
    a = a.point(lambda v: 0 if v < 30 else v)  # drop faint strays
    return Image.merge("RGBA", (r, g, b, a))


def column_blocks(img: Image.Image, thresh: int = 3):
    row = img.getchannel("A").resize((img.width, 1), Image.BOX)
    flags = [v > thresh for v in row.getdata()]
    blocks, start = [], None
    for i, on in enumerate(flags):
        if on and start is None:
            start = i
        elif not on and start is not None:
            blocks.append((start, i))
            start = None
    if start is not None:
        blocks.append((start, len(flags)))
    return blocks


def save(img: Image.Image, x0: int, x1: int, name: str):
    crop = img.crop((x0, 0, x1, img.height))
    bbox = crop.getbbox()
    if bbox:
        crop = crop.crop(bbox)
    canvas = Image.new("RGBA", (crop.width + PAD * 2, crop.height + PAD * 2), (0, 0, 0, 0))
    canvas.paste(crop, (PAD, PAD), crop)
    OUT.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT / f"crown-{name}.png")
    print(f"  -> crown-{name}.png  ({canvas.width}x{canvas.height})")


def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else OUT / "Crowns.png"
    print(f"Source: {src}")
    img = clean(Image.open(src))
    blocks = column_blocks(img)
    print(f"Detected {len(blocks)} crowns")
    if len(blocks) != len(NAMES):
        print(f"  ! expected {len(NAMES)} — check spacing; proceeding by index")
    for i, (x0, x1) in enumerate(blocks[: len(NAMES)]):
        save(img, x0, x1, NAMES[i])
    print("Done.")


if __name__ == "__main__":
    main()
