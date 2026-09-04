<script setup lang="ts">
/**
 * Drifting smoke/haze that hugs the floor of the hero scene.
 * Several large, heavily-blurred warm-gray blobs rise and fade on long,
 * staggered loops — subtle atmosphere, never theatrical fog. CSS only.
 */
const blobs = [
  { left: 8, size: 340, delay: 0, dur: 15, tint: 'gray' },
  { left: 26, size: 280, delay: -6, dur: 18, tint: 'gold' },
  { left: 46, size: 380, delay: -10, dur: 16, tint: 'gray' },
  { left: 64, size: 260, delay: -3, dur: 20, tint: 'gold' },
  { left: 82, size: 320, delay: -13, dur: 17, tint: 'gray' },
  { left: 95, size: 240, delay: -8, dur: 19, tint: 'gray' },
]

const fill = (tint: string) =>
  tint === 'gold'
    ? 'radial-gradient(ellipse at center, rgba(245,215,122,0.10), rgba(212,175,55,0.05) 42%, transparent 70%)'
    : 'radial-gradient(ellipse at center, rgba(222,214,198,0.09), rgba(180,172,156,0.04) 42%, transparent 70%)'
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[44%] overflow-hidden"
    aria-hidden="true"
  >
    <span
      v-for="(b, i) in blobs"
      :key="i"
      class="absolute rounded-full"
      :style="{
        left: `${b.left}%`,
        bottom: '-10%',
        width: `${b.size}px`,
        height: `${b.size * 0.55}px`,
        marginLeft: `-${b.size / 2}px`,
        background: fill(b.tint),
        filter: 'blur(30px)',
        animation: `smokeDrift ${b.dur}s ease-in-out ${b.delay}s infinite`,
      }"
    />
  </div>
</template>
