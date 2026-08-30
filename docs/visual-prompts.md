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

---

# ChatGPT (GPT-4o) version

GPT-4o images take natural-language instructions, have no separate negative field (exclusions go
inline), and hold style best when a series is generated **in one conversation**. Sizes: ask for
"square", "landscape", or "portrait" explicitly. If results drift bright, reply "much darker —
the background must be almost pure black".

## Step 0 — paste this once at the start of the conversation

```
We are creating brand artwork for THRONE, a dark-luxury royal brand. Keep this exact style for
every image in this conversation: near-black background (#050505), antique gold accents (#D4AF37)
with champagne highlights (#F5D77A), cinematic rim lighting, matte surfaces, subtle film grain,
baroque detail only at the edges with a calm center. Never include any text, letters, numbers,
watermarks, logos, or human faces. Never include gambling imagery: no slot reels, playing cards,
dice, roulette wheels, poker chips, or falling coins. Mood: monumental, quiet, expensive.
Confirm, then wait for my asset requests.
```

## 01 · Casino slim brand band (priority 1)

```
Widest landscape format. A dark royal treasury hall viewed straight-on: polished black marble
floor reflecting warm candlelight, tall gilded columns receding into darkness at the left and
right edges, the center third calm and almost empty so interface text can sit over it later.
The bottom third fades to pure black for seamless blending into a webpage. Faint gold dust in
the air. Keep it very dark overall.
```
*(მიღებულს ზემოდან/ქვემოდან მოვჭრით ~220px ზოლამდე — შუა მესამედი დარჩეს სუფთა.)*

## 03 · Rank crests — sequential chain (priority 2)

```
[1/6] Square format. A minimal heraldic emblem: a single thin-line gold laurel ring, centered on
a pure black background, engraved-metal texture, flat front view, crisp enough to read as an
icon at small sizes. This is the first of six rank emblems — each next one will ADD one element
to this exact design, so keep the composition simple and centered.
```
```
[2/6] Same emblem, same style, same framing — add a small keystone shield at the base of the ring.
[3/6] Keep everything — add two crossed ceremonial swords behind the ring.
[4/6] Keep everything — add a slim five-point coronet resting on top of the ring.
[5/6] Keep everything — the coronet becomes a closed-arc crown, and the ring becomes two
      concentric thin lines.
[6/6] Keep everything — the crown becomes a full closed crown with an orb, and the ring becomes
      a sunburst of fine engraved rays. Add champagne-gold highlights on the crown only.
```

## 06 · Campaign lander heroes (priority 3)

```
[affiliate-review] Landscape. A dark archive wall of gilded ledger spines in shadow; one book
pulled out and open under a single warm beam of light, its gold page edges glowing. Library
silence, factual calm. Bottom half darker and calm for interface overlay.
```
```
[streamer] Landscape. An empty royal theatre at night seen from the stage: rows of dark velvet
seats, gold balcony rails catching rim light, one spotlight pooling on the floor front-center.
Anticipation without people. Bottom half calm for interface overlay.
```
```
[push-latam] Landscape. Massive dark bronze doors slightly ajar, warm gold light spilling
through the gap onto black marble; fine engraved patterns visible only where the light touches.
Minimal and inviting, no figures. Bottom half calm for interface overlay.
```

## 02 · Mobile home band

```
Portrait format. A dark throne hall seen from below: a single empty gold throne silhouette high
in the frame, lit by one warm shaft of light from the left. The entire lower half dissolves into
pure black — that area will hold interface elements. Monumental and minimal; gold rim light on
the throne edges only, no ornament in the lower half.
```

## 05 · Rakeback calculator backdrop

```
Landscape, top-down view of a dark writing desk: black leather inlay, the corner of an open
ledger book with empty ruled pages (no writing on them), a brass fountain pen resting at the
edge of the frame, warm candlelight from the right, deep shadows. Gold reflections only on the
pen and page edges. The central 60% must stay dark and calm for interface overlay.
```

## 04 · Trust panel texture

```
Landscape, extremely subtle: an almost-black surface like aged ledger leather with a faint
embossed grid of hairline gold lines, barely visible, and one soft warm gradient from the
top-left corner. This must read as a background texture, not a picture — if in doubt, darker
and subtler.
```

## 07 · Hall of Kings backdrop

```
Landscape. A long dark gallery with three empty stone pedestals arranged as a podium (center
tallest), each lit by its own narrow warm shaft from above, gold laurel details on the pedestal
rims, black marble floor with faint reflections, background dissolving into darkness. No statues
and no people — the pedestals are waiting for this season's champions.
```

## 08 · Season XII seal

```
Square. A circular seal emblem: an engraved gold ring with twelve small notches around the rim,
holding a minimal crown-over-hourglass mark in the center. Antique gold on pure black, the depth
of a pressed wax seal, crisp at small sizes.
```

## 09 · Game tile covers (8, run as a chain in one conversation)

```
Square game-cover artwork, one engraved gold object floating on a near-black background, single
warm key light, fine metal texture, shallow depth of field, the lower fifth of the frame calm.
First object: a gilded falcon in mid-flight. The next seven requests will swap only the object —
keep everything else identical.
```
Then, one line each:
`Same style — a royal signet ring.` · `…crossed ceremonial keys.` · `…an astrolabe.` ·
`…a chalice set with gems.` · `…a war-horn with gold bands.` · `…an ornate hand mirror.` ·
`…a mechanical songbird.`

*(10 · სალაროს იკონები აქაც გამოტოვებულია — SVG-ით, დიზაინ-სისტემაში.)*
