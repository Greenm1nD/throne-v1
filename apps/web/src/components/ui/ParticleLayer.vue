<script setup lang="ts">
import { computed } from 'vue'

/**
 * Reusable layer of softly-twinkling gold particles for atmosphere.
 * Positions are deterministic (no Math.random) so they stay stable across
 * renders and SSR. Sits absolutely inside a positioned parent.
 */
const props = withDefaults(defineProps<{ count?: number }>(), { count: 16 })

const SIZES = [1, 1.5, 2, 1, 2.5]
const particles = computed(() =>
  Array.from({ length: props.count }, (_, i) => ({
    x: (i * 37 + 11) % 100,
    y: (i * 61 + 7) % 100,
    s: SIZES[i % SIZES.length],
    d: ((i * 7) % 30) / 10,
    dur: 2.4 + ((i * 13) % 20) / 10,
  })),
)
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="absolute rounded-full bg-gold-bright"
      :style="{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: `${p.s}px`,
        height: `${p.s}px`,
        boxShadow: '0 0 6px 1px rgba(245,215,122,0.6)',
        animation: `twinkle ${p.dur}s ease-in-out ${p.d}s infinite`,
      }"
    />
  </div>
</template>
