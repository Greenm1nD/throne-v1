<script setup lang="ts">
/**
 * The glowing golden ring behind the throne.
 * - radial glow backdrop (pulsing)
 * - outer stroked ring with decorative ticks, rotating ~42s
 * - a counter-rotating inner ring for depth
 * - orbiting particles
 * All motion is CSS so it runs forever without JS cost.
 */
import { computed } from 'vue'

/**
 * variant:
 *  - 'full'    : full stroked ring + glow + ticks + particles (no hero photo)
 *  - 'sparkle' : only orbiting particles + a faint pulse, so it layers over a
 *                hero photo that already contains a painted ring (no double ring)
 */
withDefaults(defineProps<{ variant?: 'full' | 'sparkle' }>(), { variant: 'full' })

// 60 decorative ticks around the dial.
const ticks = computed(() =>
  Array.from({ length: 60 }, (_, i) => i * 6),
)

// Sparks scattered around the ring edge. Each sits at an angle (a) and a
// top inset (top%) ~ the ring radius, then twinkles. The whole layer rotates,
// so the sparks travel around the moving circle. No Math.random (deterministic).
const SIZES = [1.5, 2.2, 1, 2.6, 1.4, 2]
const sparks = Array.from({ length: 26 }, (_, i) => ({
  a: (i * 360) / 26 + (i % 3) * 5,
  top: [0, 3.5, 7, 1.5, 9, 2][i % 6],
  s: SIZES[i % SIZES.length],
  d: ((i % 8) * 0.35).toFixed(2),
  dur: (1.7 + (i % 5) * 0.45).toFixed(2),
}))
</script>

<template>
  <div
    class="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(86vw,560px)] -translate-x-1/2 -translate-y-1/2"
    aria-hidden="true"
  >
    <template v-if="variant === 'full'">
    <!-- Soft radial glow -->
    <div
      class="absolute inset-0 animate-goldenPulse rounded-full"
      style="
        background: radial-gradient(
          circle,
          rgba(245, 215, 122, 0.28) 0%,
          rgba(212, 175, 55, 0.14) 35%,
          rgba(212, 175, 55, 0.04) 55%,
          transparent 70%
        );
        filter: blur(8px);
      "
    />

    <!-- Outer rotating ring with ticks -->
    <svg
      class="absolute inset-0 h-full w-full animate-ringRotate"
      viewBox="0 0 100 100"
      fill="none"
    >
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F5D77A" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#D4AF37" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#F5D77A" stop-opacity="0.9" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" stroke="url(#ringGrad)" stroke-width="0.5" />
      <circle cx="50" cy="50" r="42" stroke="rgba(212,175,55,0.25)" stroke-width="0.3" />
      <!-- ticks -->
      <g stroke="rgba(245,215,122,0.55)" stroke-width="0.4">
        <line
          v-for="t in ticks"
          :key="t"
          x1="50"
          :y1="t % 30 === 0 ? 2.5 : 4"
          x2="50"
          y2="6"
          :transform="`rotate(${t} 50 50)`"
          :opacity="t % 30 === 0 ? 0.9 : 0.4"
        />
      </g>
    </svg>

    <!-- Inner counter-rotating accent ring -->
    <svg
      class="absolute inset-[12%] h-[76%] w-[76%] animate-ringRotateReverse"
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="rgba(212,175,55,0.3)"
        stroke-width="0.4"
        stroke-dasharray="1 7"
      />
    </svg>
    </template>

    <!-- Travelling sparks around the ring edge -->
    <div class="absolute inset-0 animate-ringRotate">
      <div
        v-for="(p, i) in sparks"
        :key="i"
        class="absolute inset-0"
        :style="{ transform: `rotate(${p.a}deg)` }"
      >
        <span
          class="absolute rounded-full bg-gold-bright"
          :style="{
            top: `${p.top}%`,
            left: '50%',
            marginLeft: `-${p.s / 2}px`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            boxShadow: `0 0 ${p.s * 4}px ${p.s}px rgba(245,215,122,0.85)`,
            animation: `twinkle ${p.dur}s ease-in-out ${p.d}s infinite`,
          }"
        />
      </div>
    </div>
  </div>
</template>
