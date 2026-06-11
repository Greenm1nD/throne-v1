<script setup lang="ts">
import { computed } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { user } from '@/data/account'
import { vipLevels } from '@/data/vipLevels'

const activeIndex = computed(() => vipLevels.findIndex((l) => l.name === user.tier))
const xpPct = computed(() =>
  Math.round(((user.xp - vipLevels[activeIndex.value].threshold) / (user.xpNext - vipLevels[activeIndex.value].threshold)) * 100),
)

const perks = [
  { tier: 'Noble', list: ['Court access', 'Weekly free spins'] },
  { tier: 'Baron', list: ['5% cashback', 'Birthday bonus'] },
  { tier: 'Duke', list: ['15% cashback', 'Priority withdrawals', 'VIP support'] },
  { tier: 'Crown', list: ['20% cashback', 'Personal host', 'Event invitations'] },
  { tier: 'Sovereign', list: ['25% cashback', 'Luxury gifts', 'Tailored limits'] },
  { tier: 'Monarch', list: ['Royal concierge', 'Private tables', 'The kingdom itself'] },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Rewards</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">VIP Progress</h1>
    </div>

    <AccountPanel>
      <div class="flex flex-col items-center gap-2 pb-6 text-center">
        <img :src="vipLevels[activeIndex].crown" alt="" class="h-16 w-auto drop-shadow-[0_0_20px_rgba(245,215,122,0.7)]" />
        <p class="font-display text-xl font-bold uppercase tracking-[0.2em] text-gold-gradient">{{ user.tier }}</p>
        <p class="font-sans text-[12px] tabular-nums text-ink-dim">{{ user.xp.toLocaleString() }} XP · {{ (user.xpNext - user.xp).toLocaleString() }} XP to {{ user.nextTier }}</p>
        <div class="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10">
          <div class="h-full rounded-full bg-gold-gradient shadow-[0_0_10px_rgba(245,215,122,0.5)]" :style="{ width: `${xpPct}%` }" />
        </div>
      </div>

      <div class="relative border-t border-border-gold/20 px-2 pt-8">
        <div class="pointer-events-none absolute inset-x-4 top-[76px] hidden h-px bg-white/10 md:block" />
        <div class="pointer-events-none absolute left-4 top-[76px] hidden h-px bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)] md:block"
          :style="{ width: `${(activeIndex / (vipLevels.length - 1)) * 100}%` }" />
        <ol class="relative grid gap-6 sm:grid-cols-3 md:auto-cols-fr md:grid-flow-col md:gap-2">
          <li v-for="(lvl, i) in vipLevels" :key="lvl.name" class="flex flex-col items-center gap-1.5 text-center">
            <div class="relative z-10 flex h-12 items-end">
              <img :src="lvl.crown" :alt="lvl.name" class="w-auto object-contain"
                :class="i === activeIndex ? 'h-11 drop-shadow-[0_0_14px_rgba(245,215,122,0.8)]' : i < activeIndex ? 'h-8' : 'h-8 opacity-50'" />
            </div>
            <span class="font-sans text-[10px] font-bold uppercase tracking-[0.14em]" :class="i === activeIndex ? 'text-gold-bright' : 'text-ink-muted'">{{ lvl.name }}</span>
            <span class="font-sans text-[9px] tabular-nums text-ink-dim">{{ lvl.threshold.toLocaleString() }}+ XP</span>
          </li>
        </ol>
      </div>
    </AccountPanel>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div v-glow v-for="(p, i) in perks" :key="p.tier"
        class="card-lux p-5"
        :class="i === activeIndex && 'border-gold shadow-gold-soft'">
        <div class="mb-3 flex items-center justify-between">
          <p class="font-display text-[13px] font-semibold uppercase tracking-[0.18em]" :class="i <= activeIndex ? 'text-gold-gradient' : 'text-ink-muted'">{{ p.tier }}</p>
          <span v-if="i === activeIndex" class="rounded-full border border-border-gold px-2.5 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.16em] text-gold-bright">You are here</span>
          <span v-else-if="i < activeIndex" class="font-sans text-[9px] uppercase tracking-[0.16em] text-ink-dim">Conquered</span>
        </div>
        <ul class="space-y-1.5">
          <li v-for="b in p.list" :key="b" class="flex items-center gap-2 font-sans text-[12px]" :class="i <= activeIndex ? 'text-ink-muted' : 'text-ink-dim'">
            <AppIcon name="check" :size="11" :class="i <= activeIndex ? 'text-gold/80' : 'text-ink-dim'" /> {{ b }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
