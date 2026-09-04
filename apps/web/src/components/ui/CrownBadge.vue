<script setup lang="ts">
import { assets } from '@/data/assets'

/** Circular gold crown emblem — rendered straight from the generated PNG. */
withDefaults(defineProps<{ size?: number }>(), { size: 92 })
</script>

<template>
  <img
    :src="assets.authBadge.src"
    :alt="assets.authBadge.alt"
    class="w-auto select-none object-contain drop-shadow-[0_6px_22px_rgba(212,175,55,0.45)]"
    :style="{ height: `${size}px` }"
    draggable="false"
  />
</template>
