<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import HistoryFilter from '@/components/account/HistoryFilter.vue'
import HistoryRows from '@/components/account/HistoryRows.vue'
import StatCard from '@/components/account/StatCard.vue'
import { betHistory, betProviders, type HistoryRow } from '@/data/account'
import { api } from '@/services/api'

const rows = ref<HistoryRow[]>([])
const loading = ref(true)
const filter = ref('All')

const visible = computed(() =>
  filter.value === 'All' ? rows.value : rows.value.filter((r) => r.tag === filter.value),
)

onMounted(async () => {
  rows.value = await api.getList(
    betHistory.map((b) => ({
      font: 'bet-history',
      title: b.match,
      sub: `${b.coupon} · ${b.time}`,
      ago: b.time,
      amount: b.payout,
      amountTone: (b.status === 'WON' ? 'in' : b.status === 'LOST' ? 'out' : 'neutral') as 'in' | 'out' | 'neutral',
      tag: b.status === 'WON' ? 'Won' : b.status === 'LOST' ? 'Lost' : 'Pending',
      details: [
        { label: 'Coupon', value: b.coupon },
        { label: 'Placed', value: b.time },
        { label: 'Payout', value: b.payout },
        { label: 'Status', value: b.status },
      ],
    })),
  )
  loading.value = false
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">History</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Bet History</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Results and winnings across all sportsbook providers.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Bets" value="4" icon="chart" tone="neutral" />
      <StatCard label="Won" value="+ $420" icon="trophy" tone="in" />
      <StatCard label="Lost" value="$20" icon="bolt" tone="out" />
      <StatCard label="Pending" value="1 · Live" icon="clock" tone="highlight" />
    </div>

    <div class="flex flex-wrap gap-2">
      <span v-for="p in betProviders" :key="p"
        class="rounded-full border border-border-gold/30 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {{ p }}
      </span>
    </div>

    <HistoryFilter v-model="filter" type-label="Status" :options="['All', 'Won', 'Lost', 'Pending']" />

    <AccountPanel>
      <HistoryRows :rows="visible" :loading="loading" />
    </AccountPanel>
  </div>
</template>
