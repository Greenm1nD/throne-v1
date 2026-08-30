<script setup lang="ts">
import { computed } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import HistoryFilter from '@/components/account/HistoryFilter.vue'
import StatCard from '@/components/account/StatCard.vue'
import { balances } from '@/data/account'
import { useProgression } from '@/composables/useProgression'
import { formatBp, formatTribute, totalReturnBp } from '@/data/progression'
import { formatMoney } from '@/utils/money'

const { rank } = useProgression()

/** The published rate for the member's rank — Standing Order + Weekly Purse. */
const rateBp = computed(() => (rank.value ? totalReturnBp(rank.value) : 0))
const rateLabel = computed(() => formatBp(rateBp.value))

// Demo weekly figures: tribute generated per week. The returned amount is
// COMPUTED from the ladder's rate — never typed by hand — so the table can
// only ever agree with the published arithmetic.
const weeks = [
  { week: 'Week of Jun 8', tribute: 320 },
  { week: 'Week of Jun 1', tribute: 410 },
  { week: 'Week of May 25', tribute: 226 },
  { week: 'Week of May 18', tribute: 601 },
]
const history = computed(() =>
  weeks.map((w) => ({
    ...w,
    back: `+ ${formatMoney((w.tribute * rateBp.value) / 10_000)}`,
  })),
)
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Rewards</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Cashback</h1>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <StatCard label="Accrued This Period" :value="balances.cashbackAvailable" icon="percent" accent />
      <StatCard label="Total Earned" :value="balances.cashbackTotal" icon="vault" />
      <StatCard :label="`${rank?.name} Rate`" :value="rateLabel" icon="crown" />
    </div>

    <AccountPanel title="How it works">
      <p class="font-sans text-[13px] leading-relaxed text-ink-dim">
        Cashback accrues automatically on every settled bet — nothing to claim, and it is
        withdrawable.
        <template v-if="rank">
          Your {{ rank.name }} rate is
          <span class="font-bold text-gold-bright">{{ rateLabel }}</span> of tribute — the Standing
          Order ({{ formatBp(rank.standingOrderBp) }}) plus the Weekly Purse
          ({{ formatBp(rank.weeklyPurseBp) }}). One tribute is one unit of house edge your play
          generates, never a share of what you wagered or lost.
        </template>
      </p>
    </AccountPanel>

    <HistoryFilter />

    <AccountPanel title="Weekly History">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[480px] text-left">
          <thead>
            <tr class="border-b border-border-gold/30 font-sans text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              <th class="pb-3 font-semibold">Period</th>
              <th class="pb-3 font-semibold">Tribute Generated</th>
              <th class="pb-3 font-semibold">Rate</th>
              <th class="pb-3 text-right font-semibold">Cashback</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-gold/20">
            <tr v-for="h in history" :key="h.week">
              <td class="py-3.5 font-sans text-[13px] text-ink">{{ h.week }}</td>
              <td class="py-3.5 font-sans text-[13px] tabular-nums text-ink-muted">{{ formatTribute(h.tribute) }}</td>
              <td class="py-3.5 font-sans text-[13px] tabular-nums text-ink-muted">{{ rateLabel }}</td>
              <td class="py-3.5 text-right font-sans text-[13px] font-bold tabular-nums text-gold-bright">{{ h.back }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AccountPanel>
  </div>
</template>
