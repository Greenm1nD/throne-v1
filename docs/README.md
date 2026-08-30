# THRONE — project handoff

The single index for everything established about this product. Written 27 Aug 2026.

Three Claude Code sessions are planned. Each should read this file first, then only its own
backlog:

| Session | Reads | Owns |
|---|---|---|
| **This one (universal)** | everything | strategy, design system, cross-cutting decisions |
| **Frontend** | this + [`frontend-backlog.md`](frontend-backlog.md) + [`progression-spec.md`](progression-spec.md) | `src/`, components, the progression widget |
| **Management** | this + [`management-backlog.md`](management-backlog.md) | marketing, SEO, n8n automation, analytics |

---

## What THRONE is today

A **front-end prototype**. This is the single most important fact and every plan is sequenced
behind it. Verified in the repository, not assumed:

| Claim | Evidence |
|---|---|
| No backend of any kind | `src/services/api.ts` describes itself as "a mock layer where a real backend later drops in". Zero `fetch`/`axios`/XHR calls in `src/`. |
| No real accounts | `src/composables/useAuth.ts` — "Static (client-side) auth — no backend". Login returns a hard-coded demo user and writes it to `localStorage`. |
| No payments, no KYC | 12 dependencies total. None is a payment, KYC, identity or wallet package. |
| No playable games | `GamePlayView.vue` renders its iframe only when a game defines `src`. Zero of 21 games define one. |
| No licence | Without one, Google, Meta, TikTok and both app stores refuse real-money gambling ads outright. |

**Consequence:** paid acquisition cannot start. Work that *can* start is the work with the
longest lead time and the lowest cost — the backend, SEO, affiliate relationships, and the
progression system.

## The decision that shapes everything

The product will be **global and open** — no market gating, anyone may play. That is settled.

It does not open markets; it decides which channels exist. Google, Meta, TikTok and both app
stores require a licence per country, so they stay closed. What remains is SEO, affiliates and
review portals, communities, referral and sponsorship. That is how Stake and Rollbit actually
grew — it is a real model, and it puts almost all the weight on the website itself.

## Figma files

| File | Key | What is in it |
|---|---|---|
| Design System & Assets | `L71oHLW0lRsNcZIBnxnByv` | Tokens, 79 icons, 11 component sets, chrome, composed screens, 150 assets |
| Sitemap, Flows & Guidelines | `qdUjoFoPPwTUGY2dxF7BEa` | Routes, user flows, 12 rules boards (motion, a11y, z-index, build flags, persisted state) |
| Go-to-Market: Europe & Asia | `7qfoXdp9ru9d3YkNW9aPUG` | Markets, channels, budget, creative direction, timeline, risks, **progression**, **site report** |
| Presentation | `dQuKrk3yiujZ1cTwGa0L7Q` | 16 slides answering the four founder questions |
| Progression & Promo Widget | `Ujc1amhBW6XWLqKpytVzaQ` | The widget system, states, motion, embed, placement map, promo layer |
| Progression & Promo (Georgian) | `QwGj75fYTQjZM6s8xdNPoI` | Full Georgian version — 11 pages |

The GTM file contains **two mutually exclusive plans** — an earlier licensed-Europe route and the
current global one. The board "This File Contains Two Plans" on its Start Here page says which
boards still apply. Read that before trusting any board in it.

## The rules these files state about themselves

Both were false when audited and are now true. Keep them true.

- **Instance, never copy.** Chrome components use real `GoldButton` instances (verified: 18
  instances, 0 hand-drawn frames).
- **Bind, do not retype.** The Foundations swatches bind their colour variables (verified: 10
  bound paints).

## Known defects in the product, verified in code

Ordered by how much they cost. Full detail on the Site Report page of the GTM file.

1. **Every page tells Google to delete itself.** One hard-coded canonical in `index.html:21`
   points at the homepage; `vercel.json` rewrites every path to that same file, so all ~50 URLs
   declare themselves duplicates of the homepage. Nothing in `src/` updates it at runtime.
2. **Every route serves an empty shell** — `<div id="app"></div>`. No SSR, SSG or prerender.
3. **Nothing is measured.** No analytics, tag manager or event tracking anywhere.
4. **No licence, company or contact details** in either footer.
5. **Unknown game slug returns HTTP 200 rendering a different game** — `GamePlayView.vue:13`
   falls back to `lobbyGames[0]`.
6. **The sitemap covers 7 of ~52 routes**; 10 of 50 named routes have a page title.
7. **Scroll lock has no ref count** — four unconditional writers of
   `documentElement.style.overflow`; closing one overlay unlocks the page while another is open.
8. **The auth guard discards the destination** — `router/index.ts` returns a bare `{ path: '/' }`.
9. **`ink-dim` #6F6A61 fails AA** — 3.79:1 on the page ground, used 242 times at 8–14px.
10. **`AuthModal` and `WalletModal` tie at `z-[200]`** — paint order is decided by teleport order.

## Open decisions, for a human

- ~~**Georgian rank names.**~~ **Decided 2026-08-27: the authentic Georgian hierarchy.**
  აზნაური · ბატონი · თავადი · ერისთავი · მთავარი · მეფე. Built across all 11 pages of the
  Georgian Figma file; the rejected direct mapping is kept on its Typography page as a record.
  Two consequences that now bind the code:
  (a) the API enum is NOT translated — the backend keeps sending `noble|baron|duke|crown|
  sovereign|monarch` and the Georgian name is display-layer only, so switching language
  never changes a member's rank;
  (b) `მთავარი` is a rank name now, so the home page is `საწყისი გვერდი` in all Georgian
  copy — one word cannot be both a rank and the adjective "main" in the same interface.
- **The domain.** `throne.com` is a live creator platform with roughly a million creators.
  Trademark clearance and the owned second-level domain are upstream of everything.
- **Capital.** Below roughly €600k in committed cash, the honest route is brand-first or
  operating as a skin on someone else's licence.

## Working agreements

- Never push to `main` without explicit approval — it is a production deploy to Vercel.
- Two images were replaced by the founder deliberately (`king-hall-bg.webp` among them). Do not
  delete or re-encode them.
- The build treats unused imports and locals as **errors**. Remove orphans in the same edit.
