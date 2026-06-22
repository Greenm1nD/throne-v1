<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { hallOfKings } from '@/data/hallOfKings'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.1 })
</script>

<template>
  <section ref="root" class="section-glow container-royal pt-16 sm:pt-24">
    <SectionHeader title="Hall of Kings" eyebrow="Legends of the Realm" />

    <div class="relative overflow-hidden rounded-[24px] border border-border-gold/20 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-7">
      <div
        v-lazybg="`linear-gradient(180deg, rgba(7,7,9,0.85), rgba(7,7,9,0.93)), url('/assets/images/hall-of-kings-bg.webp')`"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundColor: '#08080a' }"
      />
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(90% 60% at 50% 0%, rgba(245,215,122,0.1), transparent 55%)" />
      <div class="relative z-10 hall-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="stat in hallOfKings"
        :key="stat.label"
        v-glow
        class="card-lux group flex flex-col items-center gap-4 p-6 text-center"
        data-reveal
      >
        <!-- Cinematic backdrop (dark, lazy-loaded) -->
        <div
          v-lazybg="`linear-gradient(180deg, rgba(8,8,10,0.82), rgba(5,5,5,0.94)), url('${stat.image}')`"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <!-- Crest glow + glyph -->
        <div
          class="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-border-gold transition-all duration-300 group-hover:shadow-gold-soft"
          style="background: radial-gradient(circle, rgba(212, 175, 55, 0.12), transparent 70%)"
        >
          <div class="absolute inset-1.5 animate-ringRotate rounded-full border border-dashed border-gold/20" />
          <AppIcon :name="stat.icon" :size="26" class="text-champagne transition-colors group-hover:text-gold-bright" />
        </div>

        <div class="relative z-10">
          <p class="eyebrow">{{ stat.label }}</p>
          <p
            class="mt-2 font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient"
          >
            {{ stat.value }}
          </p>
          <p class="mt-1.5 font-sans text-[11px] text-ink-dim">{{ stat.detail }}</p>
        </div>

        <GoldButton
          variant="ghost"
          size="sm"
          class="relative z-10 opacity-70 transition-opacity group-hover:opacity-100"
        >
          {{ stat.cta }} <AppIcon name="arrowRight" :size="12" />
        </GoldButton>

        <!-- Hover shine -->
        <span class="shine-beam" />
      </article>
      </div>
    </div>
  </section>
</template>
