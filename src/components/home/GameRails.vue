<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { lobbyGames, gameSlug } from '@/data/casinoGames'
import { useReveal } from '@/composables/useReveal'

/**
 * Home game rails — "Continue Playing" + "Popular Games" horizontal scrollers,
 * reusing the real casino catalogue. Premium dark-gold cards, scroll arrows,
 * reduced-motion safe.
 */
const router = useRouter()

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.12 })

const rails = [
  { title: 'Continue Playing', games: lobbyGames.slice(0, 10) },
  { title: 'Popular Games', games: [...lobbyGames].reverse().slice(0, 10) },
]

const trackEls = ref<(HTMLElement | null)[]>([])
function scroll(i: number, dir: number) {
  const el = trackEls.value[i]
  if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: 'smooth' })
}
function play(g: (typeof lobbyGames)[number]) {
  router.push(`/casino/play/${gameSlug(g)}`)
}
</script>

<template>
  <section ref="root" class="container-royal pt-12 sm:pt-16">
    <div v-for="(rail, i) in rails" :key="rail.title" class="mb-10 last:mb-0" data-reveal>
      <div class="mb-4 flex items-center justify-between gap-4">
        <h2 class="font-display text-lg font-semibold uppercase tracking-[0.16em] text-gold-gradient">{{ rail.title }}</h2>
        <div class="flex items-center gap-3">
          <button class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90 transition-colors hover:text-gold-bright" @click="router.push('/games')">View all</button>
          <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll left" @click="scroll(i, -1)">
            <AppIcon name="arrowLeft" :size="14" />
          </button>
          <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll right" @click="scroll(i, 1)">
            <AppIcon name="arrowRight" :size="14" />
          </button>
        </div>
      </div>

      <ul
        :ref="(el) => (trackEls[i] = el as HTMLElement)"
        class="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <li v-for="g in rail.games" :key="g.name" class="w-[140px] shrink-0 sm:w-[160px]">
          <article
            class="group cursor-pointer overflow-hidden rounded-2xl border border-border-gold/20 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold motion-reduce:transform-none"
            @click="play(g)"
          >
            <div class="relative aspect-square overflow-hidden">
              <img :src="g.image" :alt="g.name" loading="lazy" decoding="async"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none" />
              <span v-if="g.hot" class="absolute left-2 top-2 flex items-center gap-1 rounded bg-gold-gradient px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.12em] text-bg">
                <AppIcon name="crown" :size="9" /> Hot
              </span>
              <span v-else-if="g.isNew" class="absolute left-2 top-2 rounded border border-gold/60 bg-black/60 px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.12em] text-gold-bright backdrop-blur">New</span>
              <div class="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span class="rounded-full bg-gold-gradient px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-bg">Play</span>
              </div>
            </div>
            <div class="px-3 py-2.5">
              <p class="truncate font-sans text-[12px] font-semibold text-ink transition-colors group-hover:text-gold-bright">{{ g.name }}</p>
              <p class="mt-0.5 truncate font-sans text-[10px] uppercase tracking-[0.06em] text-ink-dim">{{ g.provider }}</p>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
