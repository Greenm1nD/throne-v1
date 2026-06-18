<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GameCard from './GameCard.vue'
import { royalCollection } from '@/data/games'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.12 })

const router = useRouter()
</script>

<template>
  <section id="casino" ref="root" class="section-glow container-royal pt-16 sm:pt-24">
    <SectionHeader title="Royal Collection" eyebrow="Curated Tables" />

    <div class="mb-6 flex items-center justify-end">
      <GoldButton variant="ghost" size="sm" @click="router.push('/casino')">
        View All <AppIcon name="arrowRight" :size="14" />
      </GoldButton>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <GameCard v-for="game in royalCollection" :key="game.name" :game="game" />
    </div>
  </section>
</template>
