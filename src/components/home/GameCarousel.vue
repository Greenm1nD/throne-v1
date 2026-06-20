<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { gameSlug, type LobbyGame } from '@/data/casinoGames'
import { useReveal } from '@/composables/useReveal'

/**
 * Reusable horizontal game carousel — one luxury card row used both for
 * "Continue Playing" (lg cards) and "Trending Now" (sm cards). Gold hover
 * border, soft lift, play-icon overlay, HOT/NEW badges. Reduced-motion safe.
 */
withDefaults(
  defineProps<{
    title: string
    games: LobbyGame[]
    viewAllTo?: string
    variant?: 'lg' | 'sm'
  }>(),
  { variant: 'lg' },
)

const router = useRouter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.08 })

const track = ref<HTMLElement | null>(null)
function scroll(dir: number) {
  const el = track.value
  if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 640), behavior: 'smooth' })
}
function play(g: LobbyGame) {
  router.push(`/casino/play/${gameSlug(g)}`)
}
</script>

<template>
  <div ref="root">
    <div class="mb-5 flex items-end justify-between gap-4" data-reveal>
      <h2 class="font-display text-lg font-semibold uppercase tracking-[0.22em] text-gold-gradient sm:text-xl">{{ title }}</h2>
      <div class="flex items-center gap-3">
        <button v-if="viewAllTo"
          class="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne/80 transition-colors hover:text-gold-bright"
          @click="router.push(viewAllTo)">View all</button>
        <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll left" @click="scroll(-1)">
          <AppIcon name="arrowLeft" :size="14" />
        </button>
        <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll right" @click="scroll(1)">
          <AppIcon name="arrowRight" :size="14" />
        </button>
      </div>
    </div>

    <ul ref="track" class="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-reveal>
      <li v-for="g in games" :key="g.name" class="shrink-0"
        :class="variant === 'lg' ? 'w-[208px] sm:w-[248px]' : 'w-[150px] sm:w-[168px]'">
        <article
          class="group cursor-pointer overflow-hidden rounded-[18px] border border-border-gold/15 bg-card shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(245,215,122,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-card-lift motion-reduce:transform-none"
          @click="play(g)"
        >
          <div class="relative overflow-hidden" :class="variant === 'lg' ? 'aspect-[4/3]' : 'aspect-square'">
            <img :src="g.image" :alt="g.name" loading="lazy" decoding="async"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            <!-- Badges -->
            <span v-if="g.hot" class="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-md bg-gold-gradient px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-[#1a1407] shadow-gold-soft">
              <AppIcon name="crown" :size="9" /> Hot
            </span>
            <span v-else-if="g.isNew" class="absolute left-2.5 top-2.5 rounded-md border border-gold/50 bg-black/60 px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur">New</span>

            <!-- Corner play chip -->
            <span class="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full border border-border-gold/40 bg-black/45 text-gold-bright backdrop-blur transition-colors group-hover:border-gold">
              <AppIcon name="play" :size="11" />
            </span>

            <!-- Hover overlay -->
            <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span class="rounded-full bg-gold-gradient px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a1407]">Play</span>
            </div>
          </div>

          <div class="px-3.5 py-3">
            <p class="truncate font-sans font-semibold text-ink transition-colors group-hover:text-gold-bright"
              :class="variant === 'lg' ? 'text-[13px]' : 'text-[12px]'">{{ g.name }}</p>
            <p class="mt-1 flex items-center gap-1.5 truncate font-sans text-[10px] uppercase tracking-[0.08em] text-ink-dim">
              <span class="h-1 w-1 rounded-full bg-gold/70" /> {{ g.provider }}
            </p>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>
