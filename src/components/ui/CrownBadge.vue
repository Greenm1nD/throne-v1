<script setup lang="ts">
import { ref } from 'vue'
import { assets } from '@/data/assets'

/**
 * Ornate circular gold emblem. Prefers a generated PNG (`auth-badge.png`)
 * when present; if it's missing, the inline SVG version shows as a fallback.
 */
withDefaults(defineProps<{ size?: number }>(), { size: 92 })

const pngFailed = ref(false)
</script>

<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- Generated PNG emblem (preferred). Hidden if the file is absent. -->
    <img
      v-if="!pngFailed"
      :src="assets.authBadge.src"
      :alt="assets.authBadge.alt"
      class="absolute inset-0 z-20 h-full w-full object-contain drop-shadow-[0_6px_22px_rgba(212,175,55,0.45)]"
      @error="pngFailed = true"
    />

    <!-- Top finial diamond -->
    <span
      class="absolute left-1/2 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-[55%] rotate-45 rounded-[1px] bg-gold-gradient shadow-gold-soft"
    />

    <svg
      viewBox="0 0 100 100"
      class="h-full w-full drop-shadow-[0_6px_22px_rgba(212,175,55,0.45)]"
    >
      <defs>
        <linearGradient id="badgeGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F8EAB8" />
          <stop offset="35%" stop-color="#E8C878" />
          <stop offset="65%" stop-color="#B8901F" />
          <stop offset="100%" stop-color="#F5D77A" />
        </linearGradient>
        <radialGradient id="badgeCore" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stop-color="#16130c" />
          <stop offset="100%" stop-color="#070708" />
        </radialGradient>
      </defs>

      <!-- Dark core -->
      <circle cx="50" cy="50" r="45" fill="url(#badgeCore)" />
      <!-- Outer thick gold ring -->
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#badgeGold)" stroke-width="4" />
      <!-- Inner thin gold ring -->
      <circle cx="50" cy="50" r="37.5" fill="none" stroke="url(#badgeGold)" stroke-width="1.1" opacity="0.85" />

      <!-- Cardinal diamonds on the ring -->
      <g fill="url(#badgeGold)">
        <rect x="47" y="2" width="6" height="6" rx="1" transform="rotate(45 50 5)" />
        <rect x="92" y="47" width="6" height="6" rx="1" transform="rotate(45 95 50)" />
        <rect x="47" y="92" width="6" height="6" rx="1" transform="rotate(45 50 95)" />
        <rect x="2" y="47" width="6" height="6" rx="1" transform="rotate(45 5 50)" />
      </g>
    </svg>

    <!-- Crown + T monogram, centered -->
    <img
      :src="assets.logoMark.src"
      alt=""
      class="absolute left-1/2 top-1/2 w-auto -translate-x-1/2 -translate-y-1/2"
      :style="{ height: `${size * 0.42}px` }"
    />
  </div>
</template>
