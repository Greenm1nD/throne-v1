<script setup lang="ts">
import StatCard from '@/components/account/StatCard.vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AccGlyph from '@/components/account/AccGlyph.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useRouter } from 'vue-router'
import { user, balances, transactions, quickActions } from '@/data/account'
import ProgressionWidget from '@/components/progression/ProgressionWidget.vue'
import { useProgression } from '@/composables/useProgression'
import { formatBp } from '@/data/progression'
import { useDiscreet } from '@/composables/useDiscreet'
import { polishEnabled } from '@/composables/usePolish'

const { mask } = useDiscreet()
const router = useRouter()
// Rank comes from the one progression source; this view computes nothing.
const { rank } = useProgression()
const recent = transactions.slice(0, 5)
</script>

<template>
  <div class="space-y-6">
    <!-- Greeting -->
    <div>
      <p class="font-sans text-[13px] text-ink-dim">Welcome back,</p>
      <div class="mt-1 flex items-center gap-3">
        <h1 class="font-display text-3xl font-bold tracking-[0.06em] text-gold-gradient">{{ user.name }}</h1>
        <img v-if="rank" :src="rank.crown" alt="" class="h-7 w-auto" />
      </div>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ user.handle }} · Member since {{ user.memberSince }}</p>
      <span class="mt-2 inline-flex items-center gap-2 rounded-full border border-border-gold px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
        <AppIcon name="crown" :size="12" /> {{ rank?.name }}
      </span>
    </div>

    <!-- Stat row -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Balance" :value="balances.total" font="wallet" accent
        :rows="[{ k: 'Total Deposits', v: balances.totalDeposits }, { k: 'Total Withdrawals', v: balances.totalWithdrawals }]" />
      <StatCard label="Bonus" :value="balances.bonus" icon="gift" accent
        :rows="[{ k: 'Active Bonuses', v: String(balances.activeBonuses) }, { k: 'Active Balance', v: balances.activeBonusBalance }]" />
      <StatCard label="Rank" :value="rank?.name ?? '—'" icon="crown" accent
        :rows="rank ? [
          { k: 'Standing Order', v: formatBp(rank.standingOrderBp) },
          { k: 'Weekly Purse', v: rank.weeklyPurseBp ? formatBp(rank.weeklyPurseBp) : '—' },
        ] : []" />
      <StatCard label="Account Status" value="Not Verified" icon="shield"
        :rows="polishEnabled ? [] : [{ k: 'Member since', v: user.memberSince }, { k: 'Two-Factor Auth', v: 'Disabled' }]">
        <template #value><span class="text-[#e89a7c]">Not Verified</span></template>
        <!-- Polish: turn status into a clear action -->
        <template v-if="polishEnabled">
          <p class="mt-2 font-sans text-[11px] leading-relaxed text-ink-dim">
            Verify your identity to unlock withdrawals and full membership.
          </p>
          <GoldButton variant="solid" size="sm" block class="mt-3" @click="router.push('/account/verification')">
            Verify Account <AppIcon name="arrowRight" :size="13" />
          </GoldButton>
        </template>
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

        <ProgressionWidget placement="Card" />

        <div class="mt-6 grid grid-cols-2 gap-3 border-t border-border-gold/20 pt-5 sm:grid-cols-4">
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
              <p class="font-sans text-[13px] font-bold tabular-nums" :class="t.positive ? 'text-gold-bright' : 'text-ink-muted'">{{ mask(t.amount) }}</p>
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
          class="group flex flex-col items-center gap-2.5 rounded-xl border border-border-gold/30 bg-black/30 px-2 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-gold hover:bg-gold/[0.05]">
          <span class="opacity-80 saturate-[0.9] transition-all duration-300 group-hover:opacity-100 group-hover:saturate-100 group-hover:drop-shadow-[0_0_7px_rgba(245,215,122,0.65)]">
            <AccGlyph :icon="a.icon" :font="a.font" :img="a.img" :size="a.img ? 36 : 20" />
          </span>
          <span class="whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.06em] text-ink-muted transition-colors group-hover:text-ink">{{ a.label }}</span>
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
