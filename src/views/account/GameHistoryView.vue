<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import StatCard from '@/components/account/StatCard.vue'
import { gameHistory, gameTotals } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Activity</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Game History</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">A detailed record of every bet, win and refund.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Bet" :value="gameTotals.bet" icon="chart" />
      <StatCard label="Total Win" :value="gameTotals.win" icon="trophy" accent />
      <StatCard label="Total Refund" :value="gameTotals.refund" icon="vault" />
      <StatCard label="Net" :value="gameTotals.net" icon="percent" accent />
    </div>

    <AccountPanel>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[560px] text-left">
          <thead>
            <tr class="border-b border-white/8 font-sans text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              <th class="pb-3 font-semibold">Game</th>
              <th class="pb-3 font-semibold">Provider</th>
              <th class="pb-3 font-semibold">Date</th>
              <th class="pb-3 font-semibold">Type</th>
              <th class="pb-3 text-right font-semibold">Result</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="g in gameHistory" :key="g.game + g.date" class="transition-colors hover:bg-gold/[0.03]">
              <td class="py-4 font-sans text-[13px] font-semibold text-ink">{{ g.game }}</td>
              <td class="py-4 font-sans text-[12px] text-ink-muted">{{ g.provider }}</td>
              <td class="py-4 font-sans text-[12px] tabular-nums text-ink-dim">{{ g.date }}</td>
              <td class="py-4">
                <span class="rounded-full border px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
                  :class="g.positive ? 'border-border-gold text-gold-bright' : 'border-white/15 text-ink-dim'">{{ g.kind }}</span>
              </td>
              <td class="py-4 text-right font-sans text-[13px] font-bold tabular-nums" :class="g.positive ? 'text-gold-bright' : 'text-ink-muted'">{{ g.result }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AccountPanel>
  </div>
</template>
