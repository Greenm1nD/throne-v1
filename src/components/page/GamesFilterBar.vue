<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Shared filter/search toolbar for every game/list grid (Casino, Virtuals, Games…).
 * One consistent THRONE style — title rule, royal search, optional filter dropdown,
 * sort dropdown, result count. Adapt content per page via props; the look never changes.
 */
withDefaults(
  defineProps<{
    title: string
    count: number
    countLabel?: string
    searchPlaceholder?: string
    filterLabel?: string
    filterOptions?: string[]
    sortOptions?: { value: string; label: string }[]
  }>(),
  {
    countLabel: 'games',
    searchPlaceholder: 'Search the royal collection...',
    filterLabel: 'All Providers',
    filterOptions: () => [],
    sortOptions: () => [
      { value: 'popular', label: 'Sort: Popular' },
      { value: 'az', label: 'Sort: A – Z' },
    ],
  },
)

const query = defineModel<string>('query', { default: '' })
const filter = defineModel<string>('filter', { default: 'all' })
const sort = defineModel<string>('sort', { default: 'popular' })
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-3">
      <span class="h-6 w-1 rounded-full bg-gold-gradient shadow-gold-soft" />
      <h2 class="font-display text-xl font-semibold tracking-[0.16em] text-gold-gradient">{{ title }}</h2>
    </div>

    <!-- Toolbar -->
    <div class="mb-7 flex flex-col gap-3 lg:flex-row lg:items-center">
      <label class="relative flex-1 lg:max-w-md">
        <AppIcon name="search" :size="15" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
        <input
          v-model="query"
          type="search"
          :placeholder="searchPlaceholder"
          class="h-11 w-full rounded-full border border-border-gold/60 bg-black/40 pl-11 pr-4 font-sans text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none"
        />
      </label>

      <div class="flex items-center gap-3">
        <div v-if="filterOptions.length" class="relative">
          <select
            v-model="filter"
            class="h-11 appearance-none rounded-full border border-border-gold/60 bg-black/40 pl-5 pr-10 font-sans text-[12px] uppercase tracking-[0.08em] text-ink-muted focus:border-gold focus:outline-none"
          >
            <option value="all">{{ filterLabel }}</option>
            <option v-for="o in filterOptions" :key="o" :value="o">{{ o }}</option>
          </select>
          <AppIcon name="chevronDown" :size="14" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-dim" />
        </div>

        <div class="relative">
          <select
            v-model="sort"
            class="h-11 appearance-none rounded-full border border-border-gold/60 bg-black/40 pl-5 pr-10 font-sans text-[12px] uppercase tracking-[0.08em] text-ink-muted focus:border-gold focus:outline-none"
          >
            <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
          <AppIcon name="chevronDown" :size="14" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-dim" />
        </div>
      </div>

      <p class="font-sans text-[12px] text-ink-dim lg:ml-auto">
        <span class="font-semibold tabular-nums text-champagne">{{ count }}</span> {{ countLabel }}
      </p>
    </div>
  </div>
</template>
