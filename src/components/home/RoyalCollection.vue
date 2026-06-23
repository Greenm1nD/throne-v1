<script setup lang="ts">
import { ref } from 'vue'
import GameCard from './GameCard.vue'
import { royalCollection } from '@/data/games'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.12 })
</script>

<template>
  <section id="casino" ref="root" class="section-glow container-royal pt-10 sm:pt-14">
    <div class="rc-cards grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <GameCard v-for="game in royalCollection" :key="game.name" :game="game" />
    </div>
  </section>
</template>
