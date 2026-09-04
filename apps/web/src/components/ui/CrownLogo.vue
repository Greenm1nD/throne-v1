<script setup lang="ts">
import { assets } from '@/data/assets'

/**
 * THRONE logo. Renders the real crown + T monogram (transparent PNG),
 * with the wordmark kept SEPARATE so mark and text compose independently:
 *  - withText=false        → mark only (header collapse, crests, loading)
 *  - withText + text       → mark + crisp Cinzel "THRONE" wordmark (default)
 *  - withText + image word → mark + the original gold wordmark artwork
 */
withDefaults(
  defineProps<{
    size?: number
    withText?: boolean
    tagline?: boolean
    wordmarkAsImage?: boolean
  }>(),
  { size: 36, withText: true, tagline: false, wordmarkAsImage: false },
)
</script>

<template>
  <RouterLink to="/" class="group flex items-center gap-3" aria-label="THRONE home">
    <img
      :src="assets.logoMark.src"
      :alt="assets.logoMark.alt"
      :style="{ height: `${size}px` }"
      class="logo-breath w-auto shrink-0 transition-transform duration-500 group-hover:scale-105"
    />

    <!-- Wordmark as original gold artwork.
         The crown occupies the mark's upper half, so the wordmark is nudged
         down to align with the T letterform's optical centre, not the image's. -->
    <img
      v-if="withText && wordmarkAsImage"
      :src="assets.logoWordmark.src"
      :alt="assets.logoWordmark.alt"
      :style="{ height: `${size * 0.62}px`, transform: `translateY(${Math.round(size * 0.15)}px)` }"
      class="w-auto"
    />

    <!-- Wordmark as crisp text -->
    <span
      v-else-if="withText"
      class="flex flex-col leading-none"
      :style="{ transform: `translateY(${Math.round(size * 0.15)}px)` }"
    >
      <span class="text-gold-flow bg-clip-text font-display text-[20px] font-semibold tracking-[0.28em] text-transparent">
        THRONE
      </span>
      <span
        v-if="tagline"
        class="mt-1 font-sans text-[8px] font-medium uppercase tracking-[0.34em] text-ink-dim"
      >
        VIP Gaming Club
      </span>
    </span>
  </RouterLink>
</template>
