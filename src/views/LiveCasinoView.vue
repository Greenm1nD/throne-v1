<script setup lang="ts">
import { ref } from 'vue'
import { useRevealEach } from '@/composables/useReveal'
import PageHero from '@/components/page/PageHero.vue'
import CategoryStrip from '@/components/page/CategoryStrip.vue'
import FeatureBand from '@/components/page/FeatureBand.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { livePage as page } from '@/data/pages'

const root = ref<HTMLElement | null>(null)
useRevealEach(root)
</script>

<template>
  <main ref="root" class="pb-4">
    <PageHero v-bind="page.hero">
      <template #below>
        <!-- Mini feature row under the CTAs -->
        <div class="mt-9 flex flex-wrap gap-x-8 gap-y-4">
          <div
            v-for="f in page.hero.features"
            :key="f.title"
            class="flex flex-col items-center gap-2"
          >
            <span
              class="grid h-11 w-11 place-items-center rounded-full border border-border-gold text-champagne"
              style="background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)"
            >
              <AppIcon :name="f.icon!" :size="18" />
            </span>
            <span class="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ f.title }}
            </span>
          </div>
        </div>
      </template>
    </PageHero>

    <CategoryStrip :items="page.categories" />

    <!-- Top games + exclusive -->
    <section class="container-royal grid gap-5 pt-12 sm:pt-16 lg:grid-cols-[1.7fr_1fr]">
      <!-- Top games panel -->
      <div class="card-lux p-6 hover:translate-y-0 sm:p-7" data-reveal>
        <div class="mb-5 flex items-center justify-between">
          <h3 class="font-display text-sm font-semibold uppercase tracking-[0.22em] text-champagne">
            Top Games
          </h3>
          <div class="flex items-center gap-3">
            <GoldButton variant="ghost" size="sm">View All</GoldButton>
            <div class="flex gap-2">
              <button
                class="grid h-8 w-8 place-items-center rounded-full border border-border-gold text-champagne transition-colors hover:border-gold hover:text-gold-bright"
                aria-label="Previous"
              >
                <AppIcon name="arrowLeft" :size="14" />
              </button>
              <button
                class="grid h-8 w-8 place-items-center rounded-full border border-border-gold text-champagne transition-colors hover:border-gold hover:text-gold-bright"
                aria-label="Next"
              >
                <AppIcon name="arrowRight" :size="14" />
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          <article
            v-for="t in page.tables"
            :key="t.name"
            class="group cursor-pointer overflow-hidden rounded-xl border border-border-gold/70 bg-card shadow-[inset_0_1px_0_rgba(245,215,122,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-lift"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="t.image"
                :alt="t.name"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <!-- LIVE chip -->
              <span
                class="absolute left-2 top-2 flex items-center gap-1.5 rounded bg-black/70 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-gold-bright backdrop-blur"
              >
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright" /> Live
              </span>
              <!-- Royal badges -->
              <span
                v-if="t.hot"
                class="absolute right-2 top-2 flex items-center gap-1 rounded bg-gold-gradient px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#1a1407] shadow-gold-soft"
              >
                <AppIcon name="crown" :size="10" /> Hot
              </span>
              <span
                v-else-if="t.isNew"
                class="absolute right-2 top-2 rounded border border-gold/60 bg-black/60 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur"
              >
                New
              </span>
              <!-- Hover play overlay -->
              <div
                class="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
              >
                <GoldButton variant="solid" size="sm">
                  <AppIcon name="play" :size="12" /> Join Table
                </GoldButton>
              </div>
              <span class="shine-beam" />
            </div>

            <div class="px-3 py-3">
              <div class="flex items-center justify-between gap-2">
                <p class="truncate font-sans text-[12px] font-semibold text-ink transition-colors group-hover:text-gold-bright">
                  {{ t.name }}
                </p>
                <span class="flex shrink-0 items-center gap-1 font-sans text-[10px] tabular-nums text-ink-dim">
                  <AppIcon name="user" :size="10" /> {{ t.players }}
                </span>
              </div>
              <p class="mt-1 flex items-center justify-between font-sans text-[10px] text-ink-dim">
                <span class="flex items-center gap-1.5">
                  <span class="h-1 w-1 rounded-full bg-gold/70" /> {{ t.provider }}
                </span>
                <span class="tabular-nums">{{ t.stakes }}</span>
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Exclusive experiences -->
      <div class="card-lux group relative overflow-hidden p-7 hover:translate-y-0 sm:p-8" data-reveal>
        <div
          v-lazybg="`linear-gradient(110deg, rgba(8,8,10,0.94) 42%, rgba(8,8,10,0.5)), url('${page.exclusive.image}'), url('${page.exclusive.fallback}')`"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        />
        <div class="relative z-10 flex h-full flex-col items-start justify-center gap-2">
          <p class="eyebrow">{{ page.exclusive.eyebrow }}</p>
          <h3 class="font-display text-2xl font-semibold tracking-[0.1em] text-gold-gradient">
            {{ page.exclusive.title }}
          </h3>
          <p class="max-w-xs font-sans text-sm leading-relaxed text-ink-muted">
            {{ page.exclusive.sub }}
          </p>
          <GoldButton variant="outline" size="md" class="mt-4">
            {{ page.exclusive.cta }} <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </section>

    <FeatureBand :items="page.band" data-reveal />
  </main>
</template>
