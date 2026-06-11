<script setup lang="ts">
import { ref } from 'vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { assets } from '@/data/assets'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="rewards" ref="root" class="container-royal pt-16 sm:pt-24">
    <div
      class="group relative flex min-h-[220px] items-center overflow-hidden rounded-2xl border border-border-gold shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(245,215,122,0.12)]"
      data-reveal
    >
      <!-- Wide 21:6 image layer (clearly visible; only the left fades to black for text) -->
      <div
        v-lazybg="`linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.7) 18%, rgba(5,5,5,0.28) 38%, rgba(5,5,5,0) 56%), url('${assets.treasuryBanner.src}')`"
        class="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        :style="{ backgroundColor: '#0d0b07' }"
      />

      <!-- Pulsing skyline glow (center-right, over the city) -->
      <div
        class="pointer-events-none absolute right-[12%] top-0 h-full w-1/2 animate-goldenPulse"
        style="
          background: radial-gradient(45% 60% at 60% 45%, rgba(245, 215, 122, 0.18), transparent 70%);
        "
      />

      <!-- Floating gold particles -->
      <ParticleLayer :count="14" />

      <!-- Cinematic hover shine -->
      <span class="shine-beam" />

      <div class="relative z-10 max-w-xl px-7 py-10 sm:px-12">
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
