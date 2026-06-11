<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import HistoryRows from '@/components/account/HistoryRows.vue'
import StatCard from '@/components/account/StatCard.vue'
import { gameHistory, gameTotals, type HistoryRow } from '@/data/account'
import { api } from '@/services/api'

const rows = ref<HistoryRow[]>([])
const loading = ref(true)

onMounted(async () => {
  rows.value = await api.getList(
    gameHistory.map((g) => ({
      font: 'session-history',
      title: g.game,
      sub: `${g.provider} · ${g.date}`,
      amount: g.result,
      amountTone: (g.positive ? 'in' : 'out') as 'in' | 'out',
      details: [
        { label: 'Game', value: g.game },
        { label: 'Provider', value: g.provider },
        { label: 'Date', value: g.date },
        { label: 'Type', value: g.kind },
        { label: 'Result', value: g.result },
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
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Game History</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">A detailed record of every bet, win and refund.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Bet" :value="gameTotals.bet" icon="chart" tone="neutral" />
      <StatCard label="Total Win" :value="gameTotals.win" icon="trophy" tone="in" />
      <StatCard label="Total Refund" :value="gameTotals.refund" icon="vault" tone="neutral" />
      <StatCard label="Net" :value="gameTotals.net" icon="percent" tone="highlight" />
    </div>

    <AccountPanel>
      <HistoryRows :rows="rows" :loading="loading" />
    </AccountPanel>
  </div>
</template>
