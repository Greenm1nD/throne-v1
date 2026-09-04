<script setup lang="ts">
/**
 * Ornamental royal divider — a gold hairline with a faceted diamond centre and
 * small flourishes. Used to separate major sections with regal restraint.
 */
withDefaults(defineProps<{ width?: string }>(), { width: '7rem' })
</script>

<template>
  <div class="flex items-center justify-center gap-4 py-2 text-gold/70" role="separator" aria-hidden="true">
    <span class="h-1 w-1 rounded-full bg-gold/50" />
    <span
      class="h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/60"
      :style="{ width }"
    />
    <span class="relative flex items-center justify-center">
      <span class="h-2 w-2 rotate-45 bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.5)]" />
      <span class="absolute h-3.5 w-3.5 rotate-45 border border-gold/40" />
    </span>
    <span
      class="h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/60"
      :style="{ width }"
    />
    <span class="h-1 w-1 rounded-full bg-gold/50" />
  </div>
</template>
