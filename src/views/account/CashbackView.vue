<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import StatCard from '@/components/account/StatCard.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { balances, user } from '@/data/account'

const history = [
  { week: 'Week of May 20', wagered: '€4,820', rate: '15%', back: '+ €72.30' },
  { week: 'Week of May 13', wagered: '€6,150', rate: '15%', back: '+ €92.25' },
  { week: 'Week of May 6', wagered: '€3,400', rate: '15%', back: '+ €51.00' },
  { week: 'Week of Apr 29', wagered: '€9,010', rate: '15%', back: '+ €135.15' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Rewards</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Cashback</h1>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <StatCard label="Available Cashback" :value="balances.cashbackAvailable" icon="percent" accent />
      <StatCard label="Total Earned" :value="balances.cashbackTotal" icon="vault" />
      <StatCard :label="`${user.tier} Rate`" value="15%" icon="crown" />
    </div>

    <AccountPanel title="Claim">
      <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="font-sans text-[13px] text-ink-dim">
          <span class="font-bold tabular-nums text-gold-bright">{{ balances.cashbackAvailable }}</span> awaits in the royal vault — claimed cashback carries no wagering requirements.
        </p>
        <GoldButton variant="solid" size="md">Claim to Main Wallet</GoldButton>
      </div>
    </AccountPanel>

    <AccountPanel title="Weekly History">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[480px] text-left">
          <thead>
            <tr class="border-b border-white/8 font-sans text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              <th class="pb-3 font-semibold">Period</th>
              <th class="pb-3 font-semibold">Wagered</th>
              <th class="pb-3 font-semibold">Rate</th>
              <th class="pb-3 text-right font-semibold">Cashback</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="h in history" :key="h.week">
              <td class="py-3.5 font-sans text-[13px] text-ink">{{ h.week }}</td>
              <td class="py-3.5 font-sans text-[13px] tabular-nums text-ink-muted">{{ h.wagered }}</td>
              <td class="py-3.5 font-sans text-[13px] tabular-nums text-ink-muted">{{ h.rate }}</td>
              <td class="py-3.5 text-right font-sans text-[13px] font-bold tabular-nums text-gold-bright">{{ h.back }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AccountPanel>
  </div>
</template>
