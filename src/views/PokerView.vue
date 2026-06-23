<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useEnter } from '@/composables/useEnter'
import { useRevealEach } from '@/composables/useReveal'
import {
  pokerHero, jackpotPool, pokerStats, liveCashGames, topPlayers, tournaments, pokerFeatures,
} from '@/data/poker'

/**
 * THRONE Poker — dedicated premium poker room page.
 * Hero + jackpot pool · quick stats · live cash games + top players ·
 * upcoming tournaments · feature strip. Data-driven; table collapses to cards
 * on mobile; hover lift + reduced-motion safe.
 */
const { enter } = useEnter()
const root = ref<HTMLElement | null>(null)
useRevealEach(root)

// Hero backdrop scroll parallax (desktop, GPU-only, reduced-motion safe).
const heroSec = ref<HTMLElement | null>(null)
const heroBg = ref<HTMLElement | null>(null)
let raf = 0
function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const el = heroBg.value
    const sec = heroSec.value
    if (!el || !sec) return
    const r = sec.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (r.bottom < -80 || r.top > vh + 80) return
    const prog = (r.top + r.height / 2 - vh / 2) / vh
    const y = Math.max(-42, Math.min(42, -prog * 84))
    el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
  })
}
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = window.matchMedia('(min-width: 1024px)').matches
  if (reduce || !desktop) return
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <main ref="root" class="pb-8">
    <!-- ── Hero + Jackpot Pool ──────────────────────────────────────────── -->
    <section ref="heroSec" class="container-royal pt-6 sm:pt-8">
      <div class="relative overflow-hidden rounded-3xl border border-border-gold/30" data-reveal>
        <div
          ref="heroBg"
          v-lazybg="`linear-gradient(90deg, rgba(5,5,6,0.97) 0%, rgba(5,5,6,0.82) 42%, rgba(5,5,6,0.5) 100%), url('${pokerHero.image}')`"
          class="absolute inset-0 scale-[1.14] bg-cover bg-center will-change-transform"
        />
        <div class="relative z-10 grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:p-12">
          <!-- Left: copy -->
          <div>
            <p class="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne/80">{{ pokerHero.label }}</p>
            <h1 class="mt-3 font-display text-4xl font-bold uppercase leading-[1.05] tracking-[0.02em] sm:text-5xl lg:text-6xl">
              <span class="block text-ink">{{ pokerHero.titleA }}</span>
              <span class="block text-gold-gradient">{{ pokerHero.titleB }}</span>
            </h1>
            <p class="mt-4 font-sans text-[15px] text-champagne">{{ pokerHero.sub }}</p>
            <p class="mt-2 max-w-md font-sans text-[13px] leading-7 text-ink-muted">{{ pokerHero.body }}</p>

            <div class="mt-6 flex flex-wrap gap-3">
              <GoldButton variant="solid" size="lg" @click="enter()">Play Now <AppIcon name="arrowRight" :size="15" /></GoldButton>
              <GoldButton variant="outline" size="lg" @click="enter()">How to Play <AppIcon name="play" :size="14" /></GoldButton>
            </div>

            <ul class="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <li v-for="h in pokerHero.highlights" :key="h.title" class="flex items-center gap-2.5">
                <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-gold/40 text-gold-bright">
                  <AppIcon :name="h.icon" :size="16" />
                </span>
                <span>
                  <span class="block font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-ink">{{ h.title }}</span>
                  <span class="block font-sans text-[11px] text-ink-dim">{{ h.sub }}</span>
                </span>
              </li>
            </ul>
          </div>

          <!-- Right: jackpot pool card -->
          <div class="jackpot-card rounded-2xl border border-border-gold/50 bg-black/55 p-6 backdrop-blur-xl lg:justify-self-end lg:max-w-xs">
            <div class="flex items-center justify-between">
              <p class="eyebrow">{{ jackpotPool.label }}</p>
              <AppIcon name="chart" :size="16" class="text-gold/70" />
            </div>
            <p class="mt-2 font-display text-4xl font-bold tabular-nums text-gold-gradient">{{ jackpotPool.amount }}</p>
            <div class="mt-4 flex items-center gap-3">
              <div class="flex -space-x-2">
                <span v-for="i in 4" :key="i" class="grid h-7 w-7 place-items-center rounded-full border border-card bg-black/70 text-gold/80">
                  <AppIcon name="chip" :size="13" />
                </span>
              </div>
              <span class="font-sans text-[12px] text-ink-muted">{{ jackpotPool.players }}</span>
            </div>
            <GoldButton variant="outline" size="md" block class="mt-5" @click="enter()">
              View Jackpot <AppIcon name="arrowRight" :size="14" />
            </GoldButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Quick stats ──────────────────────────────────────────────────── -->
    <section class="container-royal pt-6">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <button
          v-for="s in pokerStats" :key="s.label"
          class="group flex items-center gap-3 rounded-2xl border border-border-gold/15 bg-card/70 px-5 py-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border-gold/50 motion-reduce:transform-none"
          @click="enter()"
        >
          <AppIcon :name="s.icon" :size="22" class="shrink-0 text-gold/80" />
          <span class="min-w-0">
            <span class="block font-display text-lg font-bold tabular-nums text-ink">{{ s.value }}</span>
            <span class="block truncate font-sans text-[11px] uppercase tracking-[0.1em] text-ink-dim">{{ s.label }}</span>
          </span>
        </button>
      </div>
    </section>

    <!-- ── Live Cash Games + Top Players ────────────────────────────────── -->
    <section class="container-royal grid gap-4 pt-10 sm:pt-14 lg:grid-cols-[2fr_1fr]">
      <!-- Live cash games -->
      <div class="rounded-2xl border border-border-gold/15 bg-card/70 p-5 sm:p-6" data-reveal>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="flex items-center gap-2 font-display text-[15px] font-semibold uppercase tracking-[0.16em] text-champagne">
            <AppIcon name="crown" :size="16" class="text-gold/80" /> Live Cash Games
          </h2>
          <button class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90 hover:text-gold-bright">View all</button>
        </div>

        <!-- Desktop table -->
        <table class="hidden w-full text-left md:table">
          <thead>
            <tr class="border-b border-border-gold/15 font-sans text-[10px] uppercase tracking-[0.12em] text-ink-dim">
              <th class="py-2.5 pr-3 font-medium">Table</th>
              <th class="px-3 py-2.5 font-medium">Stakes</th>
              <th class="px-3 py-2.5 font-medium">Players</th>
              <th class="px-3 py-2.5 font-medium">Avg Pot</th>
              <th class="py-2.5 pl-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in liveCashGames" :key="g.table" class="group border-b border-border-gold/10 transition-colors last:border-0 hover:bg-white/[0.03]">
              <td class="py-3 pr-3">
                <div class="flex items-center gap-2.5">
                  <AppIcon name="spade" :size="15" :class="g.featured ? 'text-gold-bright' : 'text-gold/55'" />
                  <span>
                    <span class="block font-sans text-[13px] font-semibold text-ink">{{ g.table }}</span>
                    <span class="block font-sans text-[11px] text-ink-dim">{{ g.game }}</span>
                  </span>
                </div>
              </td>
              <td class="px-3 py-3 font-sans text-[13px] tabular-nums text-champagne">{{ g.stakes }}</td>
              <td class="px-3 py-3 font-sans text-[13px] tabular-nums text-ink-muted">{{ g.players }}</td>
              <td class="px-3 py-3 font-sans text-[13px] tabular-nums text-gold-bright">{{ g.pot }}</td>
              <td class="py-3 pl-3 text-right">
                <button class="join-btn rounded-lg border border-border-gold/60 px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-gold-bright transition-colors hover:bg-gold-gradient hover:text-bg" @click="enter()">Join</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile cards -->
        <ul class="space-y-3 md:hidden">
          <li v-for="g in liveCashGames" :key="g.table" class="rounded-xl border border-border-gold/15 bg-black/30 p-4">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <AppIcon name="spade" :size="15" :class="g.featured ? 'text-gold-bright' : 'text-gold/55'" />
                <span>
                  <span class="block font-sans text-[13px] font-semibold text-ink">{{ g.table }}</span>
                  <span class="block font-sans text-[11px] text-ink-dim">{{ g.game }}</span>
                </span>
              </div>
              <button class="shrink-0 rounded-lg border border-border-gold/60 px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-gold-bright transition-colors hover:bg-gold-gradient hover:text-bg" @click="enter()">Join</button>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-2 border-t border-border-gold/10 pt-3 text-center">
              <span><span class="block font-sans text-[9px] uppercase tracking-[0.1em] text-ink-dim">Stakes</span><span class="font-sans text-[12px] tabular-nums text-champagne">{{ g.stakes }}</span></span>
              <span><span class="block font-sans text-[9px] uppercase tracking-[0.1em] text-ink-dim">Players</span><span class="font-sans text-[12px] tabular-nums text-ink-muted">{{ g.players }}</span></span>
              <span><span class="block font-sans text-[9px] uppercase tracking-[0.1em] text-ink-dim">Avg Pot</span><span class="font-sans text-[12px] tabular-nums text-gold-bright">{{ g.pot }}</span></span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Top players -->
      <div class="rounded-2xl border border-border-gold/15 bg-card/70 p-5 sm:p-6" data-reveal>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="flex items-center gap-2 font-display text-[15px] font-semibold uppercase tracking-[0.16em] text-champagne">
            <AppIcon name="crown" :size="16" class="text-gold/80" /> Top Players
          </h2>
          <button class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90 hover:text-gold-bright">View all</button>
        </div>
        <ul class="space-y-2">
          <li v-for="p in topPlayers" :key="p.rank" class="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.03]">
            <span class="grid h-6 w-6 shrink-0 place-items-center font-display text-[13px] font-bold tabular-nums"
              :class="p.rank === 1 ? 'text-gold-bright' : 'text-ink-dim'">{{ p.rank }}</span>
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/50 bg-black/40 text-gold-bright"
              style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)">
              <AppIcon :name="p.tier === 'King' ? 'crown' : 'spade'" :size="18" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate font-sans text-[13px] font-semibold text-ink">{{ p.name }}</span>
              <span class="block font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-bright">{{ p.tier }}</span>
            </span>
            <span class="shrink-0 font-sans text-[12px] font-semibold tabular-nums text-champagne">{{ p.amount }}</span>
          </li>
        </ul>
        <GoldButton variant="outline" size="md" block class="mt-4" @click="enter()">
          <AppIcon name="trophy" :size="14" /> Leaderboard
        </GoldButton>
      </div>
    </section>

    <!-- ── Upcoming Tournaments ─────────────────────────────────────────── -->
    <section class="container-royal pt-10 sm:pt-14">
      <div class="mb-5 flex items-center justify-between">
        <h2 class="font-display text-[15px] font-semibold uppercase tracking-[0.16em] text-champagne">Upcoming Tournaments</h2>
        <button class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90 hover:text-gold-bright">View all</button>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="t in tournaments" :key="t.name"
          class="group flex flex-col rounded-2xl border border-border-gold/15 bg-card/70 p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border-gold/50 motion-reduce:transform-none" data-reveal>
          <div class="flex items-center gap-3">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/40 text-gold-bright"
              style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)">
              <AppIcon :name="t.icon" :size="20" />
            </span>
            <div class="min-w-0">
              <h3 class="truncate font-display text-[15px] font-semibold tracking-[0.04em] text-ink">{{ t.name }}</h3>
              <p class="font-sans text-[12px] font-semibold tabular-nums text-gold-bright">{{ t.gtd }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between border-t border-border-gold/10 pt-3 font-sans text-[12px]">
            <span class="text-ink-dim">Buy-in <span class="text-champagne">{{ t.buyin }}</span></span>
            <span class="inline-flex items-center gap-1.5 tabular-nums text-ink-muted"><AppIcon name="clock" :size="12" class="text-gold/70" /> {{ t.startsIn }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- ── Feature strip ────────────────────────────────────────────────── -->
    <section class="container-royal pt-10 sm:pt-14">
      <div class="grid grid-cols-2 gap-3 rounded-2xl border border-border-gold/15 bg-card/60 p-4 sm:grid-cols-3 lg:grid-cols-5 lg:p-5" data-reveal>
        <div v-for="f in pokerFeatures" :key="f.title" class="flex flex-col items-center gap-2 px-2 py-4 text-center">
          <AppIcon :name="f.icon" :size="22" class="text-gold/80" />
          <span class="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-ink">{{ f.title }}</span>
          <span class="font-sans text-[11px] leading-snug text-ink-dim">{{ f.sub }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.jackpot-card {
  box-shadow:
    inset 0 1px 0 rgba(245, 215, 122, 0.06),
    0 24px 60px -28px rgba(0, 0, 0, 0.9);
}
</style>
