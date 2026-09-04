/**
 * THRONE progression — the single source of truth for rank.
 *
 * This module replaces the five mutually-contradictory scoring scales that used
 * to live in `vipLevels.ts`, `pages.ts → vipPage.tiers`, `pages.ts →
 * rewardsPage.summary` and the hardcoded perk array in `VipProgressView.vue`.
 * Nothing else in the app may compute rank or progress: import from here.
 *
 * UNITS — the one trap in this file.
 *   • TRIBUTE is carried in MAJOR units (whole currency). The ladder floors and
 *     `lifetimeTribute` are tribute, so they are directly comparable.
 *   • MONEY is carried in MINOR units (cents) and every such field is suffixed
 *     `Minor`. Never add a `Minor` value to a tribute value.
 *   • RATES are basis points. 800bp = 8.00%.
 */

export type RankId = 'noble' | 'baron' | 'duke' | 'crown' | 'sovereign' | 'monarch'

/** Non-tribute conditions that hold a player below the rank their tribute earned. */
export type GateId = 'first_deposit' | 'source_of_funds' | 'affordability_review' | 'invitation'

export interface Rank {
  id: RankId
  name: string
  /** Lifetime tribute (major units) at which this rank begins. */
  floor: number
  /** Standing Order — continuous, withdrawable, as a share of tribute. */
  standingOrderBp: number
  /** Weekly Purse — paid weekly, as a share of tribute. 0 at Noble. */
  weeklyPurseBp: number
  gate: GateId | null
  /** Player-facing name for the gate, or null when there is none. */
  gateLabel: string | null
  crown: string
  /** Grounded in the ladder, not marketing copy. Rendered on every tier card. */
  perks: string[]
}

/**
 * The ladder. Every percentage is of TRIBUTE — the theoretical margin the
 * player generated — never of wager and never of losses.
 */
export const RANKS: Rank[] = [
  {
    id: 'noble',
    name: 'Noble',
    floor: 0,
    standingOrderBp: 300,
    weeklyPurseBp: 0,
    gate: 'first_deposit',
    gateLabel: 'First verified deposit',
    crown: '/assets/images/crown-noble.png',
    perks: ['Daily Audience, claimable across seven days', 'Rank never decays'],
  },
  {
    id: 'baron',
    name: 'Baron',
    floor: 500,
    standingOrderBp: 500,
    weeklyPurseBp: 200,
    gate: null,
    gateLabel: null,
    crown: '/assets/images/crown-baron.png',
    perks: ['Weekly Purse begins', 'The Crown’s Accounts, monthly'],
  },
  {
    id: 'duke',
    name: 'Duke',
    floor: 2_500,
    standingOrderBp: 800,
    weeklyPurseBp: 300,
    gate: null,
    gateLabel: null,
    crown: '/assets/images/crown-duke.png',
    perks: ['Priority withdrawals', 'Seasonal writs'],
  },
  {
    id: 'crown',
    name: 'Crown',
    floor: 12_500,
    standingOrderBp: 1_100,
    weeklyPurseBp: 400,
    gate: 'source_of_funds',
    gateLabel: 'Verified source of funds',
    crown: '/assets/images/crown-crown.png',
    perks: ['A named host', 'Private tables'],
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    floor: 50_000,
    standingOrderBp: 1_400,
    weeklyPurseBp: 500,
    gate: 'affordability_review',
    gateLabel: 'Quarterly affordability review',
    crown: '/assets/images/crown-sovereign.png',
    perks: ['Tailored limits', 'Invitation-only events'],
  },
  {
    id: 'monarch',
    name: 'Monarch',
    floor: 250_000,
    standingOrderBp: 1_600,
    weeklyPurseBp: 600,
    gate: 'invitation',
    gateLabel: 'Invitation and monthly review',
    crown: '/assets/images/crown-monarch.png',
    perks: ['The kingdom itself', 'Monthly review with your host'],
  },
]

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/** The rank a given lifetime tribute has earned. Never returns undefined. */
export function rankFor(lifetimeTribute: number): Rank {
  const t = Number.isFinite(lifetimeTribute) ? Math.max(0, lifetimeTribute) : 0
  // Walk the floors descending and return the first the player has passed.
  for (let i = RANKS.length - 1; i >= 0; i--) if (t >= RANKS[i].floor) return RANKS[i]
  return RANKS[0]
}

