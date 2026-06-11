<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRevealEach } from '@/composables/useReveal'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { findGame, lobbyGames, gameSlug } from '@/data/casinoGames'

const route = useRoute()
const router = useRouter()

const game = computed(() => findGame(String(route.params.slug)) ?? lobbyGames[0])
const playing = ref(false)
const mode = ref<'real' | 'demo'>('real')
const fav = ref(false)

const rootEl = ref<HTMLElement | null>(null)
useRevealEach(rootEl)

// Switching to another game resets the session state.
watch(() => route.params.slug, () => {
  playing.value = false
  fav.value = false
})

const popular = computed(() =>
  lobbyGames.filter((g) => g !== game.value).slice(0, 6),
)

const controls = [
  { icon: 'star', label: 'Favorite', act: () => (fav.value = !fav.value) },
  { icon: 'refresh', label: 'Reload', act: () => (playing.value = false) },
  { icon: 'vault', label: 'Lobby', act: () => router.push('/casino') },
  { icon: 'x', label: 'Close', act: () => router.push('/casino') },
]
</script>

<template>
  <main ref="rootEl" class="pb-4">
    <div class="container-royal pt-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.12em]" aria-label="Breadcrumb">
        <RouterLink to="/" class="text-ink-dim transition-colors hover:text-gold-bright">Home</RouterLink>
        <span class="text-gold/50">/</span>
        <RouterLink to="/casino" class="text-ink-dim transition-colors hover:text-gold-bright">Casino</RouterLink>
        <span class="text-gold/50">/</span>
        <span class="text-champagne">{{ game.name }}</span>
      </nav>

      <!-- Game frame -->
      <div class="card-lux mt-5 overflow-hidden p-0 hover:translate-y-0" data-reveal>
        <div class="relative aspect-video max-h-[680px] w-full overflow-hidden">
          <!-- Blurred art backdrop -->
          <div
            class="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
            :style="{ backgroundImage: `url('${game.image}')` }"
          />
          <div class="absolute inset-0" style="background: radial-gradient(70% 70% at 50% 45%, rgba(5,5,5,0.55), rgba(5,5,5,0.92))" />

          <!-- Frame controls -->
          <div class="absolute right-4 top-4 z-20 flex gap-2">
            <button
              v-for="c in controls"
              :key="c.label"
              :aria-label="c.label"
              class="grid h-10 w-10 place-items-center rounded-full border border-border-gold/60 bg-black/60 backdrop-blur transition-all duration-300 hover:border-gold hover:text-gold-bright"
              :class="c.icon === 'star' && fav ? 'text-gold-bright' : 'text-champagne'"
              @click="c.act"
            >
              <FontIcon v-if="c.icon === 'refresh'" name="refresh" class="text-[15px]" />
              <AppIcon v-else :name="c.icon" :size="16" />
            </button>
          </div>

          <!-- Live provider game -->
          <iframe
            v-if="playing && game.src"
            :src="game.src"
            class="absolute inset-0 h-full w-full border-0"
            :title="game.name"
            allow="fullscreen; autoplay"
          />

          <!-- Pre-launch / placeholder session -->
          <div v-else class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <template v-if="!playing">
              <img :src="game.image" :alt="game.name" class="h-28 w-28 rounded-xl border border-border-gold object-cover shadow-gold-soft" />
              <h1 class="font-display text-3xl font-bold tracking-[0.1em] text-gold-gradient sm:text-4xl">
                {{ game.name }}
              </h1>
              <!-- Royal launch button -->
              <button
                class="group relative grid h-20 w-20 place-items-center rounded-full bg-gold-gradient text-[#1a1407] shadow-gold transition-transform duration-300 hover:scale-105 active:scale-95"
                aria-label="Launch game"
                @click="playing = true"
              >
                <span class="absolute -inset-2 animate-ringRotate rounded-full border border-dashed border-gold/40" />
                <AppIcon name="play" :size="30" />
              </button>
              <p class="font-sans text-[11px] uppercase tracking-[0.3em] text-ink-dim">
                {{ mode === 'real' ? 'Enter the table' : 'Practice round' }}
              </p>
            </template>

            <!-- Launched but no provider URL configured yet -->
            <template v-else>
              <div class="relative flex h-20 w-20 items-center justify-center">
                <svg class="absolute inset-0 h-full w-full animate-ringRotate" style="animation-duration: 2.4s" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="rgba(212,175,55,0.18)" stroke-width="2.5" />
                  <circle cx="50" cy="50" r="45" stroke="#F5D77A" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="70 213" />
                </svg>
                <img src="/assets/images/crown-duke.png" alt="" class="h-8 w-auto" />
              </div>
              <p class="font-display text-lg font-semibold tracking-[0.16em] text-gold-gradient">
                Summoning the reels
              </p>
              <p class="max-w-sm font-sans text-[12px] leading-relaxed text-ink-dim">
                The game session is served by the provider once its launch URL is configured — the THRONE frame, controls and balance shell wrap around it.
              </p>
            </template>
          </div>
        </div>

        <!-- Info bar -->
        <div class="flex flex-col gap-4 border-t border-white/5 bg-card/80 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-display text-base font-semibold tracking-[0.1em] text-champagne">{{ game.name }}</p>
            <p class="mt-0.5 flex items-center gap-1.5 font-sans text-[11px] text-ink-dim">
              <span class="h-1 w-1 rounded-full bg-gold/70" /> {{ game.provider }} · RTP {{ game.rtp }}%
            </p>
          </div>
          <div class="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
            <button
              v-for="m in (['real', 'demo'] as const)"
              :key="m"
              class="rounded-full px-5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
              :class="mode === m ? 'bg-gold-gradient text-[#1a1407] shadow-gold-soft' : 'text-ink-muted hover:text-gold-bright'"
              @click="mode = m"
            >
              {{ m === 'real' ? 'Real Play' : 'Demo' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Popular casino games -->
      <div class="mt-12" data-reveal>
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="h-6 w-1 rounded-full bg-gold-gradient shadow-gold-soft" />
            <h2 class="font-display text-lg font-semibold tracking-[0.16em] text-gold-gradient">
              Popular Casino Games
            </h2>
          </div>
          <RouterLink to="/casino">
            <GoldButton variant="ghost" size="sm">See All <AppIcon name="arrowRight" :size="13" /></GoldButton>
          </RouterLink>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
          <RouterLink
            v-for="g in popular"
            :key="g.name"
            :to="`/casino/play/${gameSlug(g)}`"
            class="group overflow-hidden rounded-xl border border-border-gold/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-lift"
          >
            <div class="relative aspect-square overflow-hidden">
              <img :src="g.image" :alt="g.name" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <span
                v-if="g.hot"
                class="absolute left-2 top-2 flex items-center gap-1 rounded bg-gold-gradient px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#1a1407]"
              >
                <AppIcon name="crown" :size="10" /> Hot
              </span>
              <span
                v-else-if="g.isNew"
                class="absolute left-2 top-2 rounded border border-gold/60 bg-black/60 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur"
              >
                New
              </span>
            </div>
            <div class="px-3 py-3">
              <p class="truncate font-sans text-[12px] font-semibold text-ink transition-colors group-hover:text-gold-bright">{{ g.name }}</p>
              <p class="mt-0.5 flex items-center gap-1.5 font-sans text-[10px] text-ink-dim">
                <span class="h-1 w-1 rounded-full bg-gold/70" /> {{ g.provider }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
