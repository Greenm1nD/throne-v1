<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '@/components/page/PageHero.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { kingdomPage as page } from '@/data/pages'
import { useAuth } from '@/composables/useAuth'
import { useEnter } from '@/composables/useEnter'
import { useRevealEach } from '@/composables/useReveal'
import { useSeason } from '@/composables/useSeason'
import { useQuests } from '@/composables/useQuests'
import { useTournaments } from '@/composables/useTournaments'
import { useCourt } from '@/composables/useCourt'
import { useTournamentClocks } from '@/composables/useTournamentClocks'
import NobleHouses from '@/components/kingdom/NobleHouses.vue'
import HallOfKings from '@/components/kingdom/HallOfKings.vue'
import GameMasters from '@/components/kingdom/GameMasters.vue'

const { isLoggedIn } = useAuth()
const { enter, enterLabel } = useEnter()
const { label: seasonEnds, finalDay } = useSeason()
const { isClaimed, claim } = useQuests()
const { isEntered } = useTournaments()
const { label: tClock } = useTournamentClocks(page.tournaments)

// Live tournaments the member has entered → a contextual "you're competing" strip.
const liveEntries = computed(() => page.tournaments.filter((t) => t.status === 'live' && isEntered(t.slug)))
const myRank = (t: (typeof page.tournaments)[number]) => t.board.find((b) => b.you)?.rank

const root = ref<HTMLElement | null>(null)
const courtEl = ref<HTMLElement | null>(null)
useRevealEach(root)

const initials = (name: string) => name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()

