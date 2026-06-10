<script setup lang="ts">
/**
 * SectionHeader — centered or left-aligned title with a gold diamond rule.
 * The right `#actions` slot hosts "View All" / arrow controls.
 */
withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    align?: 'center' | 'left'
  }>(),
  { align: 'center' },
)
</script>

<template>
  <div
    class="mb-8 flex w-full flex-col gap-4 sm:mb-10"
    :class="align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'"
  >
    <div :class="align === 'center' ? 'flex flex-col items-center' : ''">
      <p v-if="eyebrow" class="eyebrow mb-2">{{ eyebrow }}</p>
      <h2
        class="font-display text-2xl font-semibold tracking-[0.18em] text-gold-gradient sm:text-3xl"
      >
        {{ title }}
      </h2>
      <!-- Gold diamond rule -->
      <div
        v-if="align === 'center'"
        class="mt-4 flex items-center justify-center gap-3"
      >
        <span class="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
        <span class="h-1.5 w-1.5 rotate-45 bg-gold/80" />
        <span class="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
      </div>
    </div>

    <div v-if="$slots.actions" class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>
