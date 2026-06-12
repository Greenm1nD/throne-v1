<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Record-filter bar used above every history list: optional type/status
 * select + date range + "Last 30 days" preset + Search. Dates default to
 * the last 30 days; prototype filtering applies on Search.
 */
const props = withDefaults(
  defineProps<{
    typeLabel?: string
    options?: string[]
    modelValue?: string
  }>(),
  { typeLabel: 'Type', options: undefined, modelValue: 'All' },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'search'): void
}>()

const pending = ref(props.modelValue)

function iso(d: Date) {
  return d.toISOString().slice(0, 10)
}
const today = new Date()
const monthAgo = new Date(today.getTime() - 30 * 86400000)
const start = ref(iso(monthAgo))
const end = ref(iso(today))

function last30() {
  start.value = iso(monthAgo)
  end.value = iso(today)
}

function search() {
  emit('update:modelValue', pending.value)
  emit('search')
}
</script>

<template>
  <div class="rounded-xl border border-border-gold/30 bg-black/30 p-5">
    <div class="flex flex-wrap items-end gap-3">
      <label v-if="options?.length" class="block">
        <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">{{ typeLabel }}</span>
        <span class="relative block">
          <select
            v-model="pending"
            class="h-12 w-[120px] appearance-none rounded-lg border border-border-gold/60 bg-black/40 px-4 pr-9 text-sm text-ink focus:border-gold focus:outline-none"
          >
            <option v-for="o in options" :key="o">{{ o }}</option>
          </select>
          <AppIcon name="chevronDown" :size="14" class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
        </span>
      </label>

      <label class="block">
        <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Start Date</span>
        <input
          v-model="start"
          type="date"
          class="h-12 w-[160px] rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm tabular-nums text-ink [color-scheme:dark] focus:border-gold focus:outline-none"
        />
      </label>

      <label class="block">
        <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">End Date</span>
        <input
          v-model="end"
          type="date"
          class="h-12 w-[160px] rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm tabular-nums text-ink [color-scheme:dark] focus:border-gold focus:outline-none"
        />
      </label>

      <button
        class="h-12 rounded-lg border border-border-gold/40 px-5 font-sans text-[12px] font-semibold text-ink-muted transition-colors hover:border-gold hover:text-gold-bright"
        @click="last30"
      >
        Last 30 days
      </button>

      <!-- Same height + radius as the fields beside it -->
      <button
        class="shimmer-host group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gold-gradient px-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1407] shadow-gold-soft transition-all duration-300 hover:shadow-gold hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.98]"
        @click="search"
      >
        <AppIcon name="search" :size="14" /> Search
      </button>
    </div>

    <p class="mt-3 flex items-center gap-1.5 font-sans text-[11px] text-ink-dim">
      <AppIcon name="clock" :size="12" /> You can select a date range of up to 31 days.
    </p>
  </div>
</template>
