<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import RoyalDistrictCard, { type District } from './RoyalDistrictCard.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * The Royal Districts — three immersive THRONE destinations (not category nav):
 * The Royal Tables, The Arena, The Kingdom.
 */
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.12 })

const districts: District[] = [
  {
    title: 'The Royal Tables',
    description: 'Reserved for those who play above the ordinary.',
    icon: 'spade',
    image: '/assets/images/district-tables.webp',
    alt: 'An intimate private members gaming salon with a roulette table and crystal chandeliers',
    tags: [
      { label: 'Roulette', icon: 'sparkle' },
      { label: 'Blackjack', icon: 'spade' },
      { label: 'Baccarat', icon: 'chip' },
    ],
    cta: 'Enter Tables',
    href: '/live-casino',
  },
  {
    title: 'The Arena',
    description: 'Where the Kingdom watches the world compete.',
    icon: 'swords',
    image: '/assets/images/district-arena.webp',
    alt: 'An ultra-premium stadium owner’s suite overlooking a floodlit stadium at night',
    tags: [
      { label: 'Sports', icon: 'bolt' },
      { label: 'E-Sport', icon: 'gamepad' },
      { label: 'Live Betting', icon: 'chart' },
    ],
    cta: 'Enter Arena',
    href: '/sports',
  },
  {
    title: 'The Kingdom',
    description: 'The heart of the Kingdom. Status. Legacy. Influence.',
    icon: 'crown',
    image: '/assets/images/district-kingdom.webp',
    alt: 'A grand royal throne room with banners, columns and warm volumetric light',
    tags: [
      { label: 'VIP Lounge', icon: 'crown' },
      { label: 'Rewards', icon: 'gift' },
      { label: 'Tournaments', icon: 'trophy' },
      { label: 'Community', icon: 'chat' },
    ],
    cta: 'Enter Kingdom',
    href: '/kingdom',
  },
]
</script>

<template>
  <section ref="root" class="container-royal relative pt-16 sm:pt-24">
    <!-- Ambient haze + floating gold particles (entrance atmosphere) -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[440px]" style="background: radial-gradient(58% 100% at 50% 0%, rgba(245,215,122,0.07), transparent 72%)" aria-hidden="true" />
    <ParticleLayer :count="12" />

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
      <!-- Royal divider -->
      <div class="relative mt-5 flex items-center justify-center gap-3">
        <span class="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
        <span class="h-1.5 w-1.5 rotate-45 bg-gold/80" />
        <span class="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </div>

    <!-- Districts -->
    <div class="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <RoyalDistrictCard
        v-for="(d, i) in districts"
        :key="d.title"
        :district="d"
        :class="i === 0 ? 'md:col-span-2 lg:col-span-1' : ''"
      />
    </div>
  </section>
</template>
