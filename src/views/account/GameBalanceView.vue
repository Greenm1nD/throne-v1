<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { balances, gameWallets } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Transactions</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Game Balance</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Move funds between your main wallet and any game provider.</p>
    </div>

    <AccountPanel>
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-gold bg-gold/[0.05] px-5 py-4">
        <div class="flex items-center gap-3.5">
          <span class="grid h-11 w-11 place-items-center rounded-full border border-border-gold text-gold-bright" style="background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)">
            <AppIcon name="vault" :size="17" />
          </span>
          <div>
            <p class="font-sans text-[13px] font-semibold text-ink">THRONE · Main Wallet</p>
            <p class="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold-bright">Primary</p>
          </div>
        </div>
        <p class="font-display text-lg font-bold tabular-nums text-gold-gradient">{{ balances.main }}</p>
      </div>

      <ul class="space-y-3">
        <li v-for="w in gameWallets" :key="w.provider" class="flex flex-wrap items-center gap-4 rounded-xl border border-white/8 bg-black/30 p-5 transition-colors hover:border-border-gold/70">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AppIcon name="vault" :size="16" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ w.provider }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ w.kind }} · Provider balance</p>
          </div>
          <p class="font-sans text-[14px] font-bold tabular-nums text-ink-muted">{{ w.balance }}</p>
          <GoldButton variant="outline" size="sm">Transfer to Main</GoldButton>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
