<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '@/components/page/PageHero.vue'
import CategoryStrip from '@/components/page/CategoryStrip.vue'
import FeatureBand from '@/components/page/FeatureBand.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GameCard from '@/components/home/GameCard.vue'
import { sportsPage as page } from '@/data/pages'
import { royalCollection } from '@/data/games'

const provider = ref(0)
</script>

<template>
  <main class="pb-4">
    <PageHero v-bind="page.hero" />

    <CategoryStrip :items="page.sports" />

    <!-- ── The Arena: provider sportsbook frame, dressed in THRONE ── -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="card-lux overflow-hidden p-0 hover:translate-y-0">
        <!-- Frame chrome -->
        <div
          class="flex flex-col gap-4 border-b border-white/5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-4">
            <h3 class="font-display text-sm font-semibold uppercase tracking-[0.22em] text-champagne">
              The Arena
            </h3>
            <span
              class="flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-gold-bright"
            >
              <span class="relative flex h-1.5 w-1.5">
                <span class="absolute h-full w-full animate-ping rounded-full bg-gold/60" />
                <span class="relative h-1.5 w-1.5 rounded-full bg-gold-bright" />
              </span>
              {{ page.sportsbook.events }}
            </span>
          </div>

          <!-- Provider switch -->
          <div class="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
            <button
              v-for="(p, i) in page.sportsbook.providers"
              :key="p"
              class="rounded-full px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
              :class="
                provider === i
                  ? 'bg-gold-gradient text-[#1a1407] shadow-gold-soft'
                  : 'text-ink-muted hover:text-gold-bright'
              "
              @click="provider = i"
            >
              {{ p }}
            </button>
          </div>
        </div>

        <!-- Live provider iframe -->
        <iframe
          v-if="page.sportsbook.src"
          :src="page.sportsbook.src"
          class="h-[760px] w-full border-0 bg-[#07070a]"
          title="THRONE Sportsbook"
          loading="lazy"
          allow="fullscreen"
        />

        <!-- THRONE loading shell (shown until a provider src is configured) -->
        <div
          v-else
          class="veined relative flex min-h-[620px] flex-col items-center justify-center gap-8 px-6 py-14"
          style="background: radial-gradient(60% 45% at 50% 30%, rgba(212, 175, 55, 0.05), transparent 70%)"
        >
          <!-- Gold spinner -->
          <div class="relative flex h-24 w-24 items-center justify-center">
            <svg class="absolute inset-0 h-full w-full animate-ringRotate" style="animation-duration: 2.6s" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" stroke="rgba(212,175,55,0.15)" stroke-width="2" />
              <circle
                cx="50" cy="50" r="45"
                stroke="url(#sbGrad)" stroke-width="2.5" stroke-linecap="round"
                stroke-dasharray="80 203"
              />
              <defs>
                <linearGradient id="sbGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#F5D77A" />
                  <stop offset="100%" stop-color="#D4AF37" stop-opacity="0.15" />
                </linearGradient>
              </defs>
            </svg>
            <img src="/assets/images/crown-duke.png" alt="" class="h-9 w-auto opacity-90" />
          </div>

          <div class="text-center">
            <p class="font-display text-lg font-semibold tracking-[0.18em] text-gold-gradient">
              Preparing the Arena
            </p>
            <p class="mx-auto mt-2 max-w-sm font-sans text-[12px] leading-relaxed text-ink-dim">
              {{ page.sportsbook.note }}
            </p>
          </div>

          <!-- Skeleton match rows -->
          <div class="w-full max-w-2xl space-y-3">
            <div
              v-for="i in 4"
              :key="i"
              class="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4"
              :style="{ animation: `goldenPulse ${3 + i * 0.35}s ease-in-out ${-i * 0.6}s infinite` }"
            >
              <div class="flex-1 space-y-2.5">
                <div class="h-2 w-2/3 rounded-full bg-white/10" />
                <div class="h-2 w-1/2 rounded-full bg-white/10" />
              </div>
              <div class="flex gap-2">
                <span v-for="o in 3" :key="o" class="h-9 w-14 rounded-lg border border-gold/15 bg-gold/[0.05]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Integration note -->
      <p
        class="mt-3 flex items-center gap-2.5 rounded-xl border border-dashed border-white/10 px-4 py-2.5 font-sans text-[11px] text-ink-dim"
      >
        <AppIcon name="sparkle" :size="13" class="shrink-0 text-gold/60" />
        This section is a styled container — the live feed renders from the third-party provider iframe once its URL is configured.
      </p>
    </section>

    <!-- Boost banner (full-width, artwork shown in full at right) -->
    <section class="container-royal pt-12 sm:pt-16">
      <div
        class="group relative flex min-h-[210px] flex-col justify-center overflow-hidden rounded-2xl border border-border-gold px-7 py-8 shadow-card-glow sm:px-10 lg:min-h-[240px]"
      >
        <div
          v-lazybg="`url('${page.boost.image}')`"
          class="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.03]"
          :style="{
            backgroundColor: '#050505',
            backgroundSize: 'contain',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
          }"
        />
        <div
          class="absolute inset-0"
          style="background: linear-gradient(90deg, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0) 78%)"
        />
        <span class="shine-beam" />

        <div class="relative z-10 max-w-md">
          <h3 class="font-display text-xl font-semibold uppercase tracking-[0.1em] text-champagne">
            {{ page.boost.title }}
          </h3>
          <p class="mt-1 font-display text-4xl font-bold tracking-[0.06em] text-gold-gradient">
            {{ page.boost.amount }}
          </p>
          <p class="eyebrow mt-2">{{ page.boost.sub }}</p>
          <GoldButton variant="solid" size="md" class="mt-5">
            {{ page.boost.cta }} <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </section>

    <!-- Popular right now — royal tables while the feed loads -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="font-display text-base font-semibold uppercase tracking-[0.2em] text-gold-gradient">
          Popular Right Now
        </h3>
        <RouterLink to="/casino">
          <GoldButton variant="ghost" size="sm">
            Open Casino <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <GameCard v-for="game in royalCollection" :key="game.name" :game="game" />
      </div>
    </section>

    <FeatureBand :items="page.band" />
  </main>
</template>
