#!/usr/bin/env python3
"""
THRONE logo processor.

Takes the white-background logo art and produces dark-theme-ready,
transparent PNGs, automatically split into:
  - throne-logo-mark.png      (crown + T monogram, top block)
  - throne-logo-wordmark.png  (THRONE / VIP GAMING CLUB, bottom block)
  - throne-logo-full.png      (whole lockup)

Usage:
  python3 scripts/process_logo.py [source_image]

If no source is given it auto-detects ./logo-source.{png,jpg,jpeg,webp}.
Requires only Pillow (no numpy).
"""
import sys
import glob
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "images"
PAD = 24  # transparent padding around each trimmed block


def find_source(argv: list[str]) -> Path:
    if len(argv) > 1:
        return Path(argv[1])
    for ext in ("png", "jpg", "jpeg", "webp"):
        hits = glob.glob(str(ROOT / f"logo-source.{ext}"))
        if hits:
            return Path(hits[0])
    raise SystemExit(
        "No source found. Save the logo as ./logo-source.png (or pass a path)."
    )


def make_transparent(img: Image.Image) -> Image.Image:
    """White/gray background -> alpha 0, gold kept (with soft edges)."""
    img = img.convert("RGBA")
    r, g, b, _ = img.split()
    maxc = ImageChops.lighter(ImageChops.lighter(r, g), b)
    minc = ImageChops.darker(ImageChops.darker(r, g), b)
    sat = ImageChops.subtract(maxc, minc)          # colour intensity
    inv = ImageChops.invert(minc)                  # darkness -> opacity
    sat_boost = sat.point(lambda x: min(255, int(x * 3)))
    # Opaque where pixel is dark OR strongly coloured; white bg -> 0.
    alpha = ImageChops.lighter(inv, sat_boost)
    # Hard floor: kill faint near-white background, then recover contrast so
    # real gold edges stay solid. Below CUT -> fully transparent.
    CUT = 40
    alpha = alpha.point(lambda a: 0 if a < CUT else min(255, int((a - CUT) * 1.7) + 60))
    return Image.merge("RGBA", (r, g, b, alpha))


def row_has_content(img: Image.Image, thresh: int = 3) -> list[bool]:
    """Average alpha per row (BOX resize to width 1) -> content flags."""
    col = img.getchannel("A").resize((1, img.height), Image.BOX)
    return [v > thresh for v in col.getdata()]


def content_blocks(flags: list[bool]) -> list[tuple[int, int]]:
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


def trim_and_save(img: Image.Image, top: int, bottom: int, name: str) -> None:
    crop = img.crop((0, top, img.width, bottom))
    bbox = crop.getbbox()  # tight box from alpha
    if bbox:
        crop = crop.crop(bbox)
    canvas = Image.new("RGBA", (crop.width + PAD * 2, crop.height + PAD * 2), (0, 0, 0, 0))
    canvas.paste(crop, (PAD, PAD), crop)
    OUT.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT / name)
    print(f"  -> {name}  ({canvas.width}x{canvas.height})")


def already_transparent(img: Image.Image, frac: float = 0.10) -> bool:
    """True if the source already carries a real alpha channel."""
    if img.mode != "RGBA":
        return False
    a = img.getchannel("A")
    transparent = a.histogram()[0]
    return transparent / (img.width * img.height) > frac


def main() -> None:
    src = find_source(sys.argv)
    print(f"Source: {src}")
    raw = Image.open(src)
    if already_transparent(raw):
        print("  source is already transparent — using its alpha as-is")
        img = raw.convert("RGBA")
    else:
        print("  removing white background")
        img = make_transparent(raw)

    # Drop faint stray/anti-alias pixels so trims are tight and edges clean.
    r, g, b, a = img.split()
    a = a.point(lambda v: 0 if v < 30 else v)
    img = Image.merge("RGBA", (r, g, b, a))

    flags = row_has_content(img)
    blocks = content_blocks(flags)
    if not blocks:
        raise SystemExit("No content detected — is the image blank?")

    full_top, full_bottom = blocks[0][0], blocks[-1][1]
    trim_and_save(img, full_top, full_bottom, "throne-logo-full.png")

    if len(blocks) >= 2:
        # Largest vertical gap separates the mark from the wordmark.
        gaps = [
            (blocks[i + 1][0] - blocks[i][1], i)
            for i in range(len(blocks) - 1)
        ]
        _, split_i = max(gaps)
        mark_bottom = blocks[split_i][1]
        word_top = blocks[split_i + 1][0]
        trim_and_save(img, full_top, mark_bottom, "throne-logo-mark.png")
        trim_and_save(img, word_top, full_bottom, "throne-logo-wordmark.png")
    else:
        # Single block — reuse full as the mark.
        trim_and_save(img, full_top, full_bottom, "throne-logo-mark.png")
        print("  (single block: no separate wordmark)")

    print("Done.")


if __name__ == "__main__":
    main()
