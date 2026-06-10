<script setup lang="ts">
import { ref } from 'vue'
import FeatureCard from './FeatureCard.vue'
import { features } from '@/data/features'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.14 })
</script>

<template>
  <section id="live-casino" ref="root" class="container-royal pt-12 sm:pt-16">
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard v-for="f in features" :key="f.title" :feature="f" />
    </div>
  </section>
</template>
