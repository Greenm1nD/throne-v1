<script setup lang="ts">
import { ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { paymentMethods } from '@/data/account'

const selected = ref('Crypto (BTC · ETH · USDT)')
const amount = ref('')
const presets = ['$50', '$100', '$250', '$500', '$1,000']
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Wallet</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Deposit</h1>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <AccountPanel title="Choose Method">
        <div class="grid gap-3 sm:grid-cols-2">
          <button v-for="m in paymentMethods" :key="m.name"
            class="relative rounded-xl border p-4 text-left transition-all duration-300"
            :class="selected === m.name ? 'border-gold bg-gold/[0.07] shadow-gold-soft' : 'border-white/8 bg-black/30 hover:border-border-gold'"
            @click="selected = m.name">
            <span v-if="m.recommended" class="absolute -top-2.5 right-3 rounded-full bg-gold-gradient px-2.5 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.16em] text-[#1a1407]">Recommended</span>
            <p class="font-sans text-[13px] font-semibold text-ink">{{ m.name }}</p>
            <p class="mt-1 font-sans text-[11px] text-ink-dim">{{ m.time }} · {{ m.limits }}</p>
          </button>
        </div>
      </AccountPanel>

      <AccountPanel title="Amount">
        <label class="block">
          <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Deposit Amount</span>
          <input v-model="amount" placeholder="$0.00" inputmode="decimal"
            class="h-14 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-center font-display text-xl tabular-nums text-gold-bright placeholder:text-ink-dim focus:border-gold focus:outline-none" />
        </label>
        <div class="mt-3 flex flex-wrap gap-2">
          <button v-for="p in presets" :key="p"
            class="rounded-full border border-white/10 px-4 py-1.5 font-sans text-[12px] tabular-nums text-ink-muted transition-colors hover:border-gold hover:text-gold-bright"
            @click="amount = p">{{ p }}</button>
        </div>
        <p class="mt-4 font-sans text-[11px] text-ink-dim">Method: <span class="text-champagne">{{ selected }}</span></p>
        <GoldButton variant="solid" size="lg" block class="mt-5">Deposit Now</GoldButton>
        <p class="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">Sealed by 256-bit encryption</p>
      </AccountPanel>
    </div>
  </div>
</template>
