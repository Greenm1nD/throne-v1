<script setup lang="ts">
import ProgressionWidget from '@/components/progression/ProgressionWidget.vue'
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn } = useAuth()
</script>

<template>
  <section id="kingdom" class="container-royal relative z-20 mt-2 sm:-mt-12">
    <!-- Plain bar; the gold frame appears only on hover -->
    <div
      class="veined rounded-2xl border border-border-gold/10 bg-card/85 px-5 pb-6 pt-9 shadow-card-glow transition-colors duration-300 hover:border-border-gold sm:px-7 sm:pb-7 sm:pt-9"
    >
      <!-- Guests see the ladder with no personal position; members see their rank. -->
      <ProgressionWidget placement="Bar" :anonymous="!isLoggedIn" />
    </div>
  </section>
</template>
