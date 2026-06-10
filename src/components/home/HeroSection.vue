<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import RotatingCrownRing from './RotatingCrownRing.vue'
import FloorSmoke from './FloorSmoke.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { assets } from '@/data/assets'

const eyebrow = ref<HTMLElement | null>(null)
const heading = ref<HTMLElement | null>(null)
const sub = ref<HTMLElement | null>(null)
const ctas = ref<HTMLElement | null>(null)
const backdrop = ref<HTMLElement | null>(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
  tl.from(backdrop.value, { opacity: 0, scale: 1.08, duration: 1.4, ease: 'power2.out' })
    .from(eyebrow.value, { opacity: 0, y: 16, duration: 0.6 }, '-=1.0')
    .from(
      heading.value,
      { opacity: 0, y: 24, filter: 'blur(14px)', duration: 0.9 },
      '-=0.5',
    )
    .from(sub.value, { opacity: 0, y: 16, duration: 0.6 }, '-=0.5')
    .from(ctas.value, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
})
</script>

<template>
  <section
    class="cinematic-overlay grain relative flex min-h-[620px] w-full flex-col items-center justify-between overflow-hidden py-14 lg:h-[660px] lg:py-16"
  >
    <!-- Animated throne-room backdrop (video, poster = static fallback) -->
    <div ref="backdrop" class="absolute inset-0" style="background-color: #07070a">
      <video
        class="h-full w-full object-cover"
        :poster="assets.heroThroneRoom.src"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      >
        <source :src="assets.heroVideo.src" type="video/mp4" />
      </video>
      <!-- Cinematic gradient scrim so the title/CTAs stay legible -->
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            180deg,
            rgba(5, 5, 5, 0.55) 0%,
            rgba(5, 5, 5, 0.12) 32%,
            rgba(5, 5, 5, 0.2) 60%,
            rgba(5, 5, 5, 0.9) 100%
          );
        "
      />
    </div>

    <!-- Drifting smoke along the floor -->
    <FloorSmoke />

    <!-- Subtle rotating golden sparkles layered over the painted ring -->
    <RotatingCrownRing variant="sparkle" />

    <!-- Top: title block, seated in the dark upper band above the throne -->
    <div class="container-royal relative z-10 flex flex-col items-center text-center">
      <div
        ref="eyebrow"
        class="mb-2 text-gold-bright drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
      >
        <AppIcon name="crown" :size="32" class="mx-auto" />
      </div>

      <h1
        ref="heading"
        class="font-display text-6xl font-bold tracking-[0.16em] text-gold-gradient drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] sm:text-7xl lg:text-8xl"
      >
        THRONE
      </h1>

      <p
        ref="sub"
        class="mt-4 font-sans text-xs font-medium uppercase tracking-[0.5em] text-ink-muted drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-sm"
      >
        Enter the Kingdom
      </p>
    </div>

    <!-- Bottom: CTAs over the marble floor -->
    <div
      ref="ctas"
      class="container-royal relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <GoldButton variant="solid" size="lg">
        Join the Kingdom
        <AppIcon name="arrowRight" :size="16" />
      </GoldButton>
      <GoldButton variant="outline" size="lg">Explore VIP</GoldButton>
    </div>
  </section>
</template>
