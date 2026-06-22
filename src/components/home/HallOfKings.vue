<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import PodiumCard from './PodiumCard.vue'
import CountUp from '@/components/ui/CountUp.vue'
import { kingsSeason, kingsChampions, kingsStats } from '@/data/hallOfKings'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.1 })
</script>

<template>
  <section ref="root" class="section-glow container-royal pt-16 sm:pt-24">
    <div class="relative overflow-hidden rounded-[24px] border border-border-gold/20 px-5 py-8 shadow-[0_40px_110px_-45px_rgba(0,0,0,0.95)] sm:px-8 sm:py-10">
      <!-- Cinematic royal-hall backdrop -->
      <div
        v-lazybg="`linear-gradient(180deg, rgba(7,7,9,0.66), rgba(7,7,9,0.82)), url('/assets/images/king-hall-bg.webp')`"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundColor: '#08080a' }"
      />
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(70% 50% at 50% 0%, rgba(245,215,122,0.12), transparent 55%)" />
      <!-- Warm spotlight behind the champion (desktop) -->
      <div class="pointer-events-none absolute left-1/2 top-[22%] hidden h-[60%] w-[46%] -translate-x-1/2 lg:block" style="background: radial-gradient(circle, rgba(245,215,122,0.17), transparent 66%); filter: blur(28px)" aria-hidden="true" />
      <ParticleLayer :count="16" />

      <div class="relative z-10">
        <SectionHeader title="Hall of Kings" eyebrow="Legends of the Realm" align="center" />

        <!-- Season info bar -->
        <div class="mx-auto mb-8 flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border-gold/15 bg-black/25 backdrop-blur sm:flex-row sm:rounded-full lg:mb-10" data-reveal>
          <div class="flex flex-1 items-center justify-center gap-2 px-5 py-2.5">
            <img src="/assets/images/emblems/emblem-02-lion.webp" alt="" class="h-4 w-4 object-contain" />
            <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">{{ kingsSeason.name }}</span>
          </div>
          <div class="flex flex-1 items-center justify-center gap-2 border-t border-border-gold/12 px-5 py-2.5 sm:border-l sm:border-t-0">
            <AppIcon name="vault" :size="14" class="text-gold-bright" />
            <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">{{ kingsSeason.prizePool }}</span>
          </div>
          <div class="flex flex-1 items-center justify-center gap-2 border-t border-border-gold/12 px-5 py-2.5 sm:border-l sm:border-t-0">
            <AppIcon name="clock" :size="14" class="text-gold-bright" />
            <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-champagne">{{ kingsSeason.daysRemaining }}</span>
          </div>
        </div>

        <!-- Podium -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-end">
          <PodiumCard
            v-for="c in kingsChampions"
            :key="c.rank"
            :champion="c"
            :class="c.rank === 1 ? 'order-first sm:col-span-2 lg:order-none lg:col-span-1' : ''"
          />
        </div>

        <!-- Headline stats -->
        <div class="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-gold/25 bg-border-gold/20 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          <div v-for="s in kingsStats" :key="s.label" class="flex items-center gap-3.5 bg-[#08080b]/70 px-5 py-4 transition-colors hover:bg-[#0d0d11]/70">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/45 bg-black/30 text-gold-bright">
              <AppIcon :name="s.icon" :size="18" />
            </span>
            <div class="min-w-0">
              <p class="font-sans text-[10px] uppercase tracking-[0.12em] text-ink-dim">{{ s.label }}</p>
              <p class="font-display text-xl font-bold tabular-nums tracking-[0.01em] text-gold-bright"><CountUp :value="s.value" /></p>
              <p class="truncate font-sans text-[10px] text-ink-muted">{{ s.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