function scrollToCourt() {
  courtEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Royal Court (leaderboard) ──────────────────────────────────────────
type CourtTab = 'season' | 'week' | 'allTime'
const tab = ref<CourtTab>('season')
const TABS: { key: CourtTab; label: string }[] = [
  { key: 'season', label: 'Season' },
  { key: 'week', label: 'This Week' },
  { key: 'allTime', label: 'All-Time' },
]
const court = useCourt(page.court)
const list = computed(() => court[tab.value])
// Left-column podium: champion on top, the two runners-up beneath.
const champion = computed(() => list.value[0])
const runnersUp = computed(() => list.value.slice(1, 3))
const rest = computed(() => list.value.slice(3))

// ── Your standing (logged-in) ──────────────────────────────────────────
const me = computed(() => page.court.season.find((n) => n.you))
const toTop3 = computed(() => (me.value ? Math.max(0, me.value.rank - 3) : 0))

// ── Quests ─────────────────────────────────────────────────────────────
const claimable = (q: (typeof page.quests)[number]) => q.progress >= q.goal && !isClaimed(q.id)
const justClaimed = ref<string | null>(null)
function claimQuest(q: (typeof page.quests)[number]) {
  if (!claimable(q)) return
  claim(q.id)
  justClaimed.value = q.id
  window.setTimeout(() => (justClaimed.value = null), 1400)
}
</script>

<template>
  <main ref="root" class="pb-4">
    <PageHero v-bind="page.hero" @primary="enter()" @secondary="scrollToCourt" />

    <!-- Season banner -->
    <section class="container-royal relative z-20 -mt-9">
      <div
        v-lazybg="`linear-gradient(90deg, rgba(10,10,13,0.96) 38%, rgba(8,8,10,0.62)), url('${page.season.image}'), url('/assets/images/texture-marble.webp')`"
        class="grid items-center gap-6 rounded-2xl border border-border-gold bg-card/90 bg-cover bg-center px-7 py-7 shadow-card-glow backdrop-blur sm:px-9 lg:grid-cols-[1fr_auto] lg:gap-10"
        data-reveal
      >
        <div>
          <p class="eyebrow mb-2 flex items-center gap-2">
            <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright shadow-[0_0_8px_rgba(245,215,122,0.9)]" />
            {{ page.season.chapter }} · Live Now
          </p>
          <h2 class="font-display text-3xl font-bold tracking-[0.08em] text-gold-gradient sm:text-4xl">
            {{ page.season.name }}
          </h2>
          <p class="mt-3 max-w-xl font-sans text-[13px] leading-relaxed text-ink-muted">
            {{ page.season.note }}
          </p>
        </div>

        <div class="flex shrink-0 flex-col gap-4 lg:items-end">
          <div class="flex gap-3">
            <div class="rounded-xl border border-border-gold/40 bg-black/40 px-5 py-3 text-center">
              <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Grand Prize</p>
              <p class="mt-1 font-display text-xl font-bold tabular-nums text-gold-gradient">{{ page.season.pool }}</p>
            </div>
            <div class="rounded-xl border border-border-gold/40 bg-black/40 px-5 py-3 text-center" :class="finalDay && 'border-[#c2603f]/60'">
              <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Season Ends</p>
              <p class="mt-1 font-display text-xl font-bold tabular-nums" :class="finalDay ? 'text-[#e89a7c]' : 'text-champagne'">{{ seasonEnds }}</p>
            </div>
          </div>
          <GoldButton variant="solid" size="md" class="w-full lg:w-auto" @click="enter()">
            <AppIcon name="crown" :size="15" /> Enter the Season
          </GoldButton>
        </div>
      </div>
    </section>

    <!-- Your standing (members only) -->
    <section v-if="isLoggedIn && me" class="container-royal pt-5">
      <div class="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-border-gold/40 bg-gold/[0.05] px-6 py-4" data-reveal>
        <p class="font-sans text-[12px] text-ink-muted">
          You hold
          <span class="font-display text-base font-bold text-gold-gradient">#{{ me.rank }}</span>
          in the Royal Court ·
          <span class="font-semibold tabular-nums text-champagne">{{ me.points.toLocaleString() }}</span> crowns
          <span v-if="me.change > 0" class="ml-1 font-semibold text-[#5fbf7a]">▲ {{ me.change }} this week</span>
        </p>
        <p v-if="toTop3 > 0" class="font-sans text-[12px] text-ink-dim">
          Climb <span class="font-semibold text-champagne">{{ toTop3 }}</span> {{ toTop3 === 1 ? 'place' : 'places' }} to reach the Top 3.
        </p>
      </div>
    </section>

    <!-- Live activity ticker -->
    <section class="container-royal pt-5">
      <div class="ticker relative overflow-hidden rounded-full border border-border-gold/30 bg-black/30 py-2.5" data-reveal>
        <div class="ticker-track flex w-max items-center gap-10 px-6">
          <span
            v-for="(a, i) in [...page.activity, ...page.activity]"
            :key="i"
            class="flex shrink-0 items-center gap-2 font-sans text-[12px] text-ink-muted"
          >
            <AppIcon name="crown" :size="12" class="text-gold/70" />
            <span class="font-semibold text-champagne">{{ a.name }}</span>
            {{ a.action }}
            <span class="font-semibold text-gold-bright">{{ a.amount }}</span>
            <span v-if="a.game" class="text-ink-dim">· {{ a.game }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- The Royal Court — leaderboard -->
    <section ref="courtEl" class="container-royal scroll-mt-24 pt-12 sm:pt-16">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow mb-1">This season's highest nobles</p>
          <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">The Royal Court</h3>
        </div>
        <!-- Tabs -->
        <div class="flex rounded-full border border-border-gold/40 bg-black/40 p-1">
          <button
            v-for="t in TABS"
            :key="t.key"
            class="rounded-full px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
            :class="tab === t.key ? 'bg-gold-gradient text-bg' : 'text-ink-muted hover:text-ink'"
            @click="tab = t.key"
          >
            {{ t.label }}
          </button>
        </div>
      </div>

      <div class="grid items-start gap-5 lg:grid-cols-2">
        <!-- LEFT: top 3 -->
        <div class="flex flex-col gap-3" data-reveal>
          <!-- Champion -->
          <div
            v-if="champion"
            class="relative flex items-center gap-4 rounded-2xl border border-gold/70 bg-gold/[0.07] px-5 py-4 shadow-card-glow"
            :class="champion.you && 'ring-1 ring-gold/40'"
          >
            <span class="absolute -top-2.5 left-5 grid h-6 w-6 place-items-center rounded-full bg-gold-gradient font-display text-[11px] font-bold tabular-nums text-bg shadow-[0_0_12px_rgba(245,215,122,0.6)]">1</span>
            <img :src="champion.crown" alt="" class="h-12 w-auto shrink-0 object-contain drop-shadow-[0_0_14px_rgba(245,215,122,0.6)]" />
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-gold/50 font-display text-[14px] font-bold text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.14), transparent 72%)">
              {{ initials(champion.name) }}
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate font-display text-lg font-bold tracking-[0.04em] text-gold-gradient">
                {{ champion.name }}
                <span v-if="champion.you" class="align-middle font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright">You</span>
              </p>
              <p class="font-sans text-[9px] uppercase tracking-[0.16em] text-ink-dim">{{ champion.tier }} · Champion</p>
            </div>
            <p class="shrink-0 font-display text-[15px] font-bold tabular-nums text-gold-gradient">{{ champion.points.toLocaleString() }}</p>
          </div>

          <!-- Runners-up -->
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="n in runnersUp"
              :key="n.name"
              class="relative flex flex-col items-center rounded-xl border border-white/5 bg-card/70 px-3 py-4 text-center"
              :class="n.you && 'ring-1 ring-gold/40'"
            >
              <span class="absolute -top-2.5 grid h-6 w-6 place-items-center rounded-full border border-border-gold/50 bg-surface font-display text-[11px] font-bold tabular-nums text-champagne">{{ n.rank }}</span>
              <img :src="n.crown" alt="" class="mt-1 h-8 w-auto object-contain" />
              <span class="mt-1.5 grid h-10 w-10 place-items-center rounded-full border border-border-gold/50 font-display text-[12px] font-bold text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 72%)">
                {{ initials(n.name) }}
              </span>
              <p class="mt-1.5 max-w-full truncate font-sans text-[12px] font-semibold text-ink">
                {{ n.name }}
                <span v-if="n.you" class="font-sans text-[8px] font-bold uppercase tracking-[0.12em] text-gold-bright">You</span>
              </p>
              <p class="font-sans text-[9px] uppercase tracking-[0.14em] text-ink-dim">{{ n.tier }}</p>
              <p class="mt-0.5 font-display text-[13px] font-bold tabular-nums text-gold-gradient">{{ n.points.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- RIGHT: tier list (ranks 4+) -->
        <div class="card-lux overflow-hidden p-0 hover:translate-y-0" data-reveal>
          <ol>
            <li
              v-for="n in rest"
              :key="n.name"
              class="flex items-center gap-3 border-b border-white/5 px-4 py-3 transition-colors last:border-0"
              :class="n.you ? 'bg-gold/[0.06]' : 'hover:bg-white/[0.02]'"
            >
              <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-gold/40 font-display text-[12px] font-bold tabular-nums text-ink-muted">
                {{ n.rank }}
              </span>
              <span class="relative shrink-0">
                <span class="grid h-9 w-9 place-items-center rounded-full border border-border-gold/50 font-display text-[11px] font-bold text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 72%)">
                  {{ initials(n.name) }}
                </span>
                <img :src="n.crown" alt="" class="absolute -bottom-1 -right-1 h-3.5 w-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="truncate font-sans text-[12px] font-semibold text-ink">
                  {{ n.name }}
                  <span v-if="n.you" class="ml-1 align-middle font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-gold-bright">You</span>
                </p>
                <p class="font-sans text-[9px] uppercase tracking-[0.14em] text-ink-dim">{{ n.tier }}</p>
              </div>
              <span
                class="flex w-9 shrink-0 items-center justify-end gap-0.5 font-sans text-[10px] font-semibold tabular-nums"
                :class="n.change > 0 ? 'text-[#5fbf7a]' : n.change < 0 ? 'text-[#c2603f]' : 'text-ink-dim'"
              >
                <template v-if="n.change !== 0"><span class="text-[8px] leading-none">{{ n.change > 0 ? '▲' : '▼' }}</span>{{ Math.abs(n.change) }}</template>
                <template v-else>—</template>
              </span>
              <span class="w-20 shrink-0 text-right font-display text-[13px] font-bold tabular-nums text-gold-gradient">
                {{ n.points.toLocaleString() }}
              </span>
            </li>
          </ol>
        </div>
      </div>
      <p class="mt-3 font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">
        Crowns earned · top 8 of 4,210 nobles
      </p>
    </section>

    <!-- Masters of the Games -->
    <GameMasters />

    <!-- Royal Quests -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="mb-6">
        <p class="eyebrow mb-1">Earn your crowns</p>
        <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Royal Quests</h3>
      </div>

      <div class="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          v-for="q in page.quests"
          :key="q.id"
          class="card-lux flex w-[290px] shrink-0 snap-start flex-col gap-3 p-5 hover:translate-y-0"
          data-reveal
        >
          <div class="flex items-start justify-between gap-3">
            <span class="rounded-full border border-border-gold/50 px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-champagne">
              {{ q.period }}
            </span>
            <span class="flex items-center gap-1 font-display text-[13px] font-bold tabular-nums text-gold-gradient">
              <AppIcon name="crown" :size="13" class="text-gold/80" />+{{ q.reward.toLocaleString() }}
            </span>
          </div>
          <p class="font-sans text-[13px] font-semibold text-ink">{{ q.title }}</p>

          <div class="mt-auto">
            <div class="mb-1 flex justify-between font-sans text-[10px] tabular-nums text-ink-dim">
              <span>{{ Math.min(q.progress, q.goal).toLocaleString() }} / {{ q.goal.toLocaleString() }}</span>
              <span>{{ Math.min(100, Math.round((q.progress / q.goal) * 100)) }}%</span>
            </div>
            <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.5)] transition-[width] duration-700"
                :style="{ width: `${Math.min(100, (q.progress / q.goal) * 100)}%` }"
              />
            </div>
          </div>

          <button
            v-if="isClaimed(q.id)"
            class="mt-1 flex items-center justify-center gap-1.5 rounded-lg border border-border-gold/30 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/70"
            disabled
          >
            <AppIcon name="check" :size="13" /> Claimed
          </button>
          <GoldButton
            v-else
            :variant="claimable(q) ? 'solid' : 'outline'"
            size="sm"
            block
            class="mt-1 transition-transform"
            :class="justClaimed === q.id && 'scale-105'"
            :disabled="!claimable(q)"
            @click="claimQuest(q)"
          >
            {{ claimable(q) ? `Claim ${q.reward.toLocaleString()} Crowns` : 'In Progress' }}
          </GoldButton>
        </div>
      </div>
    </section>

    <!-- Royal Tournaments -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="mb-6">
        <p class="eyebrow mb-1">Compete for the realm</p>
        <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Royal Tournaments</h3>
      </div>

      <!-- Live HUD: you're competing now -->
      <RouterLink
        v-for="t in liveEntries"
        :key="t.slug"
        :to="`/kingdom/tournament/${t.slug}`"
        class="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-[#c2603f]/50 bg-gold/[0.05] px-5 py-3 transition-colors hover:border-gold"
      >
        <span class="flex items-center gap-1.5 rounded-full border border-[#c2603f]/60 bg-black/40 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-[#e89a7c]">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#e0552c] shadow-[0_0_8px_rgba(224,85,44,0.9)]" /> Live
        </span>
        <span class="font-sans text-[13px] text-ink-muted">
          You're competing in <span class="font-semibold text-champagne">{{ t.name }}</span>
          <template v-if="myRank(t)"> — currently <span class="font-display font-bold text-gold-gradient">#{{ myRank(t) }}</span></template>
        </span>
        <span class="font-sans text-[12px] tabular-nums text-ink-dim">{{ tClock(t) }}</span>
        <span class="ml-auto flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-gold-bright">
          Open <AppIcon name="arrowRight" :size="12" />
        </span>
      </RouterLink>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="t in page.tournaments"
          :key="t.slug"
          :to="`/kingdom/tournament/${t.slug}`"
          class="card-lux group relative flex min-h-[260px] flex-col justify-end overflow-hidden p-6"
          data-reveal
        >
          <div
            v-lazybg="`linear-gradient(180deg, rgba(8,8,10,0.45), rgba(5,5,5,0.92)), url('${t.image}'), url('${t.fallback}')`"
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          />
          <span class="shine-beam" />

          <div class="absolute left-5 top-5 z-10 flex items-center gap-2">
            <span
              class="flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
              :class="t.status === 'live'
                ? 'border border-[#c2603f]/60 bg-black/50 text-[#e89a7c]'
                : 'border border-border-gold/50 bg-black/50 text-champagne'"
            >
              <span v-if="t.status === 'live'" class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#e0552c] shadow-[0_0_8px_rgba(224,85,44,0.9)]" />
              {{ t.status === 'live' ? 'Live' : 'Upcoming' }}
            </span>
            <span v-if="isEntered(t.slug)" class="flex items-center gap-1 rounded-full border border-gold/50 bg-black/50 px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright">
              <AppIcon name="check" :size="10" /> Entered
            </span>
          </div>

          <div class="relative z-10">
            <p class="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80">{{ t.game }}</p>
            <h4 class="mt-1 font-display text-xl font-semibold tracking-[0.08em] text-gold-gradient">{{ t.name }}</h4>

            <div class="mt-4 flex items-end justify-between gap-3">
              <div>
                <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Prize Pool</p>
                <p class="font-display text-2xl font-bold tabular-nums text-champagne">{{ t.prize }}</p>
              </div>
              <div class="text-right">
                <p class="font-sans text-[11px] tabular-nums text-ink-muted">
                  <AppIcon name="user" :size="11" class="mr-0.5 inline align-[-1px] text-gold/70" />{{ t.players }} / {{ t.cap }}
                </p>
                <p class="mt-0.5 font-sans text-[11px] text-ink-dim">Entry · {{ t.entry }}</p>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between gap-3">
              <span class="font-sans text-[11px] font-medium tabular-nums text-ink-muted">{{ tClock(t) }}</span>
              <span class="flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-gold-bright">
                View <AppIcon name="arrowRight" :size="12" />
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Noble Houses -->
    <NobleHouses />

    <!-- Royal Decrees — kingdom news -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="mb-6">
        <p class="eyebrow mb-1">From the herald</p>
        <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Royal Decrees</h3>
      </div>

      <div class="card-lux divide-y divide-white/5 p-0 hover:translate-y-0" data-reveal>
        <article
          v-for="d in page.decrees"
          :key="d.title"
          class="group flex flex-col gap-1.5 px-5 py-5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:gap-5 sm:px-7"
        >
          <span class="shrink-0 self-start rounded-full border border-border-gold/50 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-champagne">
            {{ d.tag }}
          </span>
          <div class="min-w-0 flex-1">
            <h4 class="font-display text-[15px] font-semibold tracking-[0.04em] text-ink transition-colors group-hover:text-gold-bright">
              {{ d.title }}
              <span
                v-if="d.date === 'Today'"
                class="ml-1.5 align-middle rounded-full bg-gold-gradient px-1.5 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-bg"
              >New</span>
            </h4>
            <p class="mt-0.5 font-sans text-[12px] leading-relaxed text-ink-dim">{{ d.sub }}</p>
          </div>
          <span class="shrink-0 font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">{{ d.date }}</span>
        </article>
      </div>
    </section>

    <!-- Hall of Kings -->
    <HallOfKings />

    <!-- Finale CTA -->
    <section class="container-royal pt-12 sm:pt-16">
      <div
        class="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border-gold bg-card/80 px-8 py-7 sm:flex-row"
        style="background-image: linear-gradient(90deg, rgba(13,13,16,0.9), rgba(8,8,10,0.95)), url('/assets/images/texture-marble.webp'); background-size: cover"
        data-reveal
      >
        <div class="flex items-center gap-5">
          <img src="/assets/images/throne-logo-mark.webp" alt="" class="h-12 w-auto opacity-90" />
          <div>
            <p class="font-display text-lg font-bold uppercase tracking-[0.12em] text-gold-gradient sm:text-xl">
              {{ page.finale.title }}
            </p>
            <p class="mt-1 font-sans text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              {{ page.finale.sub }}
            </p>
          </div>
        </div>
        <GoldButton variant="solid" size="lg" @click="enter()">
          <AppIcon name="crown" :size="16" /> {{ isLoggedIn ? enterLabel : page.finale.cta }}
        </GoldButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
.ticker-track {
  animation: ticker 38s linear infinite;
}
.ticker:hover .ticker-track {
  animation-play-state: paused;
}
@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
</style>
