<script setup lang="ts">
import { ref } from 'vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useEnter } from '@/composables/useEnter'
import { useRevealEach } from '@/composables/useReveal'
import {
  virtualsHero, virtualsLiveEvents, virtualsCategories, virtualsStartingSoon,
  virtualsLobby, virtualsFeatures,
} from '@/data/virtuals'

/**
 * THRONE Virtuals — premium virtual-sports page. Hero + live events · category
 * selector · starting-soon countdowns · lobby grid · most played · championships
 * · why-play. Cinematic black-gold imagery; data-driven; hover lift; reduced-motion safe.
 */
const { enter } = useEnter()
const root = ref<HTMLElement | null>(null)
useRevealEach(root)

const activeCategory = ref('All Games')
</script>

<template>
  <main ref="root" class="pb-8">
    <!-- ── 1 · Hero + live events ───────────────────────────────────────── -->
    <section class="container-royal grid gap-4 pt-6 sm:pt-8 lg:grid-cols-[1.7fr_1fr]">
      <!-- Hero -->
      <div class="relative overflow-hidden rounded-3xl border border-border-gold/25" data-reveal>
        <div
          v-lazybg="`linear-gradient(95deg, rgba(5,5,6,0.97) 0%, rgba(5,5,6,0.78) 45%, rgba(5,5,6,0.45) 100%), url('${virtualsHero.image}')`"
          class="absolute inset-0 bg-cover bg-center"
        />
        <div class="relative z-10 flex h-full flex-col justify-center p-7 sm:p-10 lg:p-12">
          <p class="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne/80">{{ virtualsHero.label }}</p>
          <h1 class="mt-3 font-display text-4xl font-bold uppercase leading-[1.05] tracking-[0.02em] sm:text-5xl">
            <span class="block text-ink">{{ virtualsHero.titleA }}</span>
            <span class="block text-gold-gradient">{{ virtualsHero.titleB }}</span>
          </h1>
          <p class="mt-4 font-sans text-[14px] text-champagne">{{ virtualsHero.sub }}</p>
          <p class="mt-1 max-w-md font-sans text-[13px] leading-7 text-ink-muted">{{ virtualsHero.body }}</p>

          <div class="mt-6 flex flex-wrap gap-3">
            <GoldButton variant="solid" size="lg" @click="enter()">Play Now <AppIcon name="arrowRight" :size="15" /></GoldButton>
            <GoldButton variant="outline" size="lg" @click="enter()">How It Works <AppIcon name="play" :size="14" /></GoldButton>
          </div>

          <ul class="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8">
            <li v-for="h in virtualsHero.highlights" :key="h.title" class="flex items-center gap-2.5">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-gold/40 text-gold-bright">
                <AppIcon :name="h.icon" :size="15" />
              </span>
              <span>
                <span class="block font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-ink">{{ h.title }}</span>
                <span class="block font-sans text-[11px] text-ink-dim">{{ h.sub }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Live events widget -->
      <div class="rounded-3xl border border-border-gold/20 bg-card/70 p-5 sm:p-6" data-reveal>
        <div class="mb-3 flex items-center justify-between">
          <h2 class="font-display text-[14px] font-semibold uppercase tracking-[0.16em] text-champagne">Popular Events</h2>
          <button class="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/90 hover:text-gold-bright">View all</button>
        </div>
        <ul class="space-y-2">
          <li v-for="e in virtualsLiveEvents" :key="e.name">
            <button class="group flex w-full items-center gap-3 rounded-xl border border-border-gold/10 bg-black/30 p-2.5 text-left transition-colors hover:border-border-gold/40" @click="enter()">
              <span class="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                <span v-lazybg="`url('${e.image}')`" class="block h-full w-full bg-cover bg-center" :style="{ backgroundColor: '#0d0d10' }" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate font-sans text-[13px] font-semibold text-ink">{{ e.name }}</span>
                <span class="block font-sans text-[11px] text-ink-dim">{{ e.kind }}</span>
              </span>
              <span class="shrink-0 font-sans text-[12px] font-semibold tabular-nums text-gold-bright">{{ e.time }}</span>
              <AppIcon name="arrowRight" :size="13" class="shrink-0 text-ink-dim transition-colors group-hover:text-gold-bright" />
            </button>
          </li>
        </ul>
      </div>
    </section>

    <!-- ── 2 · Category selector ────────────────────────────────────────── -->
    <section class="container-royal pt-8">
      <div class="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          v-for="c in virtualsCategories" :key="c"
          class="shrink-0 rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200"
          :class="activeCategory === c ? 'bg-gold-gradient text-bg' : 'border border-border-gold/20 bg-card/60 text-ink-muted hover:border-border-gold/50 hover:text-champagne'"
          @click="activeCategory = c"
        >{{ c }}</button>
      </div>
    </section>

    <!-- ── 3 · Starting soon ────────────────────────────────────────────── -->
    <section class="container-royal pt-10 sm:pt-14">
      <div class="mb-5 flex items-center justify-between">
        <h2 class="font-display text-2xl font-semibold tracking-[0.14em] text-gold-gradient">Starting Soon</h2>
        <button class="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90 hover:text-gold-bright">View all</button>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <article v-for="s in virtualsStartingSoon" :key="s.name"
          class="group relative h-44 overflow-hidden rounded-2xl border border-border-gold/15 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-gold motion-reduce:transform-none" data-reveal @click="enter()">
          <div v-lazybg="`linear-gradient(180deg, rgba(5,5,6,0.15) 30%, rgba(5,5,6,0.95)), url('${s.image}')`"
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" :style="{ backgroundColor: '#0d0d10' }" />
          <div class="relative z-10 flex h-full flex-col justify-end p-3.5">
            <span class="font-sans text-[10px] uppercase tracking-[0.12em] text-ink-dim">{{ s.kind }}</span>
            <span class="font-display text-[14px] font-semibold text-ink">{{ s.name }}</span>
            <span class="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-border-gold/40 bg-black/50 px-2 py-0.5 font-sans text-[11px] font-semibold tabular-nums text-gold-bright backdrop-blur">
              <AppIcon name="clock" :size="11" /> {{ s.time }}
            </span>
          </div>
        </article>
      </div>
    </section>

    <!-- ── 4 · Lobby grid ───────────────────────────────────────────────── -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="mb-5 flex items-center justify-between">
        <h2 class="font-display text-2xl font-semibold tracking-[0.14em] text-gold-gradient">Explore Virtuals</h2>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <article v-for="g in virtualsLobby" :key="g.title"
          class="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-gold/15 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-gold motion-reduce:transform-none" data-reveal @click="enter()">
          <div v-lazybg="`linear-gradient(180deg, rgba(5,5,6,0.1) 35%, rgba(5,5,6,0.92)), url('${g.image}')`"
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" :style="{ backgroundColor: '#0d0d10' }" />
          <span class="absolute right-2 top-2 z-10 rounded-full border border-border-gold/40 bg-black/60 px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur">Instant</span>
          <div class="relative z-10 flex h-full flex-col justify-end p-3">
            <h3 class="font-display text-[14px] font-semibold text-ink">{{ g.title }}</h3>
            <p class="font-sans text-[10px] uppercase tracking-[0.1em] text-ink-dim">{{ g.sub }} · 24/7</p>
          </div>
        </article>
      </div>
      <div class="mt-6 text-center">
        <GoldButton variant="outline" size="md" @click="enter()">Load More <AppIcon name="plus" :size="14" /></GoldButton>
      </div>
    </section>

    <!-- ── 7 · Why play virtuals ────────────────────────────────────────── -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="grid grid-cols-2 gap-3 rounded-2xl border border-border-gold/15 bg-card/60 p-4 sm:grid-cols-3 lg:grid-cols-6 lg:p-5" data-reveal>
        <div v-for="f in virtualsFeatures" :key="f.title" class="flex flex-col items-center gap-2 px-2 py-4 text-center">
          <AppIcon :name="f.icon" :size="22" class="text-gold/80" />
          <span class="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-ink">{{ f.title }}</span>
          <span class="font-sans text-[11px] leading-snug text-ink-dim">{{ f.sub }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
