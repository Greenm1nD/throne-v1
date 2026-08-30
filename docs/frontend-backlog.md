# Frontend backlog

For the frontend-only Claude Code session. Read [`README.md`](README.md) and
[`progression-spec.md`](progression-spec.md) first.

Everything here is verified in the repository. Each item names the file and line so you can
confirm before you change anything.

---

## P0 — the site is invisible to search, and search is now the whole acquisition plan

With paid advertising closed, organic and affiliates are the entire way players arrive. These
four attack exactly that.

### 1. Every page tells Google to delete itself
`index.html:21` hard-codes `rel="canonical"` at the homepage. `vercel.json` rewrites `/(.*)` to
`/index.html`, so all ~50 URLs serve that tag. Nothing in `src/` updates it at runtime.
**Fix:** remove the static canonical; emit a self-referencing one per route. Highest-value change
in this document. *Hours.*

### 2. Every route serves an empty shell
Built body is `<div id="app"></div>`. No SSR, SSG or prerender; `vite.config.ts` has no prerender
plugin.
**Fix:** prerender the ~19 static public routes at build time. Each generated file carries its own
title, description, canonical and OG tags. *Days.*

### 3. Nothing is measured
No analytics, tag manager or event tracking anywhere in `src/`, `index.html` or `public/`.
**Fix:** a privacy-first self-hostable stack — Plausible or PostHog. GA4 is a liability for an
unlicensed gambling brand. Minimum events: page view with route name, age-gate accept,
registration start/complete, deposit start/complete, game open. *Days.*

### 4. No licence, company or contact details
`AppFooter.vue:162-191` and `AppFooterPremium.vue:85-105` carry only a copyright line. Affiliates
and review portals check for exactly this before listing a brand.
**Fix:** a persistent footer trust block. Until a licence exists, ship what is true — legal entity,
registration number, registered address, support route, 18+ and responsible-gambling marks — and
leave the licence row out rather than faking it. *Days.*

---

## P1 — correctness

### 5. Unknown game slug serves a different game, with a 200
`src/views/GamePlayView.vue:13` — `findGame(slug) ?? lobbyGames[0]`, no not-found branch. Creates
unlimited indexable duplicate URLs.
**Fix:** render a not-found state and inject `<meta name="robots" content="noindex">`.
`TournamentDetailView.vue` already does this correctly — copy that pattern. *Hours.*

### 6. Scroll lock has no reference count
Four independent writers of `document.documentElement.style.overflow` with no counter:
`useAuthModal.ts:19,23,30,34`, `useWalletModal.ts:18,22`, `AgeGate.vue:16,23`.
Repro: deep-link a guest to `/account/bet-history` → guard opens AuthModal (lock) → AgeGate mounts
and locks again → Escape closes AuthModal → the page scrolls behind the still-open gate.
**Fix:** one `useScrollLock()` holding a module-level integer. `lock()` sets `overflow:hidden` on
0→1; `unlock()` clears it on 1→0, clamped at zero. *Hours.*

### 7. The auth guard discards the destination
`src/router/index.ts` returns a bare `{ path: '/' }`; `TwoFaModal.vue:48-52` then hard-codes
`router.push('/account')`. Dropped twice, affecting all 28 account routes.
**Fix:** carry the intended path in a `redirect` query param, land with `router.replace`, and
validate it against `/^\/(?!\/)/` so it cannot become an open redirect. *Hours.*

### 8. Two modals tie at `z-[200]`
`AuthModal.vue:189` and `WalletModal.vue:45`. Which paints on top is decided by teleport order in
`App.vue`, not by intent. `TwoFaModal` sits at `z-[120]` — *below* the modal it is the second step
of — and only works because `AuthModal.close()` runs first.
**Fix:** a named z-scale in `tailwind.config.js` (content 0–30, chrome 50, drawer 70, overlay 100,
modal 200, blocking 300) and forbid new arbitrary `z-[…]` values in review. *Hours.*

---

## P2 — accessibility, and the token that fails it

### 9. `ink-dim` fails AA, 242 times
`#6F6A61` measures 3.79:1 on `#050505`, 3.51:1 on the card. AA needs 4.5:1 and it is used almost
entirely on 10–12px uppercase microcopy, where legibility matters most.
**Fix:** one token in `tailwind.config.js:22` — `#6F6A61` → `#8A857B` (≈4.6:1). Fixes all 242
sites at once. *Minutes.*

### 10. Focus indicators are suppressed
`focus:outline-none` appears 28 times. `main.css:30-36` defines a good global `:focus-visible`
outline, but Tailwind utilities out-rank `@layer base`, so every one of those wins.
**Fix:** delete the utility and let the base rule work, or append an explicit
`focus-visible:ring-2 focus-visible:ring-gold/60`. *Minutes.*

### 11. No focus trap in any modal
All four dialogs declare `aria-modal="true"` and none traps focus — keyboard and screen-reader
users Tab straight out into the page behind.
**Fix:** one shared `useFocusTrap(elRef)`: store `document.activeElement`, focus the first
focusable node, cycle Tab/Shift+Tab inside, set `inert` on the app root, restore on close. *Hours.*

---

## P3 — performance

### 12. No image declares its size
None of the 54 `<img>` elements has `width`/`height`; 45 have no `loading` attribute. Guarantees
layout shift and eager decoding of off-screen images. Alt text is at 100% — keep it that way.
**Fix:** explicit dimensions or an aspect-ratio class on all 54; `loading="lazy" decoding="async"`
on the 45 below the fold. *Hours.*

### 13. 6.2 MB shipped and never referenced
Fifteen files, including two PNGs over 2 MB each. `public/` totals 41 MB.
**Fix:** delete them — but `grep -r <basename> src index.html` each one first. The
`hero-mobile-*.webp` variants ARE referenced dynamically from data files and must stay.
**Do not touch `king-hall-bg.webp` or `king-champion.webp`** — the founder replaced those
deliberately. *Minutes.*

### 14. Cormorant Garamond is loaded and never used
`index.html:38` requests four variants. `font-serif` has zero usages in `src/`.
**Fix:** drop it from the Google Fonts request. Free bytes. *Minutes.*

---

## P4 — the progression rewrite

See [`progression-spec.md`](progression-spec.md) for the full design. Build order is in §5 there.
The two steps that matter most are the shared `rankFor`/`bandProgress` module and the deletion of
the old scales — leaving them beside the new one recreates the exact defect being fixed.

---

## Things that are correct — do not "fix" them

- **The CategoryNav clips at 768px.** That is deliberate: the items row is `overflow-x-auto` below
  `lg`, so the strip scrolls horizontally. Verified in `CategoryNav.vue:27`.
- **The desktop `AppHeader` renders at 768px.** `mobile.css:20` hides it only at
  `max-width: 767px`, and `MobileTopBar`/`MobileBottomNav` are `md:hidden`.
- **`Cinzel` has no Georgian glyphs.** Any Georgian UI must use `Noto Sans Georgian` for display;
  the THRONE wordmark stays Cinzel because it is Latin.
