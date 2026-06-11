<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import StatCard from '@/components/account/StatCard.vue'
import { bonuses, bonusTotals } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Rewards</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Bonuses</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Track active, pending and completed bonuses.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <StatCard label="Active Bonuses" :value="String(bonusTotals.active)" icon="star" accent />
      <StatCard label="Total Received" :value="bonusTotals.totalReceived" icon="gift" accent />
      <StatCard label="Active Balance" :value="bonusTotals.activeBalance" icon="vault" />
    </div>

    <AccountPanel>
      <ul class="divide-y divide-white/5">
        <li v-for="b in bonuses" :key="b.name + b.date" class="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-display text-[14px] font-semibold tracking-[0.08em] text-ink">{{ b.name }}</p>
            <p class="mt-0.5 font-sans text-[11px] tabular-nums text-ink-dim">{{ b.date }}</p>
          </div>
          <div class="flex items-center gap-3">
            <p class="font-sans text-[14px] font-bold tabular-nums text-gold-bright">{{ b.amount }}</p>
            <span class="rounded-full border px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
              :class="b.status === 'Active' ? 'border-border-gold text-gold-bright' : 'border-white/15 text-ink-dim'">
              {{ b.status }}
            </span>
          </div>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
