# Paid Media — Push, Popunder & Native

**Owner:** Head of Performance
**Networks:** PropellerAds, ExoClick (primary) · Adsterra, RichAds, Clickadu, TrafficStars (secondary)

---

## 1. Where the money can actually go

Google Ads, Meta, and TikTok require a **local operator licence per country**. A Curaçao licence
unlocks none of them. That is why this channel exists: adult/mainstream ad networks accept gambling
against a Curaçao licence and a compliance review, and they are the only self-serve paid channel
open to you.

### 1.1 Market viability matrix

> ⚠️ **SUPERSEDED (2026-08-31):** several classifications below are stale — Chile is CLOSED (Supreme Court 09/2025 + DNS blocking), Japan is CLOSED (promo/affiliate ban since 2025-09-25, criminal), Peru/Mexico/DR are licensing-track, not grey. The current market model is the market-cell gate in [07_launch_flow_plan.md](07_launch_flow_plan.md) §3. This table is kept for the workable-geo mechanics only and will be harmonized after the counsel sprint.

| Market | Status | Run ads? | Note |
|---|---|:--:|---|
| **Mexico** | Grey, tolerated | ✅ Primary | SEGOB permits exist for local ops; offshore is long-standing grey. Highest LatAm volume open to you |
| **Chile** | Grey, bill pending | ✅ Primary | Highest ARPU in the region. Watch the bill |
| **Peru** | Regulating (MINCETUR) | ⚠️ Counsel | Licensing live since 2024; enforcement ramping. Do not scale without advice |
| **Ecuador** | Open | ✅ | Low CPC, low ARPU, clean |
| **Paraguay / Bolivia** | Open | ✅ | Small volume, very cheap traffic |
| **Guatemala / Dom. Rep. / Costa Rica** | Open | ✅ | Underserved, low competition |
| **Argentina** | Province-by-province | ⚠️ | CABA + Buenos Aires Province licensed; offshore grey. Currency volatility hurts ARPU |
| **Brazil** | **Closed** | ❌ | Federal SPA licence required since 01 Jan 2025 (Law 14.790/2023). ANATEL blocks unlicensed domains. R$30M/5yr |
| **Colombia** | **Closed** | ❌ | Coljuegos-licensed market; offshore ISP-blocked since 2016 |
| **India** | **Prohibited** | ❌ | Promotion & Regulation of Online Gaming Act 2025 bans real-money online gaming nationally |
| **Philippines** | Hostile | ❌ | POGO ban Dec 2024; PAGCOR domestic-only |
| **China, S. Korea, Singapore, Indonesia, Thailand, Vietnam, Cambodia, Malaysia, UAE, Saudi** | **Criminal** | ❌ | Criminal exposure for operators and/or players. Block at CDN *and* registration |
| **Japan** | Grey, enforcement rising | ⚠️ Counsel only | Very high ARPU ($150–300 CPA). Recent enforcement against offshore-facing operators |

> **The honest read on "Asia".** For a Curaçao licence in 2026 the Asian surface is Japan
> (counsel-gated) plus diaspora traffic. Everything else on that list is closed, criminal, or newly
> shut. Plan on **~90% of paid budget going to LatAm** and treat Asia as a research line item, not a
> growth market. If your board expects Asia volume, the honest answer is that it requires a different
> licence, not a different ad network.

### 1.2 Network selection

| Network | Formats | Min deposit | Strength | Watch |
|---|---|---:|---|---|
| **PropellerAds** | Push, In-page push, Popunder, Interstitial, Direct click | $100 | Best LatAm push volume; strong anti-fraud; CPA Goal auto-optimisation | Push inventory quality varies wildly by zone |
| **ExoClick** | Native, Banner, Popunder, Video, In-page push | $200 | Best native inventory; granular targeting; mature reporting | Adult-heavy placements — blocklist aggressively |
| **Adsterra** | Popunder, Social bar, Native, Banner | $100 | Social Bar format converts well on mobile LatAm | Fraud requires active management |
| **RichAds** | Push, In-page, Popunder | $150 | Push-first, good subscriber freshness data | Smaller reach |
| **Clickadu** | Popunder, In-page, Video | $100 | Cheap tier-3 volume | Quality floor is low |
| **TrafficStars** | Native, Banner, Popunder | $200 | Good for retargeting pools | Adult-skewed |

**Start with two: PropellerAds (push + popunder) and ExoClick (native).** Adding a third network
before you have a profitable campaign on the first two multiplies the fraud surface without
multiplying the learning.

### 1.3 Account setup — what they will ask for

