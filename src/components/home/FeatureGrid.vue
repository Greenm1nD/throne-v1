<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import FeatureCard from './FeatureCard.vue'
import { features } from '@/data/features'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.14 })
</script>

<template>
  <section id="live-casino" ref="root" class="container-royal relative pt-10 sm:pt-14">
    <!-- Ambient haze -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[440px]" style="background: radial-gradient(58% 100% at 50% 0%, rgba(245,215,122,0.07), transparent 72%)" aria-hidden="true" />

    <!-- Ornamental title — the gate to the Kingdom -->
    <div class="relative mb-12 flex flex-col items-center text-center" data-reveal>
      <span class="pointer-events-none absolute left-1/2 top-1 h-32 w-80 -translate-x-1/2" style="background: radial-gradient(circle, rgba(245,215,122,0.16), transparent 68%); filter: blur(10px)" aria-hidden="true" />
      <AppIcon name="crown" :size="24" class="relative text-gold-bright drop-shadow-[0_2px_12px_rgba(212,175,55,0.6)]" />
      <div class="relative mt-3 flex items-center gap-4">
        <span class="hidden items-center gap-2 sm:flex">
          <span class="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span class="h-1.5 w-1.5 rotate-45 bg-gold/70" />
        </span>
        <h2 class="font-display text-2xl font-semibold uppercase tracking-[0.2em] text-gold-gradient sm:text-3xl">The Royal Districts</h2>
        <span class="hidden items-center gap-2 sm:flex">
          <span class="h-1.5 w-1.5 rotate-45 bg-gold/70" />
          <span class="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </span>
      </div>
      <p class="relative mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-ink-muted">Enter Your World of Privilege</p>
      <div class="relative mt-5 flex items-center justify-center gap-3">
        <span class="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
        <span class="h-1.5 w-1.5 rotate-45 bg-gold/80" />
        <span class="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </div>

    <div class="feature-cards relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard v-for="f in features" :key="f.title" :feature="f" />
    </div>
  </section>
</template>
