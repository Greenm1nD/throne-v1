<script setup lang="ts">
/**
 * Site-wide ambient atmosphere: faint gold dust drifting upward through the
 * obsidian dark, plus two huge breathing glows. Pure CSS animation
 * (transform/opacity only), fixed behind all content, pointer-events-none.
 * - deterministic positions (no Math.random)
 * - half the motes hide on mobile (less GPU work)
 * - global prefers-reduced-motion guard silences it automatically
 */
const motes = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 41 + 13) % 100, // vw
  y: (i * 67 + 29) % 100, // vh (start)
  s: [1, 1.6, 2.2, 1.2, 2.8][i % 5],
  peak: [0.22, 0.38, 0.28, 0.45, 0.18][i % 5],
  sway: [14, -22, 30, -12, 20][i % 5],
  dur: 24 + ((i * 7) % 22), // 24–45s
  delay: -((i * 53) % 40), // pre-seeded across the loop
  mobile: i % 2 === 0, // only half render on small screens
}))
</script>

<template>
  <div class="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
    <!-- Breathing ambient glows -->
    <div
      class="absolute left-[-12%] top-[18%] h-[55vh] w-[55vw] rounded-full"
      style="
        background: radial-gradient(circle, rgba(212, 175, 55, 0.05), transparent 70%);
        animation: ambientBreath 18s ease-in-out infinite;
      "
    />
    <div
      class="absolute bottom-[8%] right-[-10%] h-[50vh] w-[50vw] rounded-full"
      style="
        background: radial-gradient(circle, rgba(212, 175, 55, 0.04), transparent 70%);
        animation: ambientBreath 24s ease-in-out -9s infinite;
      "
    />

    <!-- Gold dust -->
    <span
      v-for="(m, i) in motes"
      :key="i"
      class="absolute rounded-full bg-gold-bright"
      :class="m.mobile ? 'block' : 'hidden md:block'"
      :style="{
        left: `${m.x}vw`,
        top: `${m.y}vh`,
        width: `${m.s}px`,
        height: `${m.s}px`,
        boxShadow: `0 0 ${m.s * 3}px ${m.s * 0.8}px rgba(245,215,122,0.35)`,
        opacity: 0,
        '--dust-peak': m.peak,
        '--dust-sway': `${m.sway}px`,
        animation: `dustRise ${m.dur}s linear ${m.delay}s infinite`,
      }"
    />
  </div>
</template>