Have these ready or you lose a week per network:
licence certificate · company registration · beneficial-ownership declaration · the exact domains
you will advertise · your prohibited-geo list · your 18+ and RG page URLs · a named compliance
contact.

---

## 2. Format mechanics

### 2.1 Classic push
Browser notifications to users who previously granted permission on some publisher site.

- **Reality:** subscriber lists rot fast. Ask each network for **subscriber freshness** and buy
  0–7-day and 8–30-day segments separately — they price and convert very differently.
- **Chrome desktop is saturated.** Permission fatigue has crushed CTR. Push works on **Android
  mobile**, which is exactly the LatAm device profile.
- **iOS: does not exist.** Web push on iOS requires the site to be installed to the home screen.
  Plan for zero iOS push.
- CPC model, typically $0.004–$0.02 in your target geos.

### 2.2 In-page push
A notification-styled element rendered inside the publisher page. No permission needed.

- **Works everywhere including iOS Safari.** This is the growth format.
- Higher CPC than classic push, better quality, no list decay.
- **This should be your largest single line item.**

### 2.3 Popunder
A full new tab/window behind the current one.

- Cheapest traffic available (CPM $0.30–$2.00 in LatAm). Zero intent — the user did not click.
- **Requires a pre-lander.** Sending popunder traffic to a deposit page is burning money; the user
  has no idea who you are.
- High bot/fraud share. Blocklist zones aggressively from day one.
- Frequency cap **1 per user per 24h** or you train the market to hate the brand.

### 2.4 Native
In-feed placements styled like publisher content.

- Highest quality, highest CPC ($0.05–$0.30 in LatAm), best for review/comparison landers.
- Creative fatigue is fast — refresh every 7–10 days.
- The only format where a long-form advertorial lander works.

---

## 3. Budget allocation

### 3.1 The testing rule

**Spend 3× your target CPA on a test cell before you judge it.** If your target CPA is $60, that is
**$180 per cell**. Killing a cell at $60 spend with zero conversions is statistically meaningless —
you have simply bought a coin flip.

A "cell" = one **creative × one geo × one format × one lander**. Change one variable at a time.

### 3.2 Phase 1 — Discovery (weeks 1–3): $9,000

| Line | Network | Format | Geo | Daily | 21d |
|---|---|---|---|---:|---:|
| 1 | PropellerAds | In-page push | MX | $120 | $2,520 |
| 2 | PropellerAds | In-page push | CL | $100 | $2,100 |
| 3 | PropellerAds | Classic push (0–7d) | MX + EC | $60 | $1,260 |
| 4 | ExoClick | Native | MX | $80 | $1,680 |
| 5 | ExoClick | Native | CL + PE | $50 | $1,050 |
| 6 | PropellerAds | Popunder | EC + PY + BO | $20 | $420 |
| | | | | **$430** | **$9,030** |

Run **3 creatives × 2 landers per line** = 6 cells per line. At $430/day across 36 cells you are
funding roughly $12/cell/day — reach $180/cell by day 15. Do not touch anything before then except
to blocklist obvious fraud zones.

### 3.3 Phase 2 — Consolidation (weeks 4–8): $21,000/month

Kill everything above 1.5× target CPA. Reallocate to survivors.

| Line | Share | Monthly |
|---|---:|---:|
| Winning in-page push, MX + CL | 45% | $9,450 |
| Winning native, MX + CL | 25% | $5,250 |
| Push expansion (EC, PY, GT, DO) | 15% | $3,150 |
| Retargeting pool (non-depositors) | 10% | $2,100 |
| New-creative test reserve | 5% | $1,050 |

### 3.4 Phase 3 — Scale (month 3+): $45,000–70,000/month
Move winners onto the network's CPA-goal bidding, keep 10% on manual bidding as a control, keep 5%
on new-creative testing permanently.

### 3.5 Efficiency gates — kill rules

| Signal | Threshold | Action |
|---|---|---|
| Cell CPA | > 2× target at 3× spend | Kill |
| Zone CTR | > 8% on push | Blocklist — that is a bot farm, not interest |
| Zone reg→FTD | < 5% with ≥ 40 regs | Blocklist |
| Zone bounce | > 92% | Blocklist |
| Creative CTR decay | −40% from week-1 peak | Refresh creative |
| Geo D7 retention | < 15% | Pause geo, review lander localisation |

Export your zone blocklist weekly and apply it across **all** networks — the same fraudulent
inventory is resold everywhere.

---

## 4. Ad copy

Rules that bind every line below:

- **No guaranteed outcomes.** No "win", "you will win", "guaranteed", "risk-free".
- **No status or success claims.** CAP 16.3.6-style rules prohibit implying gambling confers
  superiority, admiration, or social success. This is also the exact copy that gets an account
  banned at compliance review.
