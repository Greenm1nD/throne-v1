<script setup lang="ts">
import { computed } from 'vue'
import StatCard from '@/components/account/StatCard.vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AccGlyph from '@/components/account/AccGlyph.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { user, balances, transactions, quickActions } from '@/data/account'
import { vipLevels } from '@/data/vipLevels'

const activeIndex = computed(() => vipLevels.findIndex((l) => l.name === user.tier))
const xpPct = computed(() => Math.round((user.xp / user.xpNext) * 100))
const recent = transactions.slice(0, 5)
</script>

<template>
  <div class="space-y-6">
    <!-- Greeting -->
    <div>
      <p class="font-sans text-[13px] text-ink-dim">Welcome back,</p>
      <div class="mt-1 flex items-center gap-3">
        <h1 class="font-display text-3xl font-bold tracking-[0.06em] text-gold-gradient">{{ user.name }}</h1>
        <img src="/assets/images/crown-duke.png" alt="" class="h-7 w-auto" />
      </div>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ user.handle }} · Member since {{ user.memberSince }}</p>
      <span class="mt-2 inline-flex items-center gap-2 rounded-full border border-border-gold px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
        <AppIcon name="crown" :size="12" /> {{ user.tier }}
      </span>
    </div>

    <!-- Stat row -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Balance" :value="balances.total" font="wallet" accent
        :rows="[{ k: 'Total Deposits', v: balances.totalDeposits }, { k: 'Total Withdrawals', v: balances.totalWithdrawals }]" />
      <StatCard label="Bonus" :value="balances.bonus" icon="gift" accent
        :rows="[{ k: 'Active Bonuses', v: String(balances.activeBonuses) }, { k: 'Active Balance', v: balances.activeBonusBalance }]" />
      <StatCard label="VIP Level" :value="user.tier" icon="crown" accent>
        <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div class="h-full rounded-full bg-gold-gradient" :style="{ width: `${xpPct}%` }" />
        </div>
        <p class="mt-2 font-sans text-[11px] tabular-nums text-ink-dim">
          {{ user.xp.toLocaleString() }} / {{ user.xpNext.toLocaleString() }} XP · Next: {{ user.nextTier.toUpperCase() }}
        </p>
      </StatCard>
      <StatCard label="Account Status" value="Not Verified" icon="shield"
        :rows="[{ k: 'Member since', v: user.memberSince }, { k: 'Two-Factor Auth', v: 'Disabled' }]">
        <template #value><span class="text-ink-muted">Not Verified</span></template>
      </StatCard>
    </div>

    <!-- VIP progress + transactions -->
    <div class="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <AccountPanel title="VIP Progress">
        <template #action>
          <RouterLink to="/account/vip-progress">
            <GoldButton variant="ghost" size="sm">View All Tiers <AppIcon name="arrowRight" :size="12" /></GoldButton>
          </RouterLink>
        </template>

        <div class="relative px-2 pt-2">
          <div class="pointer-events-none absolute inset-x-4 top-[44px] hidden h-px bg-white/10 md:block" />
          <div class="pointer-events-none absolute left-4 top-[44px] hidden h-px bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)] md:block"
            :style="{ width: `${(activeIndex / (vipLevels.length - 1)) * 100}%` }" />
          <ol class="relative grid auto-cols-fr grid-flow-col justify-items-center gap-2 overflow-x-auto [scrollbar-width:none]">
            <li v-for="(lvl, i) in vipLevels" :key="lvl.name" class="flex flex-col items-center gap-1.5">
              <div class="relative z-10 flex h-12 items-end">
                <img :src="lvl.crown" :alt="lvl.name"
                  class="w-auto object-contain"
                  :class="i === activeIndex ? 'h-11 drop-shadow-[0_0_14px_rgba(245,215,122,0.8)]' : i < activeIndex ? 'h-8' : 'h-8 opacity-50'" />
              </div>
              <span class="font-sans text-[10px] font-bold uppercase tracking-[0.14em]" :class="i === activeIndex ? 'text-gold-bright' : 'text-ink-muted'">{{ lvl.name }}</span>
              <span class="whitespace-nowrap font-sans text-[9px] tabular-nums text-ink-dim">{{ lvl.threshold.toLocaleString() }}+ XP</span>
            </li>
          </ol>
        </div>

        <p class="mt-6 border-t border-border-gold/20 pt-4 font-sans text-[12px] text-ink-dim">
          You're doing great — keep playing to reach {{ user.nextTier }}.
        </p>
        <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div v-for="b in [
              { icon: 'star', t: 'Higher Bonuses' },
              { icon: 'bolt', t: 'Faster Withdrawals' },
              { icon: 'headset', t: 'VIP Support' },
              { icon: 'crown', t: 'Exclusive Events' },
            ]" :key="b.t" class="flex flex-col items-center gap-2 text-center">
            <span class="grid h-11 w-11 place-items-center rounded-full border border-border-gold/60 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
              <AppIcon :name="b.icon" :size="17" />
            </span>
            <span class="font-sans text-[10px] uppercase tracking-[0.1em] text-ink-dim">{{ b.t }}</span>
          </div>
        </div>
      </AccountPanel>

      <AccountPanel title="Recent Transactions">
        <template #action>
          <RouterLink to="/account/transactions">
            <GoldButton variant="ghost" size="sm">View All <AppIcon name="arrowRight" :size="12" /></GoldButton>
          </RouterLink>
        </template>
        <ul class="divide-y divide-border-gold/20">
          <li v-for="t in recent" :key="t.date" class="flex items-center gap-3.5 py-3.5">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
              <AccGlyph :icon="t.icon" :size="15" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate font-sans text-[13px] font-semibold text-ink">{{ t.label }}</p>
              <p class="font-sans text-[11px] text-ink-dim">{{ t.date }}</p>
            </div>
            <div class="text-right">
              <p class="font-sans text-[13px] font-bold tabular-nums" :class="t.positive ? 'text-gold-bright' : 'text-ink-muted'">{{ t.amount }}</p>
              <p class="font-sans text-[10px] uppercase tracking-[0.1em] text-ink-dim">{{ t.status }}</p>
            </div>
          </li>
        </ul>
      </AccountPanel>
    </div>

    <!-- Quick actions -->
    <AccountPanel title="Quick Actions">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        <RouterLink v-glow v-for="a in quickActions" :key="a.label" :to="a.to"
          class="group flex flex-col items-center gap-2.5 rounded-xl border border-border-gold/30 bg-black/30 px-3 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-gold hover:bg-gold/[0.05]">
          <span class="text-gold/80 transition-colors group-hover:text-gold-bright">
            <AccGlyph :icon="a.icon" :font="a.font" :size="20" />
          </span>
          <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors group-hover:text-ink">{{ a.label }}</span>
        </RouterLink>
      </div>
    </AccountPanel>

    <!-- VIP lounge banner -->
    <div class="group relative overflow-hidden rounded-2xl border border-border-gold shadow-card-glow">
      <div v-lazybg="`linear-gradient(90deg, rgba(5,5,5,0.92) 30%, rgba(5,5,5,0.35)), url('/assets/images/vip-lounge.webp'), url('/assets/images/vip-club.webp')`"
        class="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
      <span class="shine-beam" />
      <div class="relative z-10 flex flex-col gap-4 px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9">
        <div>
          <p class="eyebrow mb-1">The Inner Circle awaits</p>
          <h3 class="font-display text-xl font-semibold tracking-[0.12em] text-gold-gradient">VIP Lounge</h3>
        </div>
        <RouterLink to="/account/concierge">
          <GoldButton variant="solid" size="md">Enter the Lounge <AppIcon name="arrowRight" :size="14" /></GoldButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
