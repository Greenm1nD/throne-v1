# THRONE — progression system, technical specification

How a player accumulates standing, what the server owes them for it, and how the interface shows
it. Written 27 Aug 2026. This replaces everything currently in `src/data/vipLevels.ts`,
`src/data/pages.ts` (the `vipPage.tiers` and `rewardsPage.summary` blocks) and the hardcoded perk
array in `src/views/account/VipProgressView.vue`.

---

## 0. Why the rewrite

There is no progression system in the product today. There are **five incompatible scoring
scales**, none of which converts into any other, and a logged-in member can watch three of them
disagree in one session:

| # | Where | Unit | What it says |
|---|---|---|---|
| 1 | `src/data/vipLevels.ts` | XP | Six ranks. Noble 0 / Baron 2,500 / Duke 7,500 / Crown 15,000 / Sovereign 30,000 / Monarch 60,000 |
| 2 | `src/data/pages.ts` → `vipPage.tiers` | XP | Five ranks, ~10× larger bands. No Monarch |
| 3 | `src/data/pages.ts` → `rewardsPage.summary` | XP | A third position: Duke at 32,450 |
| 4 | `src/data/pages.ts` → `rewardsPage.redeem` | pts | Items at 60,000–250,000 |
| 5 | `src/data/pages.ts` → `kingdomPage` | crowns | Season 388,600–1,284,500 |

Three progress bars compute it three ways — the home rail reads 50%, the account page 41%, the
Rewards page 65% — because each view does its own arithmetic on its own data with no shared
helper. `account.ts` promises "Every wager earns XP toward the next tier"; the earn rate appears
nowhere in the repository.

**The underlying defect:** a tier ladder is not a marketing asset, it is a liability schedule
priced against theoretical margin. Rank names, reward copy and a prize pool were published
without an earn rate, a funding base or a cost. That is why they contradict each other.

---

## 1. The two units

Everything else — XP, pts — is deleted.

### TRIBUTE — permanent, sets rank

```
tribute = wager_amount × house_edge_of_that_game
```

1 tribute = €1 of theoretical margin. Denominated in the account currency, stored in minor units.

**Why this basis and not the alternatives.**

- *Deposit-based* is gameable (deposit, withdraw, redeposit) and, worse, it says out loud "we pay
  you for funding the account" — the worst sentence to hand a payment processor or an affiliate
  compliance team.
- *Net-loss-based* aligns cost to revenue perfectly and is flatly indefensible: it pays people for
  losing, which is a direct financial incentive to chase. Almost every "get X% of your losses
  back" offer in this market is exactly this.
- *Raw-wager-based* is what Stake and Shuffle publish. Simple and transparent, but arbitrageable
  and it prices the wrong thing: €1,000,000 wagered on a 1%-edge original generates €10,000 of
  margin, while €80,000 on an 8%-hold sportsbook generates €6,400. The first player did 12× the
  turnover for 1.5× the margin. Under a flat wager ladder the first player outranks the second on
  a fraction of the contribution.

Tribute prices the only thing that actually funds the rewards.

**Consequence you must accept:** low-edge games earn slowly. A player grinding 1%-edge originals
climbs at a quarter the rate of a slots player. That is correct and must be stated on the tier
page, not buried — the whole proposition is that the arithmetic is published.

### CROWNS — seasonal, sets standing

Reset every 28 days. Drive the leaderboard, the season pool and the weekly writs. They buy
nothing and never convert to money, so they can never become a second currency.

```
crowns = tribute × season_multiplier
```

`season_multiplier` defaults to 1 and is the only lever for a themed season. Never set it per
player.

---

## 2. The ladder

| Rank | enum | ქართული | Tribute floor | Standing Order | Weekly Purse | Total return | Extra gate |
|---|---|---|---:|---:|---:|---:|---|
| Noble | `noble` | აზნაური | 0 | 3% | — | 3% | first verified deposit |
| Baron | `baron` | ბატონი | 500 | 5% | 2% | 7% | — |
| Duke | `duke` | თავადი | 2,500 | 8% | 3% | 11% | — |
| Crown | `crown` | ერისთავი | 12,500 | 11% | 4% | 15% | verified source of funds |
| Sovereign | `sovereign` | მთავარი | 50,000 | 14% | 5% | 19% | quarterly affordability review |
| Monarch | `monarch` | მეფე | 250,000 | 16% | 6% | 22% | invitation + monthly review |

The `enum` column is the wire format and is **never localised** — the backend sends `duke`
whatever the interface language is, and the display name is looked up client-side. That is what
keeps a member's rank stable when they switch language. The Georgian names are the authentic
feudal hierarchy, not transliterations; the decision and its two consequences are recorded on the
Typography page of Figma file `QwGj75fYTQjZM6s8xdNPoI`.

Two i18n traps that already bit once, when the Georgian file was renamed:

- **`გვირგვინი` is not one word.** It is the rank Crown, *and* the seasonal currency `crowns`,
  *and* the crown emblem drawn during the tier-up ceremony, *and* the institutional "the Crown's
  Accounts". Only the first became `ერისთავი`. Any key named after the English word `crown` must
  be split into `rank.crown`, `unit.crowns`, `icon.crown` and `page.crownsAccounts` before a
  translator ever sees it.
- **`მთავარი` (Sovereign) is also the ordinary Georgian adjective "main".** The home page is
  therefore `საწყისი გვერდი` in Georgian copy. A rank name that collides with a common adjective
  has to win, and the adjective moves.

Every percentage is **of tribute**, i.e. of the theoretical margin that player generated — never
of wager and never of losses. The whole programme costs 19–21% of GGR, hard-capped at 24%.

Sub-rungs (Baron I–V etc.) exist for pacing and carry a small no-wagering-requirement cash grant
at each step. They do not change the rate.

### Rank never decays

Not for inactivity, not for withdrawing, not for winning, not for taking a break. It is the
most-cited feature of programmes that actually retain, it costs nothing (a dormant member costs
nothing to keep on a list), and for this brand it is the proposition rather than a policy.

What *can* pause is servicing. After 90 days with no wager the account enters rank hold: the host
relationship pauses, the rank and tribute do not.

---

## 3. Backend

### 3.1 The ledger is the source of truth

One append-only table. Rank, balance and progress are all **derived** from it, never stored as
the authority.

```sql
CREATE TABLE tribute_ledger (
  bet_id          TEXT PRIMARY KEY,        -- provider's id; the idempotency key
  user_id         UUID NOT NULL,
  game_id         TEXT NOT NULL,
  vertical        TEXT NOT NULL,           -- casino | live | sports | poker | virtual
  wager_minor     BIGINT NOT NULL,         -- minor units, never float
  house_edge_bp   INTEGER NOT NULL,        -- basis points, snapshotted at settlement
  tribute_minor   BIGINT NOT NULL,         -- wager_minor * house_edge_bp / 10000
  rate_bp         INTEGER NOT NULL,        -- the rank's Standing Order rate AT settlement
  credit_minor    BIGINT NOT NULL,         -- tribute_minor * rate_bp / 10000
  season_id       TEXT NOT NULL,
  settled_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON tribute_ledger (user_id, settled_at DESC);
CREATE INDEX ON tribute_ledger (season_id, user_id);
```

Four rules that are not negotiable:

1. **`bet_id` is the primary key.** Providers retry webhooks. Without this you pay twice.
2. **`house_edge_bp` and `rate_bp` are snapshotted at settlement**, never joined at read time. If
   you change a rate next quarter, history must not silently rewrite itself.
3. **Integer minor units everywhere.** No floats touch money.
4. **Append-only.** A correction is a compensating row with a negative amount and a reference,
   never an `UPDATE`.

### 3.2 Where the events come from

The game aggregator posts a settlement webhook per bet. The handler:

```
POST /webhooks/settlement
  ├── verify signature (HMAC, provider secret, reject on skew > 5 min)
  ├── INSERT ... ON CONFLICT (bet_id) DO NOTHING     ← idempotent
  ├── if inserted:
  │     ├── compute tribute + credit
  │     ├── credit the withdrawable Standing Order balance (a second ledger)
  │     ├── recompute lifetime tribute and rank
  │     └── if rank changed → emit rank.promoted
  └── publish user.progress to the socket channel for that user
```

Return 200 fast. Do the arithmetic in the transaction; do the socket publish after commit.

### 3.3 Rank is a pure function

```ts
// One implementation. Server and client import the same file.
export function rankFor(lifetimeTribute: number): Rank {
  // walk the floors descending, return the first the player has passed
}

export function bandProgress(lifetimeTribute: number): number {
  const rank = rankFor(lifetimeTribute)
  const next = nextRank(rank)
  if (!next) return 1                                   // Monarch: the band has no ceiling
  const span = next.floor - rank.floor
  return clamp((lifetimeTribute - rank.floor) / span, 0, 1)
}
```

**Band-relative, never ladder-relative.** The meter answers "how far to the next rank", not "how
far up the ladder am I". A Duke at 5,200 tribute is `(5200 − 2500) / (12500 − 2500)` = **27%** —
not 42% of the way to Monarch, which is true but useless.

Cache the derived rank on the user row as a denormalised column for query speed, but treat the
ledger sum as the authority and reconcile nightly.

### 3.4 The gated ranks

Crown, Sovereign and Monarch have a non-tribute condition. Model it explicitly:

```
rank_effective = min(rank_by_tribute, highest_rank_whose_gate_is_satisfied)
```

A player who crosses 12,500 tribute without a completed source-of-funds check sits at Duke's rate
and sees "Crown is waiting on one document" — never a silent stall. This is the one place where
the compliance requirement and the aspirational mechanic are the same thing, and the interface
should say so.

### 3.5 The API the widget needs