- **No financial-solution framing.** Nothing about income, debt, salary, or "make money".
- **18+ mark on every creative** that has room for it; always on the lander.
- **Localise, do not translate.** MX Spanish ≠ CL Spanish ≠ AR Spanish. "Tragamonedas" (MX) vs.
  "tragaperras" (ES) vs. "máquinas" (CL colloquial).

---

### Creative 1 — "Published rate" (in-page push, MX/CL)
*Angle: transparency. The single most under-used angle in the category, because almost nobody can
back it up.*

**EN**
> **Title:** We publish our rakeback rate. Nobody else does.
> **Description:** 3% to 22% of the house edge, returned on every settled bet. The formula is on the site.

**ES-MX**
> **Título:** Publicamos nuestra tasa de retorno. Nadie más lo hace.
> **Descripción:** Del 3% al 22% del margen de la casa, devuelto en cada apuesta cerrada. La fórmula está en el sitio.

**Logic:** it makes a *checkable* claim instead of a promise. Curiosity + implied criticism of
competitors. Converts poorly on volume, exceptionally on quality — expect a lower CTR and a much
higher reg→FTD. Pair with the calculator lander (§5.3).

---

### Creative 2 — "No wagering requirement" (native, MX/CL/PE)
*Angle: removing the thing players have learned to distrust.*

**EN**
> **Title:** The bonus you can actually withdraw
> **Description:** No wagering requirement on your cashback. It lands in your balance, and it is yours. 18+

**ES-MX**
> **Título:** El bono que sí puedes retirar
> **Descripción:** Tu cashback sin requisito de apuesta. Cae a tu saldo y es tuyo. 18+

**PT-BR** *(for reference only — Brazil is blocked; use for PT-speaking diaspora targeting elsewhere)*
> **Título:** O bônus que você consegue sacar
> **Descrição:** Cashback sem rollover. Cai no seu saldo e é seu. 18+

**Logic:** "wagering requirement" (rollover) is the category's most-hated mechanic and the top
complaint on every review portal. Naming it and removing it is a stronger hook than any number.
**Only run this if it is true** — if your cashback carries a rollover, this creative will generate
complaints that cost more than the traffic earned.

---

### Creative 3 — "Withdrawal speed" (push + popunder, EC/PY/GT/DO)
*Angle: the operational fear in tier-3 markets is not "will I win", it is "will they pay me".*

**EN**
> **Title:** Withdrawals in under 2 hours. Median, not "up to".
> **Description:** We publish last month's actual payout times. 18+ Play responsibly.

**ES-419**
> **Título:** Retiros en menos de 2 horas. Mediana real, no "hasta".
> **Descripción:** Publicamos los tiempos de pago del mes pasado. +18 Juega con responsabilidad.

**Logic:** the "median, not up to" construction attacks the standard industry weasel phrase
directly. In markets where slow-pay operators are the norm, this is the highest-intent hook
available. **Requires that you actually publish the data and that it is good.**

---

### 4.4 Creative production notes

| Element | Spec |
|---|---|
| Push icon | 192×192, high contrast, **no faces**, no chips/cards/dice (many networks reject gambling iconography on push icons) |
| Push image | 360×240 |
| Native image | 1200×628 and 300×250 |
| Rotation | 3 creatives minimum per cell, refresh every 7–10 days |
| Naming | `{net}_{geo}_{format}_{angle}_{variant}` → `prop_mx_ipp_rate_v3` |
| Localisation | Native speaker review before spend. Machine translation is detectable and it kills CTR |

---

## 5. Lander optimisation

### 5.1 Direct link vs. pre-lander

| Traffic | Send to | Why |
|---|---|---|
| In-page push | Pre-lander | Some intent, but no brand knowledge |
| Classic push | Pre-lander | Low intent, needs a warm-up |
| Popunder | **Pre-lander, always** | Zero intent — a direct-to-signup popunder is money on fire |
| Native | Advertorial lander | Highest intent, tolerates long copy |
| Retargeting | Direct to signup | Already knows the brand |

### 5.2 Lander performance budget

The lander is where most of the loss happens, and it is almost always a speed problem before it is a
copy problem.

| Metric | Target | Why |
|---|---|---|
| LCP on 4G | < 1.8s | Every extra second above 2s costs roughly 10–20% of arrivals in tier-3 mobile |
| Total transfer | < 350 KB | Median LatAm mobile connection, often metered |
| Above-fold requests | ≤ 6 | Reduce round trips, inline critical CSS |
| Fonts | ≤ 1 family, `font-display: swap` | Never block first paint on a font |
| CLS | 0 | A shifting CTA is an unclicked CTA |
| Form fields above fold | ≤ 3 | Email, password, currency. Everything else post-registration |

