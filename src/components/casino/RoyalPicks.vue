<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { lobbyGames, gameSlug } from '@/data/casinoGames'

/**
 * Royal Picks — a curated, editorial 3-up of hand-selected games (polish flag).
 * Gives the casino lobby a premium "the court recommends" anchor above the full
 * searchable grid, instead of dropping the visitor straight into 100+ thumbnails.
 * Pure presentation: derives its three games from the existing catalogue.
 */
const reasons: Record<string, string> = {
  'Gates of Olympus': 'The house favourite — divine multipliers to 500×.',
  'Zeus vs Hades': 'A clash of gods with dual-reel volatility.',
  'The Ultimate 5': 'Five reels of pure high-stakes momentum.',
}
const numerals = ['I', 'II', 'III']
const picks = Object.keys(reasons)
  .map((name) => lobbyGames.find((g) => g.name === name))
  .filter((g): g is NonNullable<typeof g> => Boolean(g))

const router = useRouter()
const open = (slug: string) => router.push(`/casino/play/${slug}`)
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <!-- Header -->
    <div class="mb-6 flex items-end justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="h-6 w-1 rounded-full bg-gold-gradient shadow-gold-soft" />
        <div>
          <h2 class="font-display text-xl font-semibold tracking-[0.16em] text-gold-gradient">
            Royal Picks
          </h2>
          <p class="eyebrow mt-1">Hand-selected by the court</p>
        </div>
      </div>
    </div>

    <!-- Curated 3-up -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(g, i) in picks"
        :key="g.name"
        v-glow
        data-reveal
        class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border-gold/70 bg-card shadow-[inset_0_1px_0_rgba(245,215,122,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-lift"
        @click="open(gameSlug(g))"
      >
        <div class="relative aspect-[16/10] overflow-hidden">
          <img
            :src="g.image"
            :alt="g.name"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <!-- Roman-numeral rank chip -->
          <span
            class="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-gold/50 bg-black/55 font-display text-[13px] font-bold tracking-[0.04em] text-gold-bright backdrop-blur"
          >
            {{ numerals[i] }}
          </span>
          <div
            class="pointer-events-none absolute inset-0"
            style="background: linear-gradient(180deg, rgba(5,5,5,0) 45%, rgba(5,5,5,0.82))"
          />
          <span class="shine-beam z-10" />
        </div>

        <div class="flex flex-1 flex-col gap-3 px-5 py-5">
          <div>
            <h3 class="font-display text-lg font-semibold tracking-[0.06em] text-champagne transition-colors group-hover:text-gold-bright">
              {{ g.name }}
            </h3>
            <p class="mt-1 flex items-center gap-2 font-sans text-[11px] text-ink-dim">
              <span class="h-1 w-1 rounded-full bg-gold/70" /> {{ g.provider }}
              <span v-if="g.rtp" class="text-ink-dim">· RTP {{ g.rtp }}%</span>
            </p>
          </div>
          <p class="font-sans text-[12.5px] leading-relaxed text-ink-muted">
            {{ reasons[g.name] }}
          </p>
          <GoldButton variant="outline" size="sm" class="mt-auto self-start" @click.stop="open(gameSlug(g))">
            <AppIcon name="play" :size="12" /> Play Now
          </GoldButton>
        </div>
      </article>
    </div>
  </section>
</template>
