<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { lobbyGames, gameSlug } from '@/data/casinoGames'
import { useReveal } from '@/composables/useReveal'

/**
 * Trending Now + Recently Won — curated social proof. Each game shows
 * popularity, active players and a rank, beside a live winners ticker.
 */
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.08 })

const track = ref<HTMLElement | null>(null)
function scroll(dir: number) {
  const el = track.value
  if (el) el.scrollBy({ left: dir * 360, behavior: 'smooth' })
}

const trending = [
  { name: 'Zeus vs Hades', tag: 'HOT', pop: 98, active: '18.7K', rank: 1 },
  { name: 'The Ultimate 5', tag: 'HOT', pop: 98, active: '12.4K', rank: 2 },
  { name: 'Gates of Olympus', tag: 'HOT', pop: 96, active: '15.2K', rank: 3 },
  { name: 'Release the Kraken', tag: 'NEW', pop: 95, active: '9.8K', rank: 4 },
  { name: 'Candy Blitz', tag: 'NEW', pop: 93, active: '10.3K', rank: 5 },
  { name: 'Bounty Gold', tag: 'NEW', pop: 90, active: '8.7K', rank: 6 },
].map((t) => ({ ...t, game: lobbyGames.find((g) => g.name === t.name)! }))

const winners = [
  { name: 'Kingmaker', amount: '€2,450', time: '2 min ago' },
  { name: 'Crown', amount: '€12,100', time: '8 min ago' },
  { name: 'Lionheart', amount: '€5,600', time: '15 min ago' },
  { name: 'Duke', amount: '€3,200', time: '23 min ago' },
]
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-20">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Trending -->
      <div class="lg:col-span-2" data-reveal>
        <SectionHeader title="Trending Now" eyebrow="The Realm Is Playing" align="left">
          <template #actions>
            <div class="flex items-center gap-3">
              <button class="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne/80 transition-colors hover:text-gold-bright" @click="router.push('/games')">View all</button>
              <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll left" @click="scroll(-1)"><AppIcon name="arrowLeft" :size="14" /></button>
              <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll right" @click="scroll(1)"><AppIcon name="arrowRight" :size="14" /></button>
            </div>
          </template>
        </SectionHeader>

        <ul ref="track" class="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li v-for="t in trending" :key="t.name" class="w-[158px] shrink-0">
            <article
              class="group cursor-pointer overflow-hidden rounded-[16px] border border-border-gold/15 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-card-lift motion-reduce:transform-none"
              @click="router.push(`/casino/play/${gameSlug(t.game)}`)"
            >
              <div class="relative aspect-square overflow-hidden">
                <img :src="t.game.image" :alt="t.name" loading="lazy" decoding="async"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <span v-if="t.tag === 'HOT'" class="absolute left-2 top-2 flex items-center gap-1 rounded bg-gold-gradient px-1.5 py-0.5 font-sans text-[7px] font-bold uppercase tracking-[0.14em] text-[#1a1407]"><AppIcon name="crown" :size="8" /> Hot</span>
                <span v-else class="absolute left-2 top-2 rounded border border-gold/50 bg-black/60 px-1.5 py-0.5 font-sans text-[7px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur">New</span>
                <span class="absolute right-2 top-2 rounded-full border border-border-gold/40 bg-black/55 px-1.5 py-0.5 font-sans text-[8px] font-bold tabular-nums text-champagne backdrop-blur">#{{ t.rank }}</span>
              </div>
              <div class="px-3 py-2.5">
                <p class="truncate font-sans text-[11px] font-semibold text-ink transition-colors group-hover:text-gold-bright">{{ t.name }}</p>
                <div class="mt-2 flex items-center justify-between font-sans text-[9px] uppercase tracking-[0.06em] text-ink-dim">
                  <span class="flex items-center gap-1 text-gold-bright"><AppIcon name="chart" :size="9" /> {{ t.pop }}%</span>
                  <span class="flex items-center gap-1"><AppIcon name="user" :size="9" /> {{ t.active }}</span>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>

      <!-- Recently Won -->
      <div data-reveal class="flex flex-col overflow-hidden rounded-[18px] border border-border-gold/20 bg-card/70 shadow-[inset_0_1px_0_rgba(245,215,122,0.06)] backdrop-blur">
        <div class="flex items-center justify-between border-b border-border-gold/10 px-5 py-4">
          <h3 class="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-gradient">Recently Won</h3>
          <span class="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-champagne/70"><span class="ascent-dot h-1.5 w-1.5 rounded-full bg-gold-bright" /> Live</span>
        </div>
        <ul class="flex-1 divide-y divide-border-gold/10">
          <li v-for="w in winners" :key="w.name" class="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gold/[0.03]">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-gold/40 bg-black/30 text-gold-bright"><AppIcon name="crown" :size="15" /></span>
            <div class="min-w-0 flex-1">
              <p class="truncate font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-champagne">{{ w.name }}</p>
              <p class="font-sans text-[11px] text-ink-dim">won <span class="font-semibold text-gold-bright">{{ w.amount }}</span></p>
            </div>
            <span class="shrink-0 font-sans text-[10px] tabular-nums text-ink-dim">{{ w.time }}</span>
          </li>
        </ul>
        <button class="border-t border-border-gold/10 px-5 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-champagne/80 transition-colors hover:text-gold-bright" @click="router.push('/kingdom')">View all activity →</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ascent-dot { animation: ascentPulse 2.6s ease-out infinite; }
@keyframes ascentPulse {
  0% { box-shadow: 0 0 0 0 rgba(245,215,122,0.45); }
  70% { box-shadow: 0 0 0 6px rgba(245,215,122,0); }
  100% { box-shadow: 0 0 0 0 rgba(245,215,122,0); }
}
@media (prefers-reduced-motion: reduce) { .ascent-dot { animation: none; } }
</style>
