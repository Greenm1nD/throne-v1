<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { assets } from '@/data/assets'
import { useReveal } from '@/composables/useReveal'
import { premiumEnabled } from '@/composables/usePremiumMotion'
import { useViewport } from '@/composables/useMobilePolish'

const root = ref<HTMLElement | null>(null)
useReveal(root)
const router = useRouter()

// Mobile/tablet: a portrait-friendly crop with the luxury objects in the lower
// half and a dark top for the title/CTA (the wide desktop banner squeezes the
// objects behind the text on a phone).
const { lite } = useViewport()
const bgImage = computed(() =>
  lite.value
    ? `linear-gradient(180deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.5) 28%, rgba(5,5,5,0) 52%), url('/assets/images/treasury-mobile.webp')`
    : `linear-gradient(100deg, rgba(5,5,5,0.62) 0%, rgba(5,5,5,0.22) 24%, rgba(5,5,5,0) 46%), url('${assets.treasuryBanner.src}')`,
)

// Cinemagraph: the glow/fire behind the objects animates (loop). Premium flag +
// desktop + no reduced-motion, played only while in view. Off → the static image
// with the existing CSS glow pulses (unchanged stable design).
const vid = ref<HTMLVideoElement | null>(null)
const cinemagraph = premiumEnabled
let io: IntersectionObserver | null = null
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = window.matchMedia('(min-width: 768px)').matches
  if (cinemagraph && !reduce && desktop && vid.value) {
    io = new IntersectionObserver(
      ([e]) => {
        if (!vid.value) return
        if (e.isIntersecting) vid.value.play().catch(() => {})
        else vid.value.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(vid.value)
  }
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="rewards" ref="root" class="container-royal pt-16 sm:pt-24">
    <div
      class="treasury-banner group relative flex min-h-[200px] items-center overflow-hidden rounded-2xl border border-border-gold shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(245,215,122,0.12)] lg:aspect-[6/1]"
      data-reveal
    >
      <!-- Image: wide desktop crop, portrait mobile crop (objects below the text). -->
      <div
        v-lazybg="bgImage"
        class="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        :style="{ backgroundColor: '#0d0b07' }"
      />

      <!-- Cinemagraph loop: animated glow/fire behind the objects (premium). The
           still image above is the poster/fallback. -->
      <video
        v-if="cinemagraph && !lite"
        ref="vid"
        src="/assets/videos/cinemagraph-treasury.mp4"
        :poster="assets.treasuryBanner.src"
        muted
        loop
        playsinline
        preload="none"
        class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <!-- Legibility scrim over the cinemagraph (matches the still's gradient) -->
      <div
        v-if="cinemagraph"
        class="pointer-events-none absolute inset-0"
        style="background: linear-gradient(100deg, rgba(5,5,5,0.62) 0%, rgba(5,5,5,0.22) 24%, rgba(5,5,5,0) 46%)"
      />

      <!-- Glow choreography (CSS) — kept for the stable/off + mobile experience -->
      <template v-if="!cinemagraph">
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
      </template>

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
          <GoldButton variant="solid" size="md" @click="router.push('/rewards')">
            View Treasury <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </div>
  </section>
</template>
