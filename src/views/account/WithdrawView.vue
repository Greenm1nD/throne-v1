<script setup lang="ts">
import { ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { balances, paymentMethods } from '@/data/account'

const selected = ref('Crypto (BTC · ETH · USDT)')
const amount = ref('')
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Wallet</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Withdraw</h1>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <AccountPanel title="Destination">
        <div class="grid gap-3 sm:grid-cols-2">
          <button v-for="m in paymentMethods" :key="m.name"
            class="rounded-xl border p-4 text-left transition-all duration-300"
            :class="selected === m.name ? 'border-gold bg-gold/[0.07] shadow-gold-soft' : 'border-white/8 bg-black/30 hover:border-border-gold'"
            @click="selected = m.name">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ m.name }}</p>
            <p class="mt-1 font-sans text-[11px] text-ink-dim">{{ m.time }} · {{ m.limits }}</p>
          </button>
        </div>
        <div class="mt-5 flex items-start gap-3 rounded-xl border border-border-gold/40 bg-gold/[0.03] p-4">
          <AppIcon name="bolt" :size="15" class="mt-0.5 shrink-0 text-gold-bright" />
          <p class="font-sans text-[12px] leading-relaxed text-ink-dim">
            As a <span class="text-gold-bright">Duke</span>, your withdrawals are escorted to the front of the queue — typically under 2 hours.
          </p>
        </div>
      </AccountPanel>

      <AccountPanel title="Amount">
        <p class="mb-4 flex items-center justify-between rounded-xl border border-white/8 bg-black/30 px-4 py-3">
          <span class="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-dim">Available</span>
          <span class="font-display text-base font-bold tabular-nums text-gold-gradient">{{ balances.main }}</span>
        </p>
        <label class="block">
          <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Withdrawal Amount</span>
          <input v-model="amount" placeholder="$0.00" inputmode="decimal"
            class="h-14 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-center font-display text-xl tabular-nums text-gold-bright placeholder:text-ink-dim focus:border-gold focus:outline-none" />
        </label>
        <GoldButton variant="solid" size="lg" block class="mt-5">Request Withdrawal</GoldButton>
        <p class="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">Bonus funds are not withdrawable</p>
      </AccountPanel>
    </div>
  </div>
</template>
