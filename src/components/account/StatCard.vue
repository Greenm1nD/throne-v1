<script setup lang="ts">
import AccGlyph from './AccGlyph.vue'

/**
 * Top-row metric card: label, hero value, icon chip, key/value sublines.
 * `tone` drives the value accent from the design tokens:
 * in → gold flow, out → muted, bonus → champagne, highlight → gold ring.
 */
const props = defineProps<{
  label: string
  value: string
  icon?: string
  font?: string
  rows?: Array<{ k: string; v: string }>
  accent?: boolean
  tone?: 'in' | 'out' | 'neutral' | 'bonus' | 'highlight'
}>()

const valueClass = () => {
  if (props.tone === 'in' || props.tone === 'highlight' || props.accent) return 'text-gold-gradient'
  if (props.tone === 'bonus') return 'text-champagne'
  if (props.tone === 'out') return 'text-ink-muted'
  return 'text-ink'
}
</script>

<template>
  <div v-glow class="card-lux p-5 hover:translate-y-0 sm:p-6" :class="tone === 'highlight' && 'border-border-gold'">
    <div class="flex items-start justify-between gap-3">
      <p class="eyebrow">{{ label }}</p>
      <span
        class="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border-gold/60 text-champagne"
        style="background: radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent 70%)"
      >
        <AccGlyph :icon="icon" :font="font" :size="17" />
      </span>
    </div>
    <p
      class="mt-2 font-display text-2xl font-bold tabular-nums tracking-[0.04em]"
      :class="valueClass()"
    >
      <slot name="value">{{ value }}</slot>
    </p>
    <slot />
    <dl v-if="rows?.length" class="mt-4 space-y-1.5 border-t border-border-gold/20 pt-3">
      <div v-for="r in rows" :key="r.k" class="flex items-center justify-between">
        <dt class="font-sans text-[11px] text-ink-dim">{{ r.k }}</dt>
        <dd class="font-sans text-[12px] tabular-nums text-ink-muted">{{ r.v }}</dd>
      </div>
    </dl>
  </div>
</template>
