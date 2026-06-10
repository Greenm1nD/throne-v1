<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { vipLevels, playerStatus } from '@/data/vipLevels'

const currentIndex = computed(() =>
  Math.max(0, vipLevels.findIndex((l) => l.name === playerStatus.currentLevel)),
)
const monarchIndex = vipLevels.length - 1

// Filled portion of the rank line (up to the current rank).
const lineTarget = computed(
  () => (currentIndex.value / (vipLevels.length - 1)) * 100,
)
const xpTarget = computed(() =>
  Math.min(100, Math.round((playerStatus.xp / playerStatus.nextThreshold) * 100)),
)

// Animate the fills in on mount.
const linePct = ref(0)
const xpPct = ref(0)
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  requestAnimationFrame(() => {
    linePct.value = reduce ? lineTarget.value : lineTarget.value
    xpPct.value = xpTarget.value
  })
})

const xpLabel = computed(
  () =>
    `${playerStatus.xp.toLocaleString()} / ${playerStatus.nextThreshold.toLocaleString()} XP`,
)
</script>

<template>
  <section id="kingdom" class="container-royal relative z-20 -mt-10 sm:-mt-12">
    <!-- Plain bar; the gold frame appears only on hover -->
    <div
      class="veined rounded-2xl border border-white/5 bg-card/85 px-5 pb-6 pt-9 shadow-card-glow transition-colors duration-300 hover:border-border-gold sm:px-7 sm:pb-7 sm:pt-9"
    >
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        <!-- Title -->
        <h3
          class="shrink-0 font-display text-xs font-semibold uppercase leading-tight tracking-[0.22em] text-champagne sm:text-sm"
        >
          Kingdom<br class="hidden lg:block" /> Status
        </h3>

        <!-- Rail with connecting progress line -->
        <div
          class="flex flex-1 items-center gap-3 overflow-x-auto py-1 [scrollbar-width:none] lg:overflow-visible"
        >
          <AppIcon name="arrowLeft" :size="16" class="shrink-0 text-ink-dim" />

          <div class="relative flex-1 px-1">
            <!-- track + animated fill (sits just below the crowns) -->
            <div class="pointer-events-none absolute inset-x-2 top-[52px] h-[2px] rounded bg-white/10" />
            <div
              class="pointer-events-none absolute left-2 top-[52px] h-[2px] rounded bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)] transition-[width] duration-1000 ease-out"
              :style="{ width: `calc(${linePct}% - 0px)` }"
            />

            <ol class="relative flex items-start justify-between">
              <li
                v-for="(lvl, i) in vipLevels"
                :key="lvl.name"
                class="group/crown relative flex shrink-0 flex-col items-center"
              >
                <!-- Monarch aura -->
                <ParticleLayer v-if="i === monarchIndex" :count="8" />

                <div class="flex h-12 items-end justify-center">
                  <img
                    :src="lvl.crown"
                    :alt="`${lvl.name} crown`"
                    class="w-auto object-contain transition-all duration-300"
                    :class="
                      i === currentIndex
                        ? 'h-11 drop-shadow-[0_0_16px_rgba(245,215,122,0.85)]'
                        : i < currentIndex
                          ? 'h-9'
                          : 'h-9 opacity-60'
                    "
                  />
                </div>

                <span
                  class="relative z-10 mt-4 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.2em]"
                  :class="i === currentIndex ? 'text-gold-bright' : 'text-ink-muted'"
                >
                  {{ lvl.name }}
                </span>

                <!-- Hover tooltip -->
                <span
                  class="pointer-events-none absolute -top-8 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-gold bg-black/90 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-champagne opacity-0 transition-opacity duration-200 group-hover/crown:opacity-100"
                >
                  {{ lvl.threshold.toLocaleString() }} XP
                </span>
              </li>
            </ol>
          </div>

          <AppIcon name="arrowRight" :size="16" class="shrink-0 text-ink-dim" />
        </div>

        <!-- Your Level card -->
        <div
          class="shrink-0 rounded-xl border border-border-gold bg-black/40 p-4 lg:w-72"
        >
          <div class="flex items-baseline justify-between">
            <span class="eyebrow">Your Level</span>
            <span class="font-display text-lg font-semibold tracking-[0.12em] text-gold-gradient">
              {{ playerStatus.currentLevel }}
            </span>
          </div>
          <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              class="h-full rounded-full bg-gold-gradient shadow-[0_0_12px_rgba(245,215,122,0.5)] transition-[width] duration-1000 ease-out"
              :style="{ width: `${xpPct}%` }"
            />
          </div>
          <p class="mt-2 text-right font-sans text-[11px] tabular-nums text-ink-muted">
            {{ xpLabel }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
