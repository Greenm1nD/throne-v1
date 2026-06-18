<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { lobbyGames, gameSlug } from '@/data/casinoGames'

/**
 * Royal Picks — a curated, editorial pick of hand-selected games (polish flag).
 * Tiles match the lobby grid below 1:1 in size (same columns, same card shape),
 * so it reads as "the court's shortlist" above the full catalogue, not a banner.
 */
const numerals = ['I', 'II', 'III']
const picks = ['Gates of Olympus', 'Zeus vs Hades', 'The Ultimate 5']
  .map((name) => lobbyGames.find((g) => g.name === name))
  .filter((g): g is NonNullable<typeof g> => Boolean(g))

const router = useRouter()
const favs = ref(new Set<string>())
function toggleFav(name: string) {
  favs.value.has(name) ? favs.value.delete(name) : favs.value.add(name)
  favs.value = new Set(favs.value)
}
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <!-- Header -->
    <div class="mb-6 flex items-center gap-3">
      <span class="h-6 w-1 rounded-full bg-gold-gradient shadow-gold-soft" />
      <div>
        <h2 class="font-display text-xl font-semibold tracking-[0.16em] text-gold-gradient">
          Royal Picks
        </h2>
        <p class="eyebrow mt-1">Hand-selected by the court</p>
      </div>
    </div>

    <!-- Same grid + card size as the lobby below -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <article
        v-for="(g, i) in picks"
        :key="g.name"
        v-glow
        data-reveal
        class="group cursor-pointer overflow-hidden rounded-xl border border-border-gold/70 bg-card shadow-[inset_0_1px_0_rgba(245,215,122,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-lift"
        @click="router.push(`/casino/play/${gameSlug(g)}`)"
      >
        <div class="relative aspect-square overflow-hidden">
          <img
            :src="g.image"
            :alt="g.name"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <!-- Roman-numeral rank chip -->
          <span
            class="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-gold/50 bg-black/55 font-display text-[12px] font-bold text-gold-bright backdrop-blur"
          >
            {{ numerals[i] }}
          </span>

          <!-- Hover play overlay -->
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
          >
            <GoldButton variant="solid" size="sm">
              <AppIcon name="play" :size="12" /> Play
            </GoldButton>
          </div>
          <span class="shine-beam z-10" />
        </div>

        <div class="flex items-center justify-between gap-2 px-3 py-3">
          <div class="min-w-0">
            <p class="truncate font-sans text-[12px] font-semibold text-ink transition-colors group-hover:text-gold-bright">
              {{ g.name }}
            </p>
            <p class="mt-0.5 flex items-center gap-1.5 font-sans text-[10px] text-ink-dim">
              <span class="h-1 w-1 rounded-full bg-gold/70" /> {{ g.provider }}
            </p>
          </div>
          <button
            class="-mr-2 grid h-11 w-11 shrink-0 place-items-center transition-colors"
            :class="favs.has(g.name) ? 'text-gold-bright' : 'text-ink-dim hover:text-gold'"
            :aria-pressed="favs.has(g.name)"
            :aria-label="`Favorite ${g.name}`"
            @click.stop="toggleFav(g.name)"
          >
            <AppIcon name="star" :size="15" />
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
