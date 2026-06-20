<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import GamesFilterBar from '@/components/page/GamesFilterBar.vue'
import { lobbyGames, gameSlug, type LobbyGame } from '@/data/casinoGames'

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
const visible = ref(12)
const favs = ref(new Set<string>())

const filtered = computed(() => {
  let list = props.games.filter(
    (g) =>
      (provider.value === 'all' || g.provider === provider.value) &&
      g.name.toLowerCase().includes(query.value.trim().toLowerCase()),
  )
  if (sort.value === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  return list
})

const shown = computed(() => filtered.value.slice(0, visible.value))

function toggleFav(name: string) {
  favs.value.has(name) ? favs.value.delete(name) : favs.value.add(name)
  favs.value = new Set(favs.value)
}
</script>

<template>
  <section class="container-royal" :class="flush ? '' : 'pt-12 sm:pt-16'">
    <GamesFilterBar
      :title="title"
      :count="filtered.length"
      :filter-options="providers"
      v-model:query="query"
      v-model:filter="provider"
      v-model:sort="sort"
    />

    <!-- Grid -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <article
        v-for="g in shown"
        :key="g.name"
        v-glow
        class="group cursor-pointer overflow-hidden rounded-xl border border-border-gold/70 bg-card shadow-[inset_0_1px_0_rgba(245,215,122,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-lift"
        @click="navigable && router.push(`/casino/play/${gameSlug(g)}`)"
      >
        <div class="relative aspect-square overflow-hidden">
          <img
            :src="g.image"
            :alt="g.name"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <!-- Royal badges -->
          <span
            v-if="g.hot"
            class="absolute left-2 top-2 flex items-center gap-1 rounded bg-gold-gradient px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#1a1407] shadow-gold-soft"
          >
            <AppIcon name="crown" :size="10" /> Hot
          </span>
          <span
            v-else-if="g.isNew"
            class="absolute left-2 top-2 rounded border border-gold/60 bg-black/60 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur"
          >
            New
          </span>

          <!-- Hover play overlay -->
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
          >
            <GoldButton variant="solid" size="sm">
              <AppIcon name="play" :size="12" /> Play
            </GoldButton>
          </div>
          <span class="shine-beam" />
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

    <!-- Empty state -->
    <p v-if="!filtered.length" class="py-16 text-center font-sans text-sm text-ink-dim">
      No games match your search — the vault holds more soon.
    </p>

    <!-- Load more -->
    <div v-if="visible < filtered.length" class="mt-8 flex justify-center">
      <GoldButton variant="outline" size="md" @click="visible += 6">
        Load More Games <AppIcon name="chevronDown" :size="14" />
      </GoldButton>
    </div>
  </section>
</template>
