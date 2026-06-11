<script setup lang="ts">
import PageHero from '@/components/page/PageHero.vue'
import CategoryStrip from '@/components/page/CategoryStrip.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { casinoPage as page } from '@/data/pages'
import { useAuthModal } from '@/composables/useAuthModal'

const { open } = useAuthModal()
</script>

<template>
  <main class="pb-4">
    <PageHero v-bind="page.hero" :cta="page.hero.cta" />

    <CategoryStrip :items="page.categories" />

    <!-- Progressive jackpot banner -->
    <section class="container-royal pt-12 sm:pt-16">
      <div
        class="group relative flex min-h-[180px] flex-col justify-center gap-5 overflow-hidden rounded-2xl border border-border-gold px-7 py-8 shadow-card-glow sm:flex-row sm:items-center sm:gap-10 sm:px-10"
      >
        <div
          v-lazybg="`linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.75) 45%, rgba(5,5,5,0.25)), url('${page.jackpot.image}'), url('${page.jackpot.fallback}')`"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-105"
          :style="{ backgroundColor: '#0d0b07' }"
        />
        <span class="shine-beam" />

        <h2
          class="relative z-10 max-w-[200px] font-display text-xl font-semibold uppercase leading-snug tracking-[0.18em] text-champagne"
        >
          Progressive<br />Jackpot
        </h2>
        <span class="relative z-10 hidden h-14 w-px bg-white/10 sm:block" />
        <div class="relative z-10 flex flex-1 flex-col gap-4">
          <p class="font-display text-4xl font-bold tracking-[0.06em] text-gold-gradient sm:text-5xl">
            {{ page.jackpot.amount }}
          </p>
          <GoldButton variant="outline" size="sm" class="self-start">
            {{ page.jackpot.cta }} <AppIcon name="arrowRight" :size="13" />
          </GoldButton>
        </div>
      </div>
    </section>

    <!-- VIP experience band -->
    <section class="container-royal pt-12 sm:pt-16">
      <div
        class="grid gap-8 rounded-2xl border border-white/5 bg-card/70 px-8 py-8 lg:grid-cols-[auto_1fr_auto] lg:items-center"
        style="background-image: linear-gradient(180deg, rgba(13,13,16,0.85), rgba(8,8,10,0.92)), url('/assets/images/texture-marble.webp'); background-size: cover"
      >
        <div>
          <h3 class="font-display text-lg font-semibold tracking-[0.16em] text-gold-gradient">
            VIP Experience
          </h3>
          <p class="eyebrow mt-2">Unlock royal privileges</p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <div
            v-for="f in page.vipBand.items"
            :key="f.title"
            class="flex flex-col items-center gap-2 text-center"
          >
            <span
              class="grid h-11 w-11 place-items-center rounded-full border border-border-gold text-champagne"
              style="background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)"
            >
              <AppIcon :name="f.icon!" :size="18" />
            </span>
            <span class="max-w-[90px] font-sans text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-ink-muted">
              {{ f.title }}
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center gap-3 lg:items-end">
          <p class="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne">
            {{ page.vipBand.ctaLead }}
          </p>
          <GoldButton variant="solid" size="md" @click="open('register')">
            {{ page.vipBand.cta }} <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </section>
  </main>
</template>
