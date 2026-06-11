<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import { betHistory, betProviders } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Activity</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Bet History</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Results and winnings across all sportsbook providers.</p>
    </div>

    <div class="flex flex-wrap gap-2">
      <span v-for="p in betProviders" :key="p"
        class="rounded-full border border-white/10 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {{ p }}
      </span>
    </div>

    <AccountPanel>
      <ul class="space-y-4">
        <li v-for="b in betHistory" :key="b.coupon" class="rounded-xl border border-white/8 bg-black/30 p-5 transition-colors hover:border-border-gold/70">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="font-display text-[14px] font-semibold tracking-[0.06em] text-ink">{{ b.match }}</p>
              <p class="mt-1 font-sans text-[12px] tabular-nums text-ink-dim">{{ b.coupon }} · {{ b.time }}</p>
            </div>
            <div class="flex items-center gap-3">
              <p class="font-sans text-[14px] font-bold tabular-nums" :class="b.status === 'WON' ? 'text-gold-bright' : 'text-ink-muted'">{{ b.payout }}</p>
              <span class="rounded-full border px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
                :class="b.status === 'WON' ? 'border-border-gold text-gold-bright' : b.status === 'PENDING' ? 'border-champagne/40 text-champagne' : 'border-white/15 text-ink-dim'">
                {{ b.status }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
