<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GameCard from './GameCard.vue'
import { royalCollection } from '@/data/games'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.12 })
</script>

<template>
  <section id="casino" ref="root" class="section-glow container-royal pt-16 sm:pt-24">
    <SectionHeader title="Royal Collection" eyebrow="Curated Tables" />

    <!-- View all + arrow controls -->
    <div class="mb-6 flex items-center justify-end gap-3">
      <GoldButton variant="ghost" size="sm">
        View All <AppIcon name="arrowRight" :size="14" />
      </GoldButton>
      <div class="flex gap-2">
        <button
          class="grid h-9 w-9 place-items-center rounded-full border border-border-gold text-champagne transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
          aria-label="Previous"
        >
          <AppIcon name="arrowLeft" :size="16" />
        </button>
        <button
          class="grid h-9 w-9 place-items-center rounded-full border border-border-gold text-champagne transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
          aria-label="Next"
        >
          <AppIcon name="arrowRight" :size="16" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <GameCard v-for="game in royalCollection" :key="game.name" :game="game" />
    </div>
  </section>
</template>
