# Concept v2 — Visual Generation Prompts

**For:** Higgsfield (z_image model — cheap tier; free plan runs 1 job at a time, queue these sequentially)
**Convention:** every prompt below is self-contained — paste as-is. Generate 4 variants per asset, pick one, keep the seed.
**Post-processing:** Figma cannot decode webp — export/convert to PNG before any Figma import. For the site, convert to webp at build time as the existing assets do.

## Brand anchors (append to every prompt if the tool supports style presets)

```
Style: cinematic dark luxury, near-black background (#050505), antique gold accents (#D4AF37),
champagne highlights (#F5D77A), volumetric rim light, high contrast, matte texture, film grain 5%,
baroque restraint — ornament at the edges, calm center. No text, no watermark, no logo.
```

**Negative (always):** `text, letters, numbers, watermark, human faces, cartoon, neon, blue tint,
slot reels, playing cards, dice, roulette wheel, poker chips, coins raining, jackpot imagery`

> The negative list is deliberate: the brand shows **the house**, never gambling clichés and never
> winnings. This matches the embed rules in `marketing_strategy/` and the anti-dark-pattern doctrine.

---

## 01 · Casino slim brand band (replaces the 640px PageHero)

**Use:** `CasinoView` slim band, ~220px tall strip. **Ratio 21:9, generate at 2560×1080, crop to band.**

```
Ultra-wide cinematic strip of a dark royal treasury hall, viewed straight-on: polished black marble
floor reflecting warm gold candlelight, rows of tall gilded columns receding into darkness at both
edges, the center third calm and empty (space for UI text overlay), subtle gold dust in the air.
Bottom 30% fades to pure black #050505 for seamless page blend. Cinematic rim lighting, matte,
restrained baroque detail on the columns only.
```

## 02 · Mobile home first-screen band (375px composition)

**Use:** mobile hero, ≤40vh. **Ratio 4:5, 1080×1350.**

```
Portrait composition, dark throne hall seen from below: a single empty gold throne silhouette high
in the frame, lit by one warm shaft of light from the left; lower half dissolves into pure black
#050505 (UI space). Minimal, monumental, calm. Gold #D4AF37 rim light on the throne edges only,
everything else near-black. No ornament in the lower half.
```

## 03 · Rank crest set v2 — six emblems

**Use:** rank cards v2, progression widget, affiliate creatives. **One prompt per rank, 1:1, 1024×1024.**
The escalation logic: each rank adds ONE element — never redraw the whole crest.

```
[base — აზნაური / Noble]
Minimal heraldic emblem, single thin-line gold laurel ring on pure black background, engraved
metal texture, centered, flat front view, antique gold #D4AF37, icon-like clarity, no text.

[ბატონი / Baron]      … the laurel ring gains a small keystone shield at its base.
[თავადი / Duke]        … the shield gains two crossed ceremonial swords behind the ring.
[ერისთავი / Crown]     … a slim five-point coronet sits atop the ring.
[მთავარი / Sovereign]  … the coronet becomes a closed arc crown; ring doubles to two concentric lines.
[მეფე / Monarch]       … full closed crown with orb, ring becomes a sunburst of fine engraved rays,
                         champagne #F5D77A highlights on the crown only.
```

## 04 · Trust panel backdrop ("What you will never see here")

**Use:** repurposed `TheInvitation` panel. **Ratio 16:9, 1920×1080, very low contrast.**

```
Almost-black textured surface like aged ledger leather, faint embossed grid of fine gold hairlines
(2% opacity feel), one soft warm light gradient from the top-left corner, everything extremely
subtle — a background that reads as texture, not image. #050505 base, #D4AF37 hairlines.
```

## 05 · Rakeback calculator backdrop

**Use:** `RakebackCalculator` module on landers and VIP page. **Ratio 3:2, 1620×1080.**

```
Dark writing desk surface from directly above: black leather inlay, a corner of an open ledger
book with empty ruled pages (no writing), a brass fountain pen resting at the frame edge, warm
candlelight from the right, deep shadows, gold #D4AF37 reflections on the pen and page edges only.
Center 60% dark and calm for UI overlay.
```

## 06 · Campaign lander hero variants (3, one per sample campaign)

**Use:** `/c/:campaignId` landers. **Ratio 16:9, 1920×1080; keep center-bottom calm for the calculator.**

```
[c/affiliate-review — "the open books" angle]
Dark hall archive: wall of gilded ledger spines in shadow, one book pulled out and open under a
single warm beam, gold edges glowing. Calm, factual, library silence.

[c/streamer — "the arena" angle]
Empty royal gallery at night seen from the stage: rows of dark velvet seats, gold balcony rails
catching rim light, one spotlight pooling on the floor front-center. Anticipation without people.

[c/push-latam — "the gate" angle]
Massive dark bronze doors slightly ajar, warm gold light spilling through the gap onto black
marble, fine engraved patterns on the doors visible only where light touches. Minimal, inviting,
no figures.
```

## 07 · Hall of Kings v2 backdrop (seasonal leaderboard)

**Use:** `HallOfKings` — winnings removed, crowns/season shown. **Ratio 16:9, 1920×1080.**

```
Long dark gallery with three empty pedestals of different heights (podium arrangement, center
tallest), each catching its own narrow warm light shaft from above, gold laurel details on the
pedestal rims, black marble floor with faint reflections, background dissolving to #050505.
No statues, no people — the pedestals await this season's names.
```

## 08 · Season XII emblem

**Use:** season chip, Hall of Kings header, CRM/campaign assets. **1:1, 1024×1024.**

```
Circular seal emblem: engraved gold ring with twelve small notches around the rim (season XII),
center holds a minimal crown-over-hourglass mark, antique gold on pure black, embossed wax-seal
depth, icon clarity at small sizes, no text.
```

## 09 · GameTile placeholder covers (royal originals set, 8 pieces)

**Use:** demo catalog tiles until the aggregator lands. **1:1, 1024×1024 each.**
One prompt frame, swap the [SUBJECT]:

```
Square game cover art, dark luxury style: [SUBJECT] rendered as an engraved gold object floating
on near-black, single warm key light, fine metal texture, cinematic depth of field, composition
leaves the lower 20% calm. #D4AF37 gold, #F5D77A highlights, no text, no characters.

[SUBJECT] set: a gilded falcon in flight · a royal signet ring · crossed ceremonial keys ·
an astrolabe · a chalice with gems · a war-horn with gold bands · an ornate hand mirror ·
a mechanical songbird
```

## 10 · Cashier trust icons — do NOT generate

The withdrawal-timeline icons (requested → processing → sent → arrived), min/max chips, and the
18+/limits marks must be **hand-drawn SVG in the existing icon system** (`Icon/App/*`, 53 icons,
consistent stroke). Generated raster icons will not match stroke weight and will read as foreign.
This is a Figma task, not a generation task — add to the design-system file `L71oHLW0lRsNcZIBnxnByv`.

---

## Generation order (1-concurrent queue)

| # | Asset | Blocks |
|---|---|---|
| 1 | 01 Casino band | CasinoView slim band ships with placeholder gradient until then |
| 2 | 03 Rank crests (6 jobs) | Rank cards v2, affiliate creatives |
| 3 | 06 Lander heroes (3 jobs) | Campaign landers ship with dark gradient until then |
| 4 | 02 Mobile band | |
| 5 | 05 Calculator backdrop | |
| 6 | 07 + 08 Hall of Kings + seal | |
| 7 | 09 Tile covers (8 jobs) | lowest priority — current art works |

**Reminder:** never overwrite the two founder-replaced images in `public/assets/images/` —
new assets get new filenames.
