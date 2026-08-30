import { computed, ref } from 'vue'
import {
  RANKS,
  bandProgressWithin,
  effectiveRank,
  formatMinor,
  nextRank,
  pendingGate,
  rankFor,
  tributeToNextWithin,
  type GateId,
  type Rank,
  type RankId,
} from '@/data/progression'

/**
 * The payload of `GET /api/progression/me` (spec §3.5).
 *
 * Every field is required except `gate` — but the widget must still survive a
 * partial response, so the optional markers here are deliberate: they force
 * every call site through the `has*` guards below rather than letting a missing
 * figure render as a confident zero.
 */
export interface Progression {
  rank: RankId
  rankFloor: number
  nextRank: RankId | null
  nextRankFloor: number | null
  lifetimeTribute: number
  rateBp: number
  standingOrder?: { balanceMinor: number; currency: string }
  sessionAccrual?: { minor: number }
  weeklyPurse?: { minor: number; paysAt: string }
  season?: { id: string; position: number; of: number; endsAt: string }
  gate: { needs: GateId; rank: RankId } | null
  restraint: { active: boolean }
}

const DAY = 86_400_000

/* ────────────────────────────────────────────────────────────────────────────
 * PROTOTYPE SEAM — the only place that fabricates progression data.
 *
 * There is no backend yet. When `GET /api/progression/me` exists, delete
 * `mockProgression()` and have `load()` fetch it; nothing else in this file or
 * in ProgressionWidget.vue changes. The figures below are the spec's own worked
 * example (§3.3: a Duke at 5,200 tribute reads 27%) so the number on screen is
 * traceable back to the document.
 * ──────────────────────────────────────────────────────────────────────────── */
function mockProgression(): Progression {
  const lifetimeTribute = 5_200
  const rank = rankFor(lifetimeTribute)
  const next = nextRank(rank)
  const now = Date.now()
  return {
    rank: rank.id,
    rankFloor: rank.floor,
    nextRank: next?.id ?? null,
    nextRankFloor: next?.floor ?? null,
    lifetimeTribute,
    rateBp: rank.standingOrderBp,
    standingOrder: { balanceMinor: 1_240, currency: 'USD' },
    sessionAccrual: { minor: 310 },
    weeklyPurse: { minor: 4_800, paysAt: new Date(now + 4 * DAY).toISOString() },
    season: { id: 's7', position: 4, of: 1_284, endsAt: new Date(now + 19 * DAY).toISOString() },
    gate: null,
    restraint: { active: false },
  }
}

// Module-level so every placement of the widget reads one state, not six.
const state = ref<Progression | null>(mockProgression())
/** Optimistic session accrual, in minor units. Overwritten by the server value. */
const live = ref(0)

export function useProgression() {
  const rank = computed<Rank | null>(() =>
    state.value ? effectiveRank(state.value.lifetimeTribute, satisfiedGates(state.value)) : null,
  )

  /** The rank the tribute earned, which may sit above `rank` behind a gate. */
  const earnedRank = computed<Rank | null>(() =>
    state.value ? rankFor(state.value.lifetimeTribute) : null,
  )

  const progress = computed(() =>
    state.value && rank.value ? bandProgressWithin(rank.value, state.value.lifetimeTribute) : 0,
  )

  const toNext = computed(() =>
    state.value && rank.value ? tributeToNextWithin(rank.value, state.value.lifetimeTribute) : 0,
  )

  const gate = computed(() =>
    state.value ? pendingGate(state.value.lifetimeTribute, satisfiedGates(state.value)) : null,
  )

  const currency = computed(() => state.value?.standingOrder?.currency ?? 'USD')

  /**
   * Fail closed (§3.5): a missing Standing Order hides the counter. A wrong
   * number here is worse than no number, so `null` means "render nothing".
   */
  const balanceMinor = computed<number | null>(() => {
    const so = state.value?.standingOrder
    return so ? so.balanceMinor + live.value : null
  })

  const balanceLabel = computed(() =>
    balanceMinor.value === null ? null : formatMinor(balanceMinor.value, currency.value),
  )

  const weeklyPurseLabel = computed(() => {
    const wp = state.value?.weeklyPurse
    return wp ? formatMinor(wp.minor, currency.value) : null
  })

  /**
   * §4.3 — the counter moves on SETTLED BETS, never on a timer. A timer would
   * be a fabrication, and this brand's whole claim is that its arithmetic is
   * real. This is the socket handler's entry point; nothing else may move it.
   */
  function settle(creditMinor: number) {
    // Never animate downward on a correction — snap, so a player never watches
    // money appear and drain.
    live.value = creditMinor < 0 ? 0 : live.value + creditMinor
  }

  return {
    state,
    rank,
    earnedRank,
    progress,
    toNext,
    gate,
    currency,
    balanceMinor,
    balanceLabel,
    weeklyPurseLabel,
    settle,
    ranks: RANKS,
  }
}

function satisfiedGates(p: Progression): GateId[] {
  // The payload names only the OUTSTANDING gate; everything below it is cleared.
  const all: GateId[] = ['first_deposit', 'source_of_funds', 'affordability_review', 'invitation']
  if (!p.gate) return all
  const blockedIdx = RANKS.findIndex((r) => r.id === p.gate!.rank)
  return RANKS.slice(0, blockedIdx)
    .map((r) => r.gate)
    .filter((g): g is GateId => g !== null)
}