```
GET /api/progression/me → {
  rank:              "duke",
  rankFloor:         2500,          // tribute
  nextRank:          "crown",
  nextRankFloor:     12500,
  lifetimeTribute:   5200,
  rateBp:            800,           // 8.00%
  standingOrder:     { balanceMinor: 1240, currency: "EUR" },
  sessionAccrual:    { minor: 310 },
  weeklyPurse:       { minor: 4800, paysAt: "2026-08-31T00:00:00Z" },
  season:            { id: "s7", position: 4, of: 1284, endsAt: "..." },
  gate:              null,          // or { needs: "source_of_funds", rank: "crown" }
  restraint:         { active: false }
}
```

Every field is required except `gate`. The widget's missing-value behaviour is specified per
field on the States & Logic page of the Figma file — the short version is **fail closed**: if
`standingOrder` is absent, hide the counter rather than render a zero, because a wrong number
here is worse than no number.

### 3.6 The monthly statement

The Crown's Accounts is a query over the ledger, not a separate store:

```sql
SELECT
  SUM(wager_minor)   AS wagered,
  SUM(tribute_minor) AS margin_generated,
  SUM(credit_minor)  AS returned_to_you
FROM tribute_ledger
WHERE user_id = $1 AND settled_at >= $2 AND settled_at < $3;
```

Payout is not in the ledger — join the wallet ledger for it. Render to a signed PDF, store it,
and keep it permanently: a statement that disappears is worse than one never sent.

---

## 4. Frontend

### 4.1 One component, six placements

`ProgressionWidget` with `Placement = Hero | Page | Card | Bar | Sheet | Pill`. It replaces the
three views that each draw their own ladder today:

| Replaces | Current defect |
|---|---|
| `src/components/home/KingdomStatus.vue` | absolute progress off `vipLevels.playerStatus` → 50% |
| `src/views/account/DashboardView.vue` | its own rail, a third data object |
| `src/views/account/VipProgressView.vue` | band-relative off `account.ts` → 41%, plus a hardcoded perk table |

Also: `VipProgressView.vue:8` does `vipLevels.findIndex(...)` and immediately indexes the result
with no `-1` guard. No shipped tier string triggers it today, but it fires the moment a rank is
renamed — which this rewrite does. Guard it.

### 4.2 One composable, no view arithmetic

```ts
// src/composables/useProgression.ts
export function useProgression() {
  const state = ref<Progression | null>(null)   // from GET /api/progression/me
  const live  = ref(0)                          // optimistic session accrual

  const rank      = computed(() => state.value && rankFor(state.value.lifetimeTribute))
  const progress  = computed(() => state.value ? bandProgress(state.value.lifetimeTribute) : 0)
  const balance   = computed(() => (state.value?.standingOrder.balanceMinor ?? 0) + live.value)

  return { state, rank, progress, balance, /* … */ }
}
```

No view computes progress. If a second implementation ever appears, the bug in §0 comes back.

### 4.3 The live counter

The Standing Order figure moves on **settled bets**, never on a timer. A timer would be a
fabrication, and this brand's whole claim is that its arithmetic is real.

```
bet settles server-side        t=0
socket event lands             t≈140ms
number rolls to new value      350ms, cubic-bezier(0.22, 1, 0.36, 1)
glow pulses                    700ms
at rest                        t≈840ms
```

Optimistic increment is allowed while a bet is in flight, but the socket value is authoritative
and overwrites it. Never animate downward on a correction — snap, so a player never watches money
appear and drain.

### 4.4 What must never happen in this widget

These are design constraints, not legal footnotes. They are also what makes the scheme defensible.

- **No countdown, anywhere.** Not on a reward, a quest or a tier. The Daily Audience is claimable
  across seven days precisely so there is never a reason to come back today rather than Thursday.
- **No "you're so close" prompt.** The bar shows position. It never editorialises and it never
  appears in a notification.
- **No streak that breaks.** A counter that resets on a missed day is a punishment mechanic
  dressed as a game.
- **No claim button on rakeback.** It accrues and is withdrawable. The absence of the button is
  the product — Roobet's 30-minute claim stack performs better and is exactly why Roobet cannot
  be premium.
- **Limits live in the widget.** The Writ of Restraint sits in the same panel as the rewards, two
  clicks away, at every placement — not buried in settings.

### 4.5 Reduced motion

Every animation above has a reduced-motion path, and the rank-up sequence is deliberately
*longer* when reduced rather than skipped: the moment still has to feel like an investiture.
`prefers-reduced-motion` is already respected across this codebase; keep it.

---

## 5. Build order

1. `rankFor` / `bandProgress` as one shared module, with tests. Everything else depends on it.
2. The ledger table and the settlement webhook, idempotent, with a replay test.
3. `GET /api/progression/me`.
4. `useProgression` + `ProgressionWidget` at `Placement=Card`, wired to the real endpoint.
5. Delete `vipLevels.ts`, the `vipPage.tiers` block, `rewardsPage.summary`, and the hardcoded perk
   array. Repoint the three views at the widget.
6. Socket channel and the live counter.
7. The Weekly Purse job and the monthly statement.

Steps 1 and 5 are the ones that stop the contradiction from coming back. Do not defer step 5 —
leaving the old scales in place next to the new one recreates the exact defect this replaces.
