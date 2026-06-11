<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { lobbyGames, lobbyProviders } from '@/data/casinoGames'

/** THRONE casino lobby: searchable, filterable game grid with royal styling. */

const query = ref('')
const provider = ref('all')
const sort = ref<'popular' | 'az'>('popular')
const visible = ref(12)
const favs = ref(new Set<string>())

const filtered = computed(() => {
  let list = lobbyGames.filter(
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
  <section class="container-royal pt-12 sm:pt-16">
    <!-- Header -->
    <div class="mb-6 flex items-center gap-3">
      <span class="h-6 w-1 rounded-full bg-gold-gradient shadow-gold-soft" />
      <h2 class="font-display text-xl font-semibold tracking-[0.16em] text-gold-gradient">
        All Games
      </h2>
    </div>

    <!-- Toolbar -->
    <div class="mb-7 flex flex-col gap-3 lg:flex-row lg:items-center">
      <label class="relative flex-1 lg:max-w-md">
        <AppIcon
          name="search"
          :size="15"
          class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/60"
        />
        <input
          v-model="query"
          type="search"
          placeholder="Search the royal collection..."
          class="h-11 w-full rounded-full border border-border-gold/60 bg-black/40 pl-11 pr-4 font-sans text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none"
        />
      </label>

      <div class="flex items-center gap-3">
        <div class="relative">
          <select
            v-model="provider"
            class="h-11 appearance-none rounded-full border border-border-gold/60 bg-black/40 pl-5 pr-10 font-sans text-[12px] uppercase tracking-[0.08em] text-ink-muted focus:border-gold focus:outline-none"
          >
            <option value="all">All Providers</option>
            <option v-for="p in lobbyProviders" :key="p" :value="p">{{ p }}</option>
          </select>
          <AppIcon name="chevronDown" :size="14" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-dim" />
        </div>

        <div class="relative">
          <select
            v-model="sort"
            class="h-11 appearance-none rounded-full border border-border-gold/60 bg-black/40 pl-5 pr-10 font-sans text-[12px] uppercase tracking-[0.08em] text-ink-muted focus:border-gold focus:outline-none"
          >
            <option value="popular">Sort: Popular</option>
            <option value="az">Sort: A – Z</option>
          </select>
          <AppIcon name="chevronDown" :size="14" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-dim" />
        </div>
      </div>

      <p class="font-sans text-[12px] text-ink-dim lg:ml-auto">
        <span class="font-semibold tabular-nums text-champagne">{{ filtered.length }}</span> games
      </p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <article
        v-for="g in shown"
        :key="g.name"
        class="group cursor-pointer overflow-hidden rounded-xl border border-white/8 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border-gold hover:shadow-card-lift"
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
            class="shrink-0 transition-colors"
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
