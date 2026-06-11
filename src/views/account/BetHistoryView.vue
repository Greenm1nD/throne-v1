<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import { betHistory } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Activity</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Bet History</h1>
    </div>

    <AccountPanel>
      <ul class="space-y-4">
        <li v-for="b in betHistory" :key="b.match" class="rounded-xl border border-white/8 bg-black/30 p-5 transition-colors hover:border-border-gold/70">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="font-display text-[14px] font-semibold tracking-[0.06em] text-ink">{{ b.match }}</p>
              <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ b.market }}</p>
            </div>
            <span class="self-start rounded-full border px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
              :class="b.won ? 'border-border-gold text-gold-bright' : 'border-white/15 text-ink-dim'">
              {{ b.won ? 'Won' : 'Lost' }}
            </span>
          </div>
          <dl class="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4 sm:grid-cols-4">
            <div v-for="d in [
                { k: 'Odds', v: b.odds }, { k: 'Stake', v: b.stake },
                { k: 'Payout', v: b.payout }, { k: 'Settled', v: b.date },
              ]" :key="d.k">
              <dt class="font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">{{ d.k }}</dt>
              <dd class="mt-0.5 font-sans text-[13px] font-semibold tabular-nums" :class="d.k === 'Payout' ? (b.won ? 'text-gold-bright' : 'text-ink-muted') : 'text-ink'">{{ d.v }}</dd>
            </div>
          </dl>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
