<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import StatCard from '@/components/account/StatCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { balances, gameWallets, transactions } from '@/data/account'

const recent = transactions.slice(0, 4)
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Wallet</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Balance</h1>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <StatCard label="Main Balance" :value="balances.main" font="wallet" accent
        :rows="[{ k: 'Status', v: 'Primary' }]" />
      <StatCard label="Bonus" :value="balances.bonus" icon="gift"
        :rows="[{ k: 'Active Balance', v: balances.activeBonusBalance }]" />
      <StatCard label="Lifetime" value=" " icon="chart"
        :rows="[{ k: 'Total Deposits', v: balances.totalDeposits }, { k: 'Total Withdrawals', v: balances.totalWithdrawals }]">
        <template #value><span class="text-gold-gradient">{{ balances.totalDeposits }}</span></template>
      </StatCard>
    </div>

    <AccountPanel title="Game Wallets">
      <p class="mb-4 font-sans text-[12px] text-ink-dim">Move funds between your main wallet and any game provider.</p>
      <ul class="divide-y divide-white/5">
        <li v-for="w in gameWallets" :key="w.provider" class="flex items-center gap-4 py-4">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AppIcon name="vault" :size="15" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ w.provider }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ w.kind }}</p>
          </div>
          <p class="font-sans text-[13px] font-bold tabular-nums text-ink-muted">{{ w.balance }}</p>
        </li>
      </ul>
    </AccountPanel>

    <AccountPanel title="Treasury Actions">
      <div class="flex flex-wrap gap-3">
        <RouterLink to="/account/deposit"><GoldButton variant="solid" size="md"><AppIcon name="plus" :size="14" /> Deposit</GoldButton></RouterLink>
        <RouterLink to="/account/withdraw"><GoldButton variant="outline" size="md"><AppIcon name="bolt" :size="14" /> Withdraw</GoldButton></RouterLink>
        <RouterLink to="/account/transactions"><GoldButton variant="ghost" size="md">Full History <AppIcon name="arrowRight" :size="13" /></GoldButton></RouterLink>
      </div>
    </AccountPanel>

    <AccountPanel title="Latest Movements">
      <ul class="divide-y divide-white/5">
        <li v-for="t in recent" :key="t.date" class="flex items-center justify-between gap-4 py-3.5">
          <div>
            <p class="font-sans text-[13px] font-semibold text-ink">{{ t.label }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ t.date }}</p>
          </div>
          <p class="font-sans text-[13px] font-bold tabular-nums" :class="t.positive ? 'text-gold-bright' : 'text-ink-muted'">{{ t.amount }}</p>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
