<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Your Ascent — full-width progression centerpiece. Answers "how close am I to
 * my next title?" at a glance: current rank → animated bar → next rank.
 */
const root = ref<HTMLElement | null>(null)
useReveal(root)

const TARGET = 81
const pct = ref(0)
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  requestAnimationFrame(() => (pct.value = reduce ? TARGET : TARGET))
})
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-20">
    <div
      class="relative overflow-hidden rounded-[22px] border border-border-gold/25 shadow-[0_30px_80px_-34px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(245,215,122,0.08)]"
      data-reveal
    >
      <div
        v-lazybg="`linear-gradient(180deg, rgba(6,6,8,0.9), rgba(6,6,8,0.96)), url('/assets/images/hero-throne-room.webp')`"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundColor: '#08080a' }"
      />
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(120% 80% at 50% -10%, rgba(245,215,122,0.1), transparent 55%)" />
      <ParticleLayer :count="14" />

      <div class="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
        <p class="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne/70">Your Ascent</p>

        <div class="mt-7 flex flex-col items-center gap-7 lg:flex-row lg:items-center lg:gap-10">
          <!-- Current rank -->
          <div class="flex shrink-0 items-center gap-4">
            <img src="/assets/images/emblems/emblem-03-shield.webp" alt="" class="h-14 w-14 object-contain drop-shadow-[0_0_18px_rgba(245,215,122,0.45)]" />
            <div>
              <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Current Rank</p>
              <p class="font-display text-2xl font-bold tracking-[0.12em] text-gold-gradient">Duke</p>
              <p class="mt-0.5 font-sans text-[11px] tabular-nums text-ink-muted">12,450 XP earned</p>
            </div>
          </div>

          <!-- Progress -->
          <div class="w-full flex-1">
            <div class="relative h-3 w-full overflow-hidden rounded-full bg-white/[0.07]">
              <div
                class="h-full rounded-full bg-gold-gradient shadow-[0_0_14px_rgba(245,215,122,0.6)] transition-[width] duration-[1400ms] ease-out"
                :style="{ width: `${pct}%` }"
              />
            </div>
            <p class="mt-3 text-center font-display text-2xl font-bold tracking-[0.1em] text-gold-gradient">81%</p>
          </div>

          <!-- Next rank -->
          <div class="flex shrink-0 items-center gap-4 lg:flex-row-reverse lg:text-right">
            <img src="/assets/images/crown-crown.png" alt="" class="h-12 w-12 object-contain opacity-90 drop-shadow-[0_0_16px_rgba(245,215,122,0.4)]" />
            <div>
              <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Next Rank</p>
              <p class="font-display text-2xl font-bold tracking-[0.12em] text-champagne">Crown</p>
              <p class="mt-0.5 font-sans text-[11px] tabular-nums text-ink-muted">2,950 XP to next</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
