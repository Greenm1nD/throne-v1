<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { assets } from '@/data/assets'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root)

/**
 * Ping-pong video loop: browsers can't play <video> backwards natively,
 * so on 'ended' we scrub currentTime back to 0 via rAF, then play forward
 * again. Reduced-motion users just see the poster frame.
 */
const vid = ref<HTMLVideoElement | null>(null)
let raf = 0
let last = 0

function reverseStep(now: number) {
  const v = vid.value
  if (!v) return
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  if (v.currentTime <= 0.06) {
    v.currentTime = 0
    v.play().catch(() => {})
    return
  }
  v.currentTime = Math.max(0, v.currentTime - dt)
  raf = requestAnimationFrame(reverseStep)
}

function onEnded() {
  last = performance.now()
  raf = requestAnimationFrame(reverseStep)
}

onMounted(() => {
  const v = vid.value
  if (!v) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  v.addEventListener('ended', onEnded)
  v.play().catch(() => {})
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  vid.value?.removeEventListener('ended', onEnded)
})
</script>

<template>
  <section id="rewards" ref="root" class="container-royal pt-16 sm:pt-24">
    <div
      class="group relative flex min-h-[200px] items-center overflow-hidden rounded-2xl border border-border-gold shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(245,215,122,0.12)] lg:aspect-[6/1]"
      data-reveal
    >
      <!-- Ambient video, ping-pong looped (see script). Poster = old still. -->
      <video
        ref="vid"
        :src="'/assets/images/treasury-banner-viedo.mp4'"
        :poster="assets.treasuryBanner.src"
        muted
        playsinline
        preload="auto"
        class="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        style="background-color: #0d0b07"
      />
      <!-- Corner scrim keeps the title legible over the moving footage -->
      <div
        class="pointer-events-none absolute inset-0"
        style="background: linear-gradient(100deg, rgba(5, 5, 5, 0.62) 0%, rgba(5, 5, 5, 0.22) 24%, rgba(5, 5, 5, 0) 46%)"
      />

      <!-- Glow choreography: skyline · timepiece · jet, breathing out of phase -->
      <div
        class="pointer-events-none absolute right-[10%] top-0 h-3/5 w-1/2 animate-goldenPulse"
        style="background: radial-gradient(50% 55% at 55% 40%, rgba(245, 215, 122, 0.2), transparent 70%)"
      />
      <div
        class="pointer-events-none absolute bottom-0 left-1/3 h-2/3 w-1/3 animate-goldenPulse"
        style="
          background: radial-gradient(45% 50% at 50% 60%, rgba(245, 215, 122, 0.16), transparent 70%);
          animation-duration: 7.5s;
          animation-delay: -2.5s;
        "
      />
      <div
        class="pointer-events-none absolute bottom-0 right-0 h-3/4 w-2/5 animate-goldenPulse"
        style="
          background: radial-gradient(50% 50% at 55% 55%, rgba(245, 215, 122, 0.13), transparent 72%);
          animation-duration: 9s;
          animation-delay: -4.5s;
        "
      />

      <!-- Floating gold particles -->
      <ParticleLayer :count="14" />

      <!-- Cinematic hover shine -->
      <span class="shine-beam" />

      <!-- Hot-zone labels over the prize segments -->
      <div
        class="pointer-events-none absolute bottom-4 right-5 z-10 hidden items-center gap-2 lg:flex"
      >
        <span
          v-for="zone in ['Royal Motors', 'Timepieces', 'Private Jets', 'Royal Destinations']"
          :key="zone"
          class="rounded-full border border-border-gold/60 bg-black/55 px-3 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-champagne backdrop-blur transition-colors duration-300 group-hover:border-gold/80 group-hover:text-gold-bright"
        >
          {{ zone }}
        </span>
      </div>

      <div class="relative z-10 max-w-xl px-7 py-8 sm:px-12">
        <h2
          class="font-display text-3xl font-bold tracking-[0.14em] text-gold-gradient sm:text-4xl"
        >
          The Treasury
        </h2>
        <p class="eyebrow mt-3">Exclusive Prizes</p>
        <div class="mt-7">
          <GoldButton variant="solid" size="md">
            View Treasury <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </div>
  </section>
</template>
