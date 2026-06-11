<script setup lang="ts">
import { ref } from 'vue'
import AccGlyph from './AccGlyph.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { HistoryRow } from '@/data/account'

/**
 * Accordion list used by every history panel. One `openId` controls which
 * row is expanded — opening one closes the rest. Collapsed rows show the
 * summary line; expanded rows reveal a label/value detail grid.
 */
defineProps<{ rows: HistoryRow[]; loading?: boolean }>()

const openId = ref<number | null>(null)
function toggle(i: number) {
  openId.value = openId.value === i ? null : i
}
</script>

<template>
  <!-- Skeleton while the mock api resolves -->
  <ul v-if="loading" class="divide-y divide-border-gold/20" aria-hidden="true">
    <li v-for="i in 5" :key="i" class="flex items-center gap-3.5 py-4">
      <span class="h-10 w-10 shrink-0 animate-pulse rounded-full bg-white/5" />
      <span class="flex-1 space-y-2">
        <span class="block h-3 w-1/3 animate-pulse rounded bg-white/5" />
        <span class="block h-2.5 w-1/2 animate-pulse rounded bg-white/5" />
      </span>
      <span class="h-3 w-16 animate-pulse rounded bg-white/5" />
    </li>
  </ul>

  <p v-else-if="!rows.length" class="py-12 text-center font-sans text-[12px] text-ink-dim">
    No records yet.
  </p>

  <ul v-else class="divide-y divide-border-gold/20">
    <li v-for="(r, i) in rows" :key="r.title + r.sub">
      <button
        class="flex w-full items-center gap-3.5 py-4 text-left transition-colors hover:bg-gold/[0.02]"
        :aria-expanded="openId === i"
        @click="toggle(i)"
      >
        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
          <AccGlyph :icon="r.icon" :font="r.font" :size="15" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate font-sans text-[13px] font-semibold text-ink">{{ r.title }}</span>
          <span class="block truncate font-sans text-[11px] tabular-nums text-ink-dim">{{ r.sub }}</span>
        </span>
        <span v-if="r.ago" class="hidden whitespace-nowrap font-sans text-[11px] text-ink-dim sm:block">{{ r.ago }}</span>
        <span class="w-24 text-right font-sans text-[13px] font-bold tabular-nums"
          :class="r.amountTone === 'in' ? 'text-gold-bright' : r.amountTone === 'out' ? 'text-ink-muted' : 'text-ink'">
          {{ r.amount }}
        </span>
        <AppIcon name="chevronDown" :size="14" class="shrink-0 text-ink-dim transition-transform duration-300" :class="openId === i && 'rotate-180 text-gold-bright'" />
      </button>

      <div v-show="openId === i" class="mb-4 rounded-xl border border-border-gold/30 bg-black/30 p-4">
        <dl class="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          <div v-for="d in r.details" :key="d.label" class="flex items-baseline justify-between gap-3">
            <dt class="font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">{{ d.label }}</dt>
            <dd class="text-right font-sans text-[12px] font-semibold tabular-nums text-ink">{{ d.value }}</dd>
          </div>
        </dl>
        <p v-if="r.note" class="mt-3 border-t border-border-gold/20 pt-3 font-sans text-[11px] leading-relaxed text-ink-dim">
          <span class="font-semibold uppercase tracking-[0.14em] text-champagne">{{ r.note.label }}:</span> {{ r.note.text }}
        </p>
      </div>
    </li>
  </ul>
</template>
