<script setup lang="ts">
/**
 * GlassCard — luxury surface wrapper. Adds the `.card-lux` treatment
 * (hairline, glow, lift on hover) and an optional inner padding.
 */
withDefaults(
  defineProps<{
    padded?: boolean
    interactive?: boolean
  }>(),
  { padded: true, interactive: true },
)
</script>

<template>
  <div
    class="card-lux"
    :class="[padded && 'p-6', !interactive && 'hover:translate-y-0 hover:border-white/5 hover:bg-card hover:shadow-card-glow']"
  >
    <slot />
  </div>
</template>
