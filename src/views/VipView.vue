<script setup lang="ts">
import PageHero from '@/components/page/PageHero.vue'
import CategoryStrip from '@/components/page/CategoryStrip.vue'
import FeatureBand from '@/components/page/FeatureBand.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { vipPage as page } from '@/data/pages'
import { useAuthModal } from '@/composables/useAuthModal'

const { open } = useAuthModal()
</script>

<template>
  <main class="pb-4">
    <PageHero v-bind="page.hero" @primary="open('register')" />

    <CategoryStrip :items="page.benefits" />

    <!-- VIP tiers + lounge -->
    <section class="container-royal grid gap-5 pt-14 sm:pt-20 lg:grid-cols-[2.4fr_1fr]">
      <div>
        <!-- Title with flanking flourishes -->
        <div class="mb-8 flex items-center justify-center gap-4">
          <AppIcon name="arrowRight" :size="14" class="text-gold/60" />
          <h2 class="font-display text-2xl font-semibold tracking-[0.2em] text-gold-gradient">
            VIP Tiers
          </h2>
          <AppIcon name="arrowLeft" :size="14" class="text-gold/60" />
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          <article
            v-for="t in page.tiers"
            :key="t.name"
            class="relative flex flex-col items-center rounded-2xl border p-5 text-center transition-all duration-300"
            :class="
              t.featured
                ? 'animate-softGlow border-gold/70 bg-gold/[0.05] xl:-translate-y-2'
                : 'border-white/8 bg-card/80 hover:border-border-gold'
            "
          >
            <div class="flex h-16 items-end justify-center">
              <img :src="t.crown" :alt="`${t.name} crown`" class="h-14 w-auto object-contain" :class="!t.featured && 'opacity-80'" />
            </div>
            <h3
              class="mt-3 font-display text-lg font-semibold tracking-[0.14em]"
              :class="t.featured ? 'text-gold-bright' : 'text-champagne'"
            >
              {{ t.name }}
            </h3>
            <p class="mt-1 font-sans text-[10px] tabular-nums tracking-[0.1em] text-ink-dim">
              {{ t.range }}
            </p>
            <ul class="mt-4 space-y-2">
              <li
                v-for="p in t.perks"
                :key="p"
                class="flex items-start gap-1.5 text-left font-sans text-[11px] leading-snug text-ink-muted"
              >
                <AppIcon name="check" :size="11" class="mt-0.5 shrink-0 text-gold/80" />
                {{ p }}
              </li>
            </ul>
            <span class="mt-5 h-1.5 w-1.5 rotate-45" :class="t.featured ? 'bg-gold-bright' : 'bg-gold/50'" />
          </article>
        </div>
      </div>

      <!-- VIP lounge card -->
      <div class="card-lux group relative overflow-hidden p-7 hover:translate-y-0 sm:p-8 lg:mt-[68px]">
        <div
          v-lazybg="`linear-gradient(180deg, rgba(8,8,10,0.75), rgba(8,8,10,0.35) 45%, rgba(8,8,10,0.85)), url('${page.lounge.image}'), url('${page.lounge.fallback}')`"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        />
        <div class="relative z-10 flex h-full min-h-[300px] flex-col items-center justify-between gap-4 text-center">
          <div>
            <img src="/assets/images/crown-duke.png" alt="" class="mx-auto h-9 w-auto drop-shadow-[0_3px_12px_rgba(212,175,55,0.45)]" />
            <h3 class="mt-2 font-display text-2xl font-semibold tracking-[0.16em] text-gold-gradient">
              VIP Lounge
            </h3>
            <p class="mt-2 max-w-[230px] font-sans text-[12px] leading-relaxed text-ink-muted">
              {{ page.lounge.sub }}
            </p>
          </div>
          <GoldButton variant="outline" size="md">
            {{ page.lounge.cta }} <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </section>

    <FeatureBand :items="page.band" />
  </main>
</template>
