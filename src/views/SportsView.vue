<script setup lang="ts">
import PageHero from '@/components/page/PageHero.vue'
import CategoryStrip from '@/components/page/CategoryStrip.vue'
import FeatureBand from '@/components/page/FeatureBand.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { sportsPage as page } from '@/data/pages'
</script>

<template>
  <main class="pb-4">
    <PageHero v-bind="page.hero" />

    <CategoryStrip :items="page.sports" />

    <!-- Live matches + boost -->
    <section class="container-royal grid gap-5 pt-12 sm:pt-16 lg:grid-cols-[1.6fr_1fr]">
      <!-- Live now panel -->
      <div class="card-lux p-6 hover:translate-y-0 sm:p-7">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="relative flex h-2.5 w-2.5">
              <span class="absolute h-full w-full animate-ping rounded-full bg-gold/60" />
              <span class="relative h-2.5 w-2.5 rounded-full bg-gold-bright" />
            </span>
            <h3 class="font-sans text-xs font-bold uppercase tracking-[0.22em] text-champagne">
              Live Now <span class="ml-2 font-medium text-ink-dim">Top Matches</span>
            </h3>
          </div>
          <div class="hidden gap-9 pr-12 font-sans text-[11px] font-semibold text-ink-dim sm:flex">
            <span>1</span><span>X</span><span>2</span>
          </div>
        </div>

        <ul class="mt-5 divide-y divide-white/5">
          <li
            v-for="m in page.matches"
            :key="m.home.name"
            class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-3">
              <span
                class="rounded border border-gold/40 bg-gold/10 px-1.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-gold-bright"
              >
                Live
              </span>
              <span class="w-7 font-sans text-[11px] tabular-nums text-ink-dim">{{ m.minute }}</span>
              <div class="font-sans text-[13px] leading-6 text-ink">
                <p>{{ m.home.name }}</p>
                <p>{{ m.away.name }}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="mr-2 text-right font-sans text-[13px] font-semibold leading-6 tabular-nums text-gold-bright">
                <p>{{ m.home.score }}</p>
                <p>{{ m.away.score }}</p>
              </div>
              <button
                v-for="o in m.odds"
                :key="o"
                class="h-11 w-16 rounded-lg border border-white/10 bg-black/40 font-sans text-[13px] font-semibold tabular-nums text-ink transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
              >
                {{ o }}
              </button>
              <button class="ml-1 flex items-center gap-1 font-sans text-[11px] font-semibold text-gold/80 transition-colors hover:text-gold-bright">
                {{ m.more }} <AppIcon name="arrowRight" :size="12" />
              </button>
            </div>
          </li>
        </ul>

        <button class="mt-4 flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold/90 transition-colors hover:text-gold-bright">
          View All Live Events <AppIcon name="arrowRight" :size="13" />
        </button>
      </div>

      <!-- Boost card -->
      <div class="card-lux group relative overflow-hidden p-7 hover:translate-y-0 sm:p-8">
        <div
          v-lazybg="`linear-gradient(110deg, rgba(8,8,10,0.92) 32%, rgba(8,8,10,0.35)), url('${page.boost.image}'), url('${page.boost.fallback}')`"
          class="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-105"
          :style="{ backgroundPosition: '68% center' }"
        />
        <div class="relative z-10 flex h-full flex-col items-start justify-center gap-2">
          <h3 class="font-display text-xl font-semibold uppercase tracking-[0.1em] text-champagne">
            {{ page.boost.title }}
          </h3>
          <p class="font-display text-4xl font-bold tracking-[0.06em] text-gold-gradient">
            {{ page.boost.amount }}
          </p>
          <p class="eyebrow">{{ page.boost.sub }}</p>
          <GoldButton variant="solid" size="md" class="mt-4">
            {{ page.boost.cta }} <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </section>

    <FeatureBand :items="page.band" />
  </main>
</template>
