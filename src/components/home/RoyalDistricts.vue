<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
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
    description: 'The finest games. The highest limits. The ultimate experience.',
    icon: 'spade',
    image: '/assets/images/district-tables.webp',
    alt: 'A private high-limit casino salon with a roulette table and crystal chandeliers',
    tags: [
      { label: 'Live Casino', icon: 'monitor' },
      { label: 'Blackjack', icon: 'spade' },
      { label: 'Baccarat', icon: 'chip' },
      { label: 'Roulette', icon: 'sparkle' },
    ],
    cta: 'Enter Tables',
    href: '/live-casino',
  },
  {
    title: 'The Arena',
    description: 'Where passion meets power. Bet on the world. Live the action.',
    icon: 'swords',
    image: '/assets/images/district-arena.webp',
    alt: 'A luxury private stadium suite overlooking a floodlit stadium at night',
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
    description: 'More than a club. A way of life. Rewards. Community. Legacy.',
    icon: 'crown',
    image: '/assets/images/district-kingdom.webp',
    alt: 'A grand royal palace throne room with tall stairs and gold banners',
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
  <section ref="root" class="container-royal pt-16 sm:pt-24">
    <!-- Ornamental title -->
    <div class="mb-10 flex flex-col items-center text-center" data-reveal>
      <AppIcon name="crown" :size="22" class="text-gold-bright drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]" />
      <div class="mt-3 flex items-center gap-4">
        <span class="hidden items-center gap-2 sm:flex">
          <span class="h-px w-14 bg-gradient-to-r from-transparent to-gold/50" />
          <span class="h-1.5 w-1.5 rotate-45 bg-gold/70" />
        </span>
        <h2 class="font-display text-2xl font-semibold uppercase tracking-[0.2em] text-gold-gradient sm:text-3xl">The Royal Districts</h2>
        <span class="hidden items-center gap-2 sm:flex">
          <span class="h-1.5 w-1.5 rotate-45 bg-gold/70" />
          <span class="h-px w-14 bg-gradient-to-l from-transparent to-gold/50" />
        </span>
      </div>
      <p class="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-ink-muted">Enter Your World of Privilege</p>
    </div>

    <!-- Districts -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <RoyalDistrictCard
        v-for="(d, i) in districts"
        :key="d.title"
        :district="d"
        :class="i === 0 ? 'md:col-span-2 lg:col-span-1' : ''"
      />
    </div>
  </section>
</template>
