<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '@/components/page/PageHero.vue'
import FeatureBand from '@/components/page/FeatureBand.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { rewardsPage as page, kingdomPage } from '@/data/pages'
import { useRevealEach } from '@/composables/useReveal'

// Loyalty tiers reuse the kingdom rank ladder (same levels, same crowns).
const root = ref<HTMLElement | null>(null)
useRevealEach(root)

const ranks = kingdomPage.ranks
const activeIndex = ranks.findIndex((r) => r.active)
const fillWidth = (activeIndex / (ranks.length - 1)) * 100

const xpPct = computed(() => Math.round((page.summary.xp / page.summary.next) * 100))
</script>

<template>
  <main ref="root" class="pb-4">
    <PageHero v-bind="page.hero" />

    <!-- Loyalty tiers ladder -->
    <section class="container-royal relative z-20 -mt-9">
      <div
        class="grid gap-8 rounded-2xl border border-white/5 bg-card/90 px-6 py-7 shadow-card-glow backdrop-blur sm:px-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10"
      >
        <div class="shrink-0 lg:max-w-[160px]">
          <h3 class="font-display text-sm font-semibold uppercase leading-relaxed tracking-[0.22em] text-champagne">
            Loyalty<br />Tiers
          </h3>
          <p class="mt-2 font-sans text-[11px] leading-snug text-ink-dim">{{ page.tiers.sub }}</p>
        </div>

        <div class="relative overflow-x-auto py-2 [scrollbar-width:none] lg:overflow-visible">
          <div class="pointer-events-none absolute inset-x-2 top-[78px] hidden h-px bg-white/10 lg:block" />
          <div
            class="pointer-events-none absolute left-2 top-[78px] hidden h-px bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)] lg:block"
            :style="{ width: `${fillWidth}%` }"
          />
          <ol class="relative grid auto-cols-fr grid-flow-col justify-items-center gap-4">
            <li v-for="(r, i) in ranks" :key="r.name" class="flex flex-col items-center gap-2">
              <div class="relative z-10 flex h-[72px] items-end">
                <img
                  :src="r.crown"
                  :alt="`${r.name} crown`"
                  class="w-auto object-contain transition-all"
                  :class="r.active ? 'h-16 drop-shadow-[0_0_18px_rgba(245,215,122,0.8)]' : i < activeIndex ? 'h-12' : 'h-12 opacity-60'"
                />
              </div>
              <span
                class="font-sans text-[11px] font-bold uppercase tracking-[0.18em]"
                :class="r.active ? 'text-gold-bright' : 'text-ink-muted'"
              >
                {{ r.name }}
              </span>
              <span class="font-sans text-[10px] tabular-nums text-ink-dim">{{ r.range }}</span>
            </li>
          </ol>
        </div>

        <div class="flex shrink-0 flex-col items-center gap-3 text-center lg:max-w-[190px]">
          <img src="/assets/images/crown-duke.png" alt="" class="h-14 w-auto drop-shadow-[0_4px_16px_rgba(212,175,55,0.5)]" />
          <p class="font-sans text-[11px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-champagne">
            {{ page.tiers.note }}
          </p>
          <GoldButton variant="outline" size="sm">
            {{ page.tiers.cta }} <AppIcon name="arrowRight" :size="12" />
          </GoldButton>
        </div>
      </div>
    </section>

    <!-- Redeem + summary -->
    <section class="container-royal grid gap-5 pt-12 sm:pt-16 lg:grid-cols-[2.2fr_1fr]">
      <!-- Redeem panel -->
      <div class="card-lux p-6 hover:translate-y-0 sm:p-7" data-reveal>
        <div class="mb-5 flex items-center justify-between gap-4">
          <h3 class="font-display text-base font-semibold uppercase tracking-[0.2em] text-gold-gradient">
            Redeem Amazing Rewards
          </h3>
          <button class="flex shrink-0 items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-gold/90 transition-colors hover:text-gold-bright">
            View All Rewards <AppIcon name="arrowRight" :size="13" />
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          <article
            v-for="r in page.redeem"
            :key="r.title"
            class="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-border-gold"
          >
            <div class="relative aspect-square overflow-hidden">
              <div
                v-lazybg="`linear-gradient(180deg, rgba(8,8,10,0.15), rgba(5,5,5,0.65)), url('${r.image}'), url('${r.fallback}')`"
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                :style="{ backgroundColor: '#0d0d10' }"
              />
            </div>
            <div class="px-3 pb-3 pt-3 text-center">
              <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-champagne transition-colors group-hover:text-gold-bright">
                {{ r.title }}
              </h4>
              <p class="mt-0.5 font-sans text-[10px] text-ink-dim">{{ r.sub }}</p>
            </div>
            <div class="border-t border-white/5 bg-white/[0.02] py-1.5 text-center">
              <span class="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-gold/90">
                {{ r.tier }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <!-- Your rewards summary -->
      <div class="card-lux flex flex-col gap-4 p-7 hover:translate-y-0 sm:p-8" data-reveal>
        <div class="flex items-center gap-4">
          <img src="/assets/images/crown-duke.png" alt="" class="h-14 w-auto drop-shadow-[0_0_16px_rgba(245,215,122,0.55)]" />
          <div class="flex-1">
            <p class="eyebrow">Your Rewards Summary</p>
            <p class="font-display text-2xl font-bold tracking-[0.12em] text-gold-gradient">
              {{ page.summary.level }}
            </p>
          </div>
        </div>

        <div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              class="h-full rounded-full bg-gold-gradient shadow-[0_0_12px_rgba(245,215,122,0.5)] transition-[width] duration-1000"
              :style="{ width: `${xpPct}%` }"
            />
          </div>
          <p class="mt-1.5 font-sans text-[10px] uppercase tracking-[0.08em] text-ink-dim">
            {{ page.summary.toNext }}
          </p>
        </div>

        <div class="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/5 bg-white/[0.03]">
          <div
            v-for="s in page.summary.stats"
            :key="s.label"
            class="flex flex-col items-center gap-1.5 bg-card/70 px-2 py-4 text-center"
          >
            <AppIcon :name="s.icon" :size="18" class="text-gold/80" />
            <span class="font-sans text-[9px] font-semibold uppercase leading-tight tracking-[0.1em] text-ink-dim">
              {{ s.label }}
            </span>
            <span class="font-display text-base font-bold tabular-nums text-gold-gradient">
              {{ s.value }}
            </span>
          </div>
        </div>

        <GoldButton variant="outline" size="md" block class="mt-auto">
          {{ page.summary.cta }} <AppIcon name="arrowRight" :size="14" />
        </GoldButton>
      </div>
    </section>

    <FeatureBand :items="page.band" />
  </main>
</template>
