<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { vipLevels } from '@/data/vipLevels'

// Highest tier (Monarch) is emphasised, as in the reference.
const highlightIndex = vipLevels.length - 1
</script>

<template>
  <section id="kingdom" class="container-royal relative z-20 -mt-10 sm:-mt-12">
    <!-- Plain bar; the gold frame appears only on hover -->
    <div
      class="rounded-2xl border border-white/5 bg-card/85 px-5 pb-6 pt-9 shadow-card-glow transition-colors duration-300 hover:border-border-gold sm:px-7 sm:pb-7 sm:pt-10"
    >
      <div class="flex items-center gap-4 sm:gap-6">
        <!-- Title -->
        <h3
          class="shrink-0 font-display text-xs font-semibold uppercase leading-tight tracking-[0.22em] text-champagne sm:text-sm"
        >
          Kingdom<br />Status
        </h3>

        <!-- Rail: ‹  crown ◇ crown ◇ … crown  › -->
        <div
          class="flex flex-1 items-center gap-3 overflow-x-auto py-2 [scrollbar-width:none] lg:overflow-visible"
        >
          <AppIcon name="arrowLeft" :size="16" class="shrink-0 text-ink-dim" />

          <div class="flex flex-1 items-center justify-between gap-3 sm:gap-4">
            <template v-for="(lvl, i) in vipLevels" :key="lvl.name">
              <div class="flex shrink-0 flex-col items-center gap-2">
                <!-- Fixed-height slot, bottom-aligned -> every label lands on one baseline -->
                <div class="flex h-12 items-end justify-center">
                  <img
                    :src="lvl.crown"
                    :alt="`${lvl.name} crown`"
                    class="w-auto object-contain transition-all duration-300"
                    :class="
                      i === highlightIndex
                        ? 'h-11 drop-shadow-[0_0_16px_rgba(245,215,122,0.8)]'
                        : 'h-9 opacity-85'
                    "
                  />
                </div>
                <span
                  class="whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.2em]"
                  :class="i === highlightIndex ? 'text-gold-bright' : 'text-ink-muted'"
                >
                  {{ lvl.name }}
                </span>
              </div>

              <span
                v-if="i < vipLevels.length - 1"
                class="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/45"
              />
            </template>
          </div>

          <AppIcon name="arrowRight" :size="16" class="shrink-0 text-ink-dim" />
        </div>
      </div>
    </div>
  </section>
</template>
