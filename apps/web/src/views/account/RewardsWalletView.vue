<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import StatCard from '@/components/account/StatCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { balances } from '@/data/account'

const redeemables = [
  { name: 'Royal Cashback', cost: '2,500 pts', desc: '$25 instant cashback to your main wallet', icon: 'percent' },
  { name: '200 Royal Spins', cost: '4,000 pts', desc: 'On any slot from the Treasury collection', icon: 'sparkle' },
  { name: 'Court Free Bet', cost: '5,000 pts', desc: '$50 free bet in the Sports Arena', icon: 'trophy' },
  { name: 'Concierge Evening', cost: '25,000 pts', desc: 'A private-table experience arranged by your host', icon: 'crown' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Rewards</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">My Rewards</h1>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <StatCard label="Reward Points" :value="balances.rewardsPoints + ' pts'" icon="star" accent />
      <StatCard label="Lifetime Cashback" :value="balances.cashbackTotal" icon="percent" />
    </div>

    <AccountPanel title="Redeem from the Treasury">
      <div class="grid gap-4 sm:grid-cols-2">
        <div v-glow v-for="r in redeemables" :key="r.name" class="group rounded-xl border border-border-gold/30 bg-black/30 p-5 transition-all duration-300 hover:border-border-gold">
          <div class="flex items-start justify-between gap-3">
            <span class="grid h-11 w-11 place-items-center rounded-full border border-border-gold/60 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
              <AppIcon :name="r.icon" :size="17" />
            </span>
            <span class="rounded-full border border-border-gold px-3 py-1 font-sans text-[10px] font-bold tabular-nums uppercase tracking-[0.12em] text-gold-bright">{{ r.cost }}</span>
          </div>
          <p class="mt-3 font-display text-[14px] font-semibold tracking-[0.08em] text-ink">{{ r.name }}</p>
          <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ r.desc }}</p>
          <GoldButton variant="outline" size="sm" class="mt-4">Redeem</GoldButton>
        </div>
      </div>
    </AccountPanel>
  </div>
</template>
