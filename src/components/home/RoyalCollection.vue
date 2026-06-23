<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
  <section id="casino" ref="root" class="section-glow container-royal pt-10 sm:pt-14">
    <div class="mb-2 flex items-center justify-end">
      <GoldButton variant="ghost" size="sm" @click="router.push('/casino')">
        View All <AppIcon name="arrowRight" :size="14" />
      </GoldButton>
    </div>

    <div class="rc-cards grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <GameCard v-for="game in royalCollection" :key="game.name" :game="game" />
    </div>
  </section>
</template>
