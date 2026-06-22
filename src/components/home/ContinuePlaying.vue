<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { lobbyGames, gameSlug } from '@/data/casinoGames'
import { useReveal } from '@/composables/useReveal'

/**
 * Continue Playing — premium "resume your session" media cards (Netflix-style,
 * not slot thumbnails): last-played, progress, favourite, continue overlay.
 */
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.08 })

const track = ref<HTMLElement | null>(null)
function scroll(dir: number) {
  const el = track.value
  if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 700), behavior: 'smooth' })
}

const items = [
  { name: 'Gates of Olympus', ago: '10 min ago', progress: 72 },
  { name: 'Sugar Rush', ago: '25 min ago', progress: 65 },
  { name: 'Starlight Princess', ago: '1 hr ago', progress: 88 },
  { name: 'Zeus vs Hades', ago: '2 hr ago', progress: 60 },
  { name: 'Bounty Gold', ago: '2 hr ago', progress: 75 },
  { name: 'Release the Kraken', ago: '4 hr ago', progress: 55 },
].map((it) => ({ ...it, game: lobbyGames.find((g) => g.name === it.name)! }))

const favs = ref(new Set<string>(['Gates of Olympus', 'Zeus vs Hades']))
function toggleFav(name: string) {
  favs.value.has(name) ? favs.value.delete(name) : favs.value.add(name)
  favs.value = new Set(favs.value)
}
function play(slug: string) {
  router.push(`/casino/play/${slug}`)
}
</script>

<template>
  <section ref="root" class="container-royal pt-10 sm:pt-14">
    <SectionHeader title="Continue Playing" eyebrow="Resume Your Session" align="left">
      <template #actions>
        <div class="flex items-center gap-3">
          <button class="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne/80 transition-colors hover:text-gold-bright" @click="router.push('/casino')">View all</button>
          <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll left" @click="scroll(-1)"><AppIcon name="arrowLeft" :size="14" /></button>
          <button class="grid h-8 w-8 place-items-center rounded-full border border-border-gold/30 text-ink-muted transition-colors hover:border-border-gold hover:text-gold-bright" aria-label="Scroll right" @click="scroll(1)"><AppIcon name="arrowRight" :size="14" /></button>
        </div>
      </template>
    </SectionHeader>

    <ul ref="track" class="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-reveal>
      <li v-for="it in items" :key="it.name" class="w-[240px] shrink-0 sm:w-[266px]">
        <article
          class="group cursor-pointer overflow-hidden rounded-[18px] border border-border-gold/15 bg-card shadow-[0_14px_36px_-16px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(245,215,122,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-card-lift motion-reduce:transform-none"
          @click="play(gameSlug(it.game))"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img :src="it.game.image" :alt="it.name" loading="lazy" decoding="async"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none" />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <span class="absolute left-3 top-3 rounded-md border border-border-gold/40 bg-black/55 px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.16em] text-champagne backdrop-blur">Recently Played</span>

            <button
              class="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-border-gold/40 bg-black/45 backdrop-blur transition-colors hover:border-gold"
              :class="favs.has(it.name) ? 'text-gold-bright' : 'text-ink-muted'"
              :aria-pressed="favs.has(it.name)" :aria-label="`Favourite ${it.name}`"
              @click.stop="toggleFav(it.name)"
            ><AppIcon name="star" :size="14" /></button>

            <!-- Continue overlay -->
            <div class="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span class="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a1407]"><AppIcon name="play" :size="11" /> Continue Session</span>
            </div>
          </div>

          <div class="px-4 py-3.5">
            <div class="flex items-baseline justify-between gap-2">
              <p class="truncate font-sans text-[13px] font-semibold text-ink transition-colors group-hover:text-gold-bright">{{ it.name }}</p>
              <span class="shrink-0 font-sans text-[11px] font-semibold tabular-nums text-gold-bright">{{ it.progress }}%</span>
            </div>
            <p class="mt-0.5 truncate font-sans text-[10px] uppercase tracking-[0.08em] text-ink-dim">{{ it.game.provider }}</p>

            <!-- Progress -->
            <div class="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
              <div class="h-full rounded-full bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.5)]" :style="{ width: `${it.progress}%` }" />
            </div>
            <p class="mt-2.5 flex items-center gap-1.5 font-sans text-[10px] text-ink-dim">
              <AppIcon name="clock" :size="11" class="text-gold/60" /> Played {{ it.ago }}
            </p>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>