/** The rank above `rank`, or null at Monarch. */
export function nextRank(rank: Rank): Rank | null {
  return RANKS[RANKS.findIndex((r) => r.id === rank.id) + 1] ?? null
}

/**
 * Progress through the CURRENT band, 0–1. Band-relative, never ladder-relative:
 * the meter answers "how far to the next rank", not "how far up the ladder".
 * Monarch has no ceiling, so it reads full.
 */
export function bandProgress(lifetimeTribute: number): number {
  return bandProgressWithin(rankFor(lifetimeTribute), lifetimeTribute)
}

/**
 * Progress through a NAMED rank's band. Needed because a gated player sits at a
 * rank below the one their tribute earned: the meter must measure the band they
 * are shown as occupying, not the one their tribute reached. Reads full when the
 * tribute has already cleared the band — the work is done, a document is not.
 */
export function bandProgressWithin(rank: Rank, lifetimeTribute: number): number {
  const next = nextRank(rank)
  if (!next) return 1
  const span = next.floor - rank.floor
  return clamp((Math.max(0, lifetimeTribute) - rank.floor) / span, 0, 1)
}

/** Tribute still owed to reach the next rank. 0 at Monarch. */
export function tributeToNext(lifetimeTribute: number): number {
  return tributeToNextWithin(rankFor(lifetimeTribute), lifetimeTribute)
}

/** Tribute owed to leave a NAMED rank's band. 0 once cleared, or at Monarch. */
export function tributeToNextWithin(rank: Rank, lifetimeTribute: number): number {
  const next = nextRank(rank)
  return next ? Math.max(0, next.floor - Math.max(0, lifetimeTribute)) : 0
}

/** Look a rank up by id — for payloads that name the rank rather than send tribute. */
export function rankById(id: string): Rank | null {
  return RANKS.find((r) => r.id === id) ?? null
}

/** Standing Order + Weekly Purse, in basis points. */
export function totalReturnBp(rank: Rank): number {
  return rank.standingOrderBp + rank.weeklyPurseBp
}

/**
 * §3.4 — a rank is only effective once its gate is satisfied:
 *   rank_effective = min(rank_by_tribute, highest rank whose gate is satisfied)
 * A player past 12,500 tribute with no source-of-funds check sits at Duke's rate
 * and is told which document is outstanding — never a silent stall.
 */
export function effectiveRank(lifetimeTribute: number, satisfiedGates: GateId[]): Rank {
  const earned = rankFor(lifetimeTribute)
  const earnedIdx = RANKS.findIndex((r) => r.id === earned.id)
  for (let i = earnedIdx; i >= 0; i--) {
    const g = RANKS[i].gate
    if (!g || satisfiedGates.includes(g)) return RANKS[i]
  }
  return RANKS[0]
}

/** The gate blocking the next rank, or null when nothing is outstanding. */
export function pendingGate(
  lifetimeTribute: number,
  satisfiedGates: GateId[],
): { rank: Rank; needs: GateId; label: string } | null {
  const earned = rankFor(lifetimeTribute)
  const effective = effectiveRank(lifetimeTribute, satisfiedGates)
  if (effective.id === earned.id) return null
  const blocked = RANKS[RANKS.findIndex((r) => r.id === effective.id) + 1]
  return blocked?.gate ? { rank: blocked, needs: blocked.gate, label: blocked.gateLabel! } : null
}

/* ── Formatting ──────────────────────────────────────────────────────────── */

export const formatBp = (bp: number) => `${(bp / 100).toFixed(bp % 100 === 0 ? 0 : 2)}%`

export const formatTribute = (t: number) => Math.round(t).toLocaleString()

/** Minor units → display string. Money only — never pass tribute here. */
export function formatMinor(minor: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(minor / 100)
}

/** The tribute band a rank covers, for tier cards: "2,500 – 12,499". */
export function bandLabel(rank: Rank): string {
  const next = nextRank(rank)
  return next
    ? `${formatTribute(rank.floor)} – ${formatTribute(next.floor - 1)} tribute`
    : `${formatTribute(rank.floor)}+ tribute`
}
