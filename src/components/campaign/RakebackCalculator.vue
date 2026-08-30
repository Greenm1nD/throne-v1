<script setup lang="ts">
/**
 * RakebackCalculator — the campaign layer's one visual proof.
 *
 * The visitor enters their own monthly wager and a house edge; the component
 * runs those inputs through the progression ladder (src/data/progression.ts,
 * the single source of truth) and writes the arithmetic out in full. Results
 * are written directly — no count-up, no timers, no animation on money.
 */
import { computed, ref } from 'vue'
import {
  RANKS,
  formatBp,
  formatMinor,
  formatTribute,
  totalReturnBp,
  type Rank,
  type RankId,
} from '@/data/progression'

const props = defineProps<{
  defaults: { monthlyWager: number; houseEdgePct: number }
}>()

/** House-edge choices offered, in percent of wager. */
const EDGES = [2, 3, 4, 5, 6, 7, 8]

const monthlyWager = ref(props.defaults.monthlyWager)
const houseEdgePct = ref(
  EDGES.includes(props.defaults.houseEdgePct) ? props.defaults.houseEdgePct : 4,
)
const selectedRankId = ref<RankId>('duke')

const wager = computed(() => Math.max(0, Number(monthlyWager.value) || 0))

/** Tribute = wager × house edge — major units, the same basis as the ladder floors. */
const tribute = computed(() => (wager.value * houseEdgePct.value) / 100)

const selectedRank = computed<Rank>(
  () => RANKS.find((r) => r.id === selectedRankId.value) ?? RANKS[0],
)
const selectedRankNo = computed(
  () => RANKS.findIndex((r) => r.id === selectedRank.value.id) + 1,
)

/** Money returned per month at a rank's total rate, formatted. Minor-unit math. */
const backLabel = (rank: Rank) =>
  formatMinor(Math.round((tribute.value * totalReturnBp(rank)) / 100), 'USD')

const usd0 = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
</script>

<template>
  <section class="rounded-2xl border border-border-gold/40 bg-card p-5 shadow-card-glow sm:p-7">
    <h2 class="font-display text-lg font-semibold uppercase tracking-[0.16em] text-champagne">
      Rakeback Calculator
    </h2>
    <p class="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
      Tribute is the house's expected margin on your play — wager × house edge. Each rank returns a
      published share of it: the Standing Order (continuous cashback) plus the Weekly Purse (a
      weekly payout).
    </p>

    <!-- Monthly wager -->
    <div class="mt-6">
      <div class="flex items-end justify-between gap-3">
        <label
          for="rc-wager"
          class="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted"
        >
          Monthly wager
        </label>
        <input
          id="rc-wager"
          v-model.number="monthlyWager"
          type="number"
          min="0"
          max="100000"
          step="100"
          inputmode="numeric"
          class="h-11 w-32 rounded-lg border border-border-gold/40 bg-surface px-3 text-right font-sans text-sm text-ink focus:border-gold focus:outline-none"
        />
      </div>
      <input
        v-model.number="monthlyWager"
        type="range"
        min="100"
        max="20000"
        step="100"
        aria-label="Monthly wager"
        class="mt-2 h-11 w-full cursor-pointer accent-gold"
      />
    </div>

    <!-- House edge -->
    <div class="mt-4">
      <label
        for="rc-edge"
        class="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted"
      >
        House edge
      </label>
      <select
        id="rc-edge"
        v-model.number="houseEdgePct"
        class="mt-2 h-11 w-full rounded-lg border border-border-gold/40 bg-surface px-3 font-sans text-sm text-ink focus:border-gold focus:outline-none"
      >
        <option v-for="e in EDGES" :key="e" :value="e">{{ e }}% of wagers</option>
      </select>
      <p class="mt-1 font-sans text-[11px] leading-relaxed text-ink-dim">
        The average share of each wager the house keeps over time. Low-edge tables sit near 2%;
        most slots sit near 4–8%.
      </p>
    </div>

    <!-- The arithmetic, written out -->
    <div class="mt-6 rounded-xl border border-border-gold/30 bg-gold/[0.05] px-4 py-4">
      <p class="font-sans text-sm font-semibold leading-relaxed text-ink">
        {{ usd0(wager) }} × {{ houseEdgePct }}% = {{ formatTribute(tribute) }} tribute →
        {{ backLabel(selectedRank) }} back per month at {{ selectedRank.name }} — rank
        {{ selectedRankNo }} of {{ RANKS.length }}
      </p>
      <p class="mt-1 font-sans text-[11px] text-ink-dim">
        {{ selectedRank.name }} pays {{ formatBp(totalReturnBp(selectedRank)) }} of tribute and
        begins at {{ formatTribute(selectedRank.floor) }} lifetime tribute.
      </p>
    </div>

    <!-- The full ladder — tap a rank to re-run the line above at its rate -->
    <ul class="mt-5 divide-y divide-border-gold/15">
      <li v-for="(r, i) in RANKS" :key="r.id">
        <button
          type="button"
          class="flex min-h-[44px] w-full items-center justify-between gap-3 px-1 py-2 text-left transition-colors duration-swift"
          :class="r.id === selectedRank.id ? 'text-gold-bright' : 'text-ink-muted hover:text-ink'"
          :aria-pressed="r.id === selectedRank.id"
          @click="selectedRankId = r.id"
        >
          <span class="font-sans text-sm">
            {{ r.name }} <span class="text-ink-dim">— rank {{ i + 1 }} of {{ RANKS.length }}</span>
          </span>
          <span class="font-sans text-sm tabular-nums">
            {{ formatBp(totalReturnBp(r)) }} · {{ backLabel(r) }}/mo
          </span>
        </button>
      </li>
    </ul>
    <p class="mt-2 font-sans text-[11px] leading-relaxed text-ink-dim">
      Tap a rank to run the line above at its rate. Ranks are earned by lifetime tribute, never
      bought. These figures are your own inputs run through the published ladder — not a projection
      of your results.
    </p>
  </section>
</template>
