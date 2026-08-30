<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GamesFilterBar from '@/components/page/GamesFilterBar.vue'
import GameTile from '@/components/page/GameTile.vue'
import { lobbyGames, gameSlug, type LobbyGame } from '@/data/casinoGames'
import { useFavorites } from '@/composables/useFavorites'
import { useRecentlyPlayed } from '@/composables/useRecentlyPlayed'

/** Reusable royal game lobby — defaults to the casino catalogue. */
const props = withDefaults(
  defineProps<{ title?: string; games?: LobbyGame[]; navigable?: boolean; flush?: boolean }>(),
  { title: 'All Games', games: () => lobbyGames, navigable: true, flush: false },
)

const router = useRouter()
const providers = computed(() => [...new Set(props.games.map((g) => g.provider))])

/** THRONE casino lobby: searchable, filterable game grid with royal styling. */

const query = ref('')
const provider = ref('all')
const sort = ref('popular')
const favOnly = ref(false)

const { favorites } = useFavorites()
const { recent } = useRecentlyPlayed()

const sortOptions = [
  { value: 'popular', label: 'Sort: Popular' },
  { value: 'az', label: 'Sort: A – Z' },
  { value: 'rtp', label: 'Sort: RTP High – Low' },
]

const filtered = computed(() => {
  const list = props.games.filter(
    (g) =>
      (provider.value === 'all' || g.provider === provider.value) &&
      (!favOnly.value || favorites.has(gameSlug(g))) &&
      g.name.toLowerCase().includes(query.value.trim().toLowerCase()),
  )
  if (sort.value === 'az') return [...list].sort((a, b) => a.name.localeCompare(b.name))
  if (sort.value === 'rtp')
    return [...list].sort((a, b) => parseFloat(b.rtp ?? '0') - parseFloat(a.rtp ?? '0'))
  // Default: the catalogue's own order. The data file IS the curation — the
  // founder arranges games by editing it, and the default view never re-sorts.
  return list
})

/** Favorited games within THIS catalogue — the chip count stays honest per lobby. */
const favCount = computed(() => props.games.filter((g) => favorites.has(gameSlug(g))).length)

/** Recently played, limited to games that exist in this catalogue. */
const recentGames = computed(() =>
  recent.value
    .map((slug) => props.games.find((g) => gameSlug(g) === slug))
    .filter((g): g is LobbyGame => Boolean(g)),
)

function open(g: LobbyGame) {
  if (props.navigable) router.push(`/casino/play/${gameSlug(g)}`)
}
</script>

<template>
  <section class="container-royal" :class="flush ? '' : 'pt-12 sm:pt-16'">
    <GamesFilterBar
      :title="title"
      :count="filtered.length"
      :filter-options="providers"
      :sort-options="sortOptions"
      v-model:query="query"
      v-model:filter="provider"
      v-model:sort="sort"
    />

    <!-- Favorites filter chip -->
    <div class="-mt-3 mb-5">
      <button
        class="flex h-9 items-center gap-2 rounded-full border px-4 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
        :class="favOnly
          ? 'border-gold bg-gold-gradient text-[#1a1407] shadow-gold-soft'
          : 'border-border-gold/60 bg-black/40 text-ink-muted hover:border-gold hover:text-gold-bright'"
        :aria-pressed="favOnly"
        @click="favOnly = !favOnly"
      >
        <AppIcon name="star" :size="12" /> Favorites
        <span class="tabular-nums">{{ favCount }}</span>
      </button>
    </div>

    <!-- Recently played -->
    <div v-if="recentGames.length" class="mb-6">
      <p class="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-dim">
        Recently Played
      </p>
      <div class="flex gap-3 overflow-x-auto pb-1">
        <button
          v-for="g in recentGames"
          :key="gameSlug(g)"
          class="group flex w-44 shrink-0 items-center gap-2.5 rounded-xl border border-border-gold/40 bg-card/70 p-2 text-left transition-colors hover:border-gold"
          @click="open(g)"
        >
          <img :src="g.image" alt="" loading="lazy" decoding="async" class="h-10 w-10 shrink-0 rounded-lg object-cover" />
          <span class="min-w-0">
            <span class="block truncate font-sans text-[11px] font-semibold text-ink transition-colors group-hover:text-gold-bright">{{ g.name }}</span>
            <span class="block truncate font-sans text-[9px] text-ink-dim">{{ g.provider }}</span>
          </span>
        </button>
      </div>
    </div>

    <!-- Grid — 3-up on mobile so a viewport shows a real shelf of games -->
    <div class="grid grid-cols-3 gap-2.5 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
      <GameTile
        v-for="g in filtered"
        :key="g.name"
        :title="g.name"
        :subtitle="g.provider"
        :rtp="g.rtp"
        :image="g.image"
        :hot="g.hot"
        :is-new="g.isNew"
        :fav-id="gameSlug(g)"
        @select="open(g)"
      />
    </div>

    <!-- Empty state -->
    <p v-if="!filtered.length" class="py-16 text-center font-sans text-sm text-ink-dim">
      {{ favOnly
        ? 'No favorites yet — tap the star on any game to keep it here.'
        : 'No games match your search — the vault holds more soon.' }}
    </p>
  </section>
</template>
