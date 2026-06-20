<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/page/PageHero.vue'
import FeatureBand from '@/components/page/FeatureBand.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { categoryPages } from '@/data/categoryPages'
import { useRevealEach } from '@/composables/useReveal'
import { useEnter } from '@/composables/useEnter'

/**
 * One config-driven view powering the dedicated category pages (E-Sports, Live,
 * Virtual, Games, Poker). The route's meta.category selects the config; content
 * renders as betting "events" rows or a "grid" of cards depending on the product.
 */
const route = useRoute()
const { enter } = useEnter()

const cfg = computed(() => categoryPages[(route.meta.category as string) || 'esports'])

const root = ref<HTMLElement | null>(null)
useRevealEach(root)
// Re-run reveal when navigating between category pages (same component reused).
watch(() => route.path, () => useRevealEach(root))
</script>

<template>
  <main ref="root" class="pb-6">
    <PageHero v-bind="cfg.hero" @primary="enter()" />

    <!-- Section header -->
    <section class="container-royal pt-10 sm:pt-14">
      <div class="mb-6">
        <p class="eyebrow">{{ cfg.hero.tagline }}</p>
        <h2 class="mt-1 font-display text-2xl font-semibold tracking-[0.14em] text-gold-gradient">{{ cfg.sectionTitle }}</h2>
        <p class="mt-1 font-sans text-[13px] text-ink-dim">{{ cfg.sectionSub }}</p>
      </div>

      <!-- EVENTS mode (esports / live / virtual) -->
      <ul v-if="cfg.mode === 'events'" class="grid gap-3 lg:grid-cols-2">
        <li v-for="(e, i) in cfg.events" :key="i"
          class="flex items-center gap-4 rounded-2xl border border-border-gold/15 bg-card/70 p-4 transition-colors hover:border-border-gold/50" data-reveal>
          <div class="min-w-0 flex-1">
            <p class="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.12em] text-ink-dim">
              <span v-if="e.live" class="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-1.5 py-0.5 text-[9px] font-bold text-rose-400">
                <span class="h-1.5 w-1.5 rounded-full bg-rose-400" /> LIVE
              </span>
              {{ e.league }}
            </p>
            <div class="mt-1.5 flex items-center justify-between gap-3">
              <span class="truncate font-sans text-[14px] font-semibold text-ink">{{ e.a }}</span>
              <span class="shrink-0 font-sans text-[11px] tabular-nums text-champagne">{{ e.when }}</span>
            </div>
            <div class="mt-0.5 truncate font-sans text-[14px] font-semibold text-ink">{{ e.b }}</div>
          </div>
          <div class="flex shrink-0 gap-2">
            <span class="grid h-12 w-14 place-items-center rounded-lg border border-border-gold/30 bg-black/30 font-sans text-[13px] font-bold tabular-nums text-gold-bright transition-colors hover:border-gold">{{ e.oddsA }}</span>
            <span v-if="e.oddsX" class="grid h-12 w-14 place-items-center rounded-lg border border-border-gold/30 bg-black/30 font-sans text-[13px] font-bold tabular-nums text-gold-bright transition-colors hover:border-gold">{{ e.oddsX }}</span>
            <span v-if="e.oddsB !== '—'" class="grid h-12 w-14 place-items-center rounded-lg border border-border-gold/30 bg-black/30 font-sans text-[13px] font-bold tabular-nums text-gold-bright transition-colors hover:border-gold">{{ e.oddsB }}</span>
            <span v-else class="grid h-12 w-14 place-items-center rounded-lg border border-border-gold/20 font-sans text-[11px] uppercase text-ink-dim">All</span>
          </div>
        </li>
      </ul>

      <!-- GRID mode (games / poker) -->
      <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <article v-for="x in cfg.items" :key="x.name"
          class="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-border-gold/15 transition-all duration-300 hover:-translate-y-1 hover:border-gold motion-reduce:transform-none"
          data-reveal @click="enter()">
          <div v-lazybg="`linear-gradient(180deg, rgba(5,5,6,0.1) 35%, rgba(5,5,6,0.92)), url('${x.image}')`"
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" :style="{ backgroundColor: '#0d0d10' }" />
          <span v-if="x.tag" class="absolute left-3 top-3 z-10 rounded-full border border-border-gold/50 bg-black/60 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur">{{ x.tag }}</span>
          <div class="relative z-10 flex h-full flex-col justify-end p-4">
            <h3 class="font-display text-base font-semibold tracking-[0.04em] text-ink">{{ x.name }}</h3>
            <p class="font-sans text-[11px] text-ink-muted">{{ x.meta }}</p>
            <span class="mt-2 inline-flex items-center gap-1 font-sans text-[11px] font-semibold text-champagne opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              Play <AppIcon name="arrowRight" :size="12" />
            </span>
          </div>
        </article>
      </div>
    </section>

    <FeatureBand :items="cfg.band" />

    <!-- CTA -->
    <section class="container-royal pt-14 sm:pt-20">
      <div class="relative overflow-hidden rounded-3xl border border-border-gold/40" data-reveal>
        <div v-lazybg="`linear-gradient(90deg, rgba(4,4,5,0.95), rgba(4,4,5,0.6) 55%, rgba(4,4,5,0.3)), url('${cfg.hero.fallback}')`"
          class="absolute inset-0 bg-cover bg-center" />
        <div class="relative z-10 max-w-xl p-8 sm:p-12">
          <h2 class="font-display text-3xl font-bold tracking-[0.08em] text-gold-gradient sm:text-4xl">{{ cfg.cta.title }}</h2>
          <p class="mt-3 max-w-md font-sans text-[14px] leading-7 text-ink-muted">{{ cfg.cta.sub }}</p>
          <GoldButton variant="solid" size="lg" class="mt-6" @click="enter()">{{ cfg.hero.cta }} <AppIcon name="arrowRight" :size="15" /></GoldButton>
        </div>
      </div>
    </section>
  </main>
</template>
