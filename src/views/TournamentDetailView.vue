<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { kingdomPage } from '@/data/pages'
import { useTournaments } from '@/composables/useTournaments'
import { useTournamentClocks } from '@/composables/useTournamentClocks'
import { useAuth } from '@/composables/useAuth'
import { useEnter } from '@/composables/useEnter'

const route = useRoute()
const router = useRouter()
const { isEntered, toggle } = useTournaments()
const { label: tClock } = useTournamentClocks(kingdomPage.tournaments)
const { isLoggedIn } = useAuth()
const { enter } = useEnter()

const t = computed(() => kingdomPage.tournaments.find((x) => x.slug === route.params.slug))
const fillPct = computed(() => (t.value ? Math.round((t.value.players / t.value.cap) * 100) : 0))
const initials = (name: string) => name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
</script>

<template>
  <main class="container-royal pb-6 pt-6">
    <RouterLink to="/kingdom" class="mb-5 inline-flex items-center gap-1.5 font-sans text-[12px] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-gold-bright">
      <AppIcon name="arrowLeft" :size="13" /> The Kingdom
    </RouterLink>

    <template v-if="t">
      <!-- Header -->
      <div class="relative overflow-hidden rounded-2xl border border-border-gold shadow-card-glow">
        <div
          v-lazybg="`linear-gradient(90deg, rgba(5,5,5,0.92) 30%, rgba(5,5,5,0.4)), url('${t.image}'), url('${t.fallback}')`"
          class="absolute inset-0 bg-cover bg-center"
        />
        <div class="relative z-10 px-7 py-9 sm:px-10 sm:py-12">
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
              :class="t.status === 'live' ? 'border border-[#c2603f]/60 bg-black/50 text-[#e89a7c]' : 'border border-border-gold/50 bg-black/50 text-champagne'"
            >
              <span v-if="t.status === 'live'" class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#e0552c] shadow-[0_0_8px_rgba(224,85,44,0.9)]" />
              {{ t.status === 'live' ? 'Live Now' : 'Upcoming' }}
            </span>
            <span class="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80">{{ t.game }}</span>
          </div>
          <h1 class="mt-3 font-display text-3xl font-bold tracking-[0.08em] text-gold-gradient sm:text-4xl">{{ t.name }}</h1>
          <p class="mt-3 max-w-xl font-sans text-[13px] leading-relaxed text-ink-muted">{{ t.desc }}</p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <GoldButton v-if="!isLoggedIn" variant="solid" size="lg" @click="enter()">
              <AppIcon name="crown" :size="15" /> Join to Enter
            </GoldButton>
            <GoldButton v-else :variant="isEntered(t.slug) ? 'outline' : 'solid'" size="lg" @click="toggle(t.slug)">
              <AppIcon :name="isEntered(t.slug) ? 'check' : 'crown'" :size="15" />
              {{ isEntered(t.slug) ? 'Entered — Leave' : (t.status === 'live' ? 'Enter Now' : 'Reserve My Seat') }}
            </GoldButton>
            <span class="font-sans text-[12px] tabular-nums text-ink-muted">{{ tClock(t) }}</span>
          </div>
        </div>
      </div>

      <!-- Stat row -->
      <div class="mt-5 grid gap-4 sm:grid-cols-3">
        <div class="card-lux p-5 text-center hover:translate-y-0">
          <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Prize Pool</p>
          <p class="mt-1 font-display text-2xl font-bold tabular-nums text-gold-gradient">{{ t.prize }}</p>
        </div>
        <div class="card-lux p-5 text-center hover:translate-y-0">
          <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Entry</p>
          <p class="mt-1 font-display text-2xl font-bold tabular-nums text-champagne">{{ t.entry }}</p>
        </div>
        <div class="card-lux p-5 text-center hover:translate-y-0">
          <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Seats Filled</p>
          <p class="mt-1 font-display text-2xl font-bold tabular-nums text-champagne">{{ t.players }} / {{ t.cap }}</p>
          <div class="mx-auto mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
            <div class="h-full rounded-full bg-gold-gradient" :style="{ width: `${fillPct}%` }" />
          </div>
        </div>
      </div>

      <div class="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <!-- Rules + prize breakdown -->
        <div class="flex flex-col gap-5">
          <div class="card-lux p-6 hover:translate-y-0">
            <h3 class="font-display text-base font-semibold uppercase tracking-[0.2em] text-gold-gradient">The Rules</h3>
            <ul class="mt-4 space-y-3">
              <li v-for="r in t.rules" :key="r" class="flex items-start gap-2.5 font-sans text-[13px] leading-relaxed text-ink-muted">
                <AppIcon name="check" :size="13" class="mt-0.5 shrink-0 text-gold/80" /> {{ r }}
              </li>
            </ul>
          </div>
          <div class="card-lux p-6 hover:translate-y-0">
            <h3 class="font-display text-base font-semibold uppercase tracking-[0.2em] text-gold-gradient">Prize Breakdown</h3>
            <ul class="mt-4 divide-y divide-border-gold/12">
              <li v-for="p in t.prizeBreakdown" :key="p.place" class="flex items-center justify-between py-2.5">
                <span class="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">{{ p.place }}</span>
                <span class="font-display text-[15px] font-bold tabular-nums text-gold-gradient">{{ p.amount }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Live standings -->
        <div class="card-lux p-6 hover:translate-y-0">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="font-display text-base font-semibold uppercase tracking-[0.2em] text-gold-gradient">Live Standings</h3>
            <span v-if="t.board.length" class="flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#5fbf7a] shadow-[0_0_8px_rgba(95,191,122,0.9)]" /> Live
            </span>
          </div>

          <ol v-if="t.board.length" class="space-y-1">
            <li
              v-for="p in t.board"
              :key="p.name"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5"
              :class="p.you && isLoggedIn ? 'bg-gold/[0.06]' : ''"
            >
              <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-[12px] font-bold tabular-nums"
                :class="p.rank <= 3 ? 'bg-gold-gradient text-bg' : 'border border-border-gold/40 text-ink-muted'">
                {{ p.rank }}
              </span>
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-gold/50 font-display text-[11px] font-bold text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 72%)">
                {{ initials(p.name) }}
              </span>
              <span class="min-w-0 flex-1 truncate font-sans text-[13px] font-semibold text-ink">
                {{ p.name }}
                <span v-if="p.you && isLoggedIn" class="ml-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright">You</span>
              </span>
              <span class="font-display text-[14px] font-bold tabular-nums text-gold-gradient">{{ p.points.toLocaleString() }}</span>
            </li>
          </ol>

          <div v-else class="grid place-items-center gap-2 py-12 text-center">
            <img src="/assets/images/crown-duke.png" alt="" class="h-9 w-auto opacity-70" />
            <p class="font-sans text-[13px] text-ink-muted">The lists open when the tournament begins.</p>
            <p class="font-sans text-[11px] text-ink-dim">Reserve your seat to be summoned when it starts.</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Unknown slug -->
    <div v-else class="grid place-items-center gap-4 py-24 text-center">
      <img src="/assets/images/crown-duke.png" alt="" class="h-12 w-auto opacity-80" />
      <h1 class="font-display text-2xl font-bold tracking-[0.1em] text-gold-gradient">Tournament Not Found</h1>
      <p class="max-w-sm font-sans text-sm text-ink-muted">This joust has either ended or never entered the lists.</p>
      <GoldButton variant="solid" size="md" @click="router.push('/kingdom')">
        Back to the Kingdom <AppIcon name="arrowRight" :size="14" />
      </GoldButton>
    </div>
  </main>
</template>
