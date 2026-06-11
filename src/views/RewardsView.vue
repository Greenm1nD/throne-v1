<script setup lang="ts">
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import RoyalDivider from '@/components/ui/RoyalDivider.vue'
import { royalTreasures } from '@/data/rewards'
import { useAuthModal } from '@/composables/useAuthModal'

const { open } = useAuthModal()
</script>

<template>
  <!-- Interim page — will be rebuilt to match the Rewards reference when provided -->
  <main class="pb-4">
    <section class="grain relative flex min-h-[420px] items-center overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.7), rgba(5,5,5,0.92)), url('/assets/images/treasury-banner.webp')`,
          backgroundColor: '#07070a',
        }"
      />
      <div class="container-royal relative z-10 flex flex-col items-center py-16 text-center">
        <AppIcon name="gift" :size="30" class="text-gold-bright" />
        <h1 class="mt-3 font-display text-5xl font-bold tracking-[0.12em] text-gold-gradient sm:text-6xl">
          Rewards
        </h1>
        <p class="mt-4 font-sans text-sm font-medium uppercase tracking-[0.3em] text-ink">
          Tribute for the loyal
        </p>
        <GoldButton variant="solid" size="lg" class="mt-8" @click="open('register')">
          Claim Your Crown <AppIcon name="arrowRight" :size="15" />
        </GoldButton>
      </div>
    </section>

    <div class="container-royal pt-12"><RoyalDivider /></div>

    <section class="container-royal grid grid-cols-2 gap-5 pt-10 sm:grid-cols-3 lg:grid-cols-5">
      <article
        v-for="r in royalTreasures"
        :key="r.title"
        class="card-lux flex flex-col items-center gap-3 p-6 text-center"
      >
        <img :src="r.image" :alt="r.title" loading="lazy" class="h-16 w-16 object-contain drop-shadow-[0_4px_14px_rgba(212,175,55,0.35)]" />
        <h3 class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">
          {{ r.title }}
        </h3>
        <p class="font-sans text-[11px] leading-snug text-ink-dim">{{ r.description }}</p>
      </article>
    </section>
  </main>
</template>