### 5.3 Three lander archetypes

**A — Calculator lander** *(pair with Creative 1)*
Visitor enters their own monthly wager; the page computes what your rakeback returns in their own
currency, showing the arithmetic. Then, and only then, the signup form.
*Why it works:* the visitor has done the maths themselves before being asked for anything. Highest
reg→FTD of the three. Lowest raw conversion rate — that is fine and expected.

**B — Advertorial** *(pair with native)*
600–900 words, editorial layout, comparison table against 3 named competitors on the specific
dimensions you win (withdrawal time, wagering requirement, published rate). Ends in a single CTA.
*Why it works:* native traffic expects to read something. A hard-sell page breaks the format
contract and bounces.

**C — Speed/proof lander** *(pair with Creative 3, popunder + push)*
Above the fold: one claim, one proof artefact (last month's payout distribution chart), one form.
Nothing else. Under 200 KB.
*Why it works:* popunder attention is measured in seconds. One claim, one proof, one action.

### 5.4 Testing sequence — one variable at a time

1. **Headline** (biggest single lever, test first)
2. **Hero proof element** — chart vs. quote vs. licence mark
3. **CTA copy** — "Ver mi tasa" / "Crear cuenta" / "Empezar"
4. **Form length** — 3 fields vs. 2 + progressive
5. **Social proof placement** — above vs. below fold
6. **Currency display** — auto-detected local vs. USD

Minimum 400 sessions per variant before calling a winner. Below that you are reading noise.

### 5.5 Mandatory lander elements

Present on every lander, every geo, no exceptions — these are what compliance review checks:

- 18+ mark, visible above the fold
- Licence holder name, licence number, issuing authority
- Link to responsible-gambling page and to self-exclusion
- Link to full T&C and to the specific bonus T&C
- Local help-service link where one exists for the geo
- Cookie/consent notice appropriate to the geo
- **No countdown timer, no fake scarcity, no "3 people are viewing this"** — these fail compliance
  review at the better networks and they are precisely the mechanics that generate complaints

---

## 6. Tracking

```
Ad network  →  Tracker (Voluum / Binom / Keitaro)  →  Lander  →  Offer  →  Postback
                       │                                                      │
                       └──────────── click_id round-trip ─────────────────────┘
```

- Tracker click URL carries `{zoneid}`, `{campaignid}`, `{creativeid}`, `{country}`, `{os}`,
  `{devicetype}` as sub-parameters. Without zone-level data you cannot blocklist, and without
  blocklisting you cannot win on popunder or push.
- Registration and FTD both postback with the original `click_id`. Implementation:
  `../tech_integrations/tracking_and_postbacks.js`.
- Feed FTD conversions back to the network's own pixel so CPA-goal bidding can optimise. This is the
  single largest efficiency gain available in phase 3 — networks optimise on what you tell them, and
  if you only report registrations they will buy you registrations.

---

## 7. KPIs

| Metric | Discovery | Consolidation | Scale |
|---|---:|---:|---:|
| Cost per registration | ≤ $12 | ≤ $8 | ≤ $6 |
| Reg → FTD | ≥ 18% | ≥ 25% | ≥ 30% |
| Cost per FTD | ≤ $90 | ≤ $70 | ≤ $55 |
| D7 retention | ≥ 20% | ≥ 26% | ≥ 30% |
| 90-day ROAS | ≥ 0.7 | ≥ 1.2 | ≥ 1.8 |
| Fraud/blocked share | < 25% | < 12% | < 7% |

**90-day ROAS is the only one that decides anything.** Cost per FTD is a vanity metric if the cohort
never makes a second deposit — and in push and popunder traffic, that is the default outcome unless
you are actively filtering for it.

---

## 8. What this codebase would need

- [ ] Server-side click capture with `zoneid`/`campaignid` persisted to the player record
- [ ] Registration + FTD postbacks (see `../tech_integrations/tracking_and_postbacks.js`)
- [ ] Geo-blocklist at **registration**, not just CDN — an ad network will send blocked-geo traffic and you must not create the account
- [ ] Standalone lander app, deployed separately from the SPA. The current build serves an empty
      `<div id="app">` shell with no SSR (`docs/README.md`, defect 2) — that is a 3-second LCP on
      4G and it will not hold paid traffic
- [ ] Currency auto-detection at the lander from `ip_country`
- [ ] 18+/licence/RG footer block as a shared component across all landers
