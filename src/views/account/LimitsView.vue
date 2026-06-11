<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import GoldButton from '@/components/ui/GoldButton.vue'

const limits = [
  { label: 'Daily Deposit Limit', current: '$1,000', placeholder: 'e.g. 500' },
  { label: 'Weekly Loss Limit', current: '$2,500', placeholder: 'e.g. 1,000' },
  { label: 'Monthly Wager Limit', current: 'No limit', placeholder: 'e.g. 10,000' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Responsible Gaming</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Wager Limits</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Set your own boundaries — lowering a limit applies instantly; raising one takes 24 hours.</p>
    </div>

    <AccountPanel title="My Limits">
      <div class="space-y-4">
        <div v-glow v-for="l in limits" :key="l.label" class="grid items-end gap-3 rounded-xl border border-border-gold/30 bg-black/30 p-5 sm:grid-cols-[1fr_1fr_auto]">
          <div>
            <p class="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">{{ l.label }}</p>
            <p class="mt-1 font-display text-lg font-bold tabular-nums" :class="l.current === 'No limit' ? 'text-ink-muted' : 'text-gold-gradient'">{{ l.current }}</p>
          </div>
          <label class="block">
            <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">New limit ($)</span>
            <input :placeholder="l.placeholder" inputmode="decimal" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm tabular-nums text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
          </label>
          <GoldButton variant="outline" size="md">Apply</GoldButton>
        </div>
      </div>
      <p class="mt-5 font-sans text-[11px] leading-relaxed text-ink-dim">
        Limits apply across casino, live tables and sports together. Removing a limit entirely requires a 7-day reflection period.
      </p>
    </AccountPanel>
  </div>
</template>
