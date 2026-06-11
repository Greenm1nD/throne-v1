<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '@/components/page/PageHero.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { kingdomPage as page } from '@/data/pages'
import { useAuthModal } from '@/composables/useAuthModal'
import { useRevealEach } from '@/composables/useReveal'

const { open } = useAuthModal()

const root = ref<HTMLElement | null>(null)
useRevealEach(root)

const xpPct = computed(() => Math.round((page.status.xp / page.status.next) * 100))
const activeIndex = page.ranks.findIndex((r) => r.active)
const N = page.ranks.length
// Rank centres sit at (i+0.5)/N of the rail width (equal grid cells).
const railStart = 100 / (N * 2)
const fillWidth = (activeIndex / N) * 100

const statusCrown = computed(
  () => page.ranks.find((r) => r.name === page.status.level)?.crown ?? page.ranks[0].crown,
)
</script>

<template>
  <main ref="root" class="pb-4">
    <PageHero v-bind="page.hero" @primary="open('register')" />

    <!-- Rise through the ranks -->
    <section class="container-royal relative z-20 -mt-9">
      <div
        class="grid gap-8 rounded-2xl border border-white/5 bg-card/90 px-6 py-7 shadow-card-glow backdrop-blur lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 sm:px-8"
      >
        <h3 class="shrink-0 font-display text-sm font-semibold uppercase leading-relaxed tracking-[0.22em] text-champagne">
          Rise<br />Through<br />The Ranks
        </h3>

        <div class="relative overflow-x-auto py-2 [scrollbar-width:none] lg:overflow-visible">
          <!-- Track + fill run through the crown centres (36px = half of h-[72px]) -->
          <div
            class="pointer-events-none absolute top-[38px] hidden h-px bg-white/10 lg:block"
            :style="{ left: `${railStart}%`, right: `${railStart}%` }"
          />
          <div
            class="pointer-events-none absolute top-[38px] hidden h-px bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)] lg:block"
            :style="{ left: `${railStart}%`, width: `${fillWidth}%` }"
          />
          <ol class="relative grid auto-cols-fr grid-flow-col justify-items-center gap-4">
            <li v-for="(r, i) in page.ranks" :key="r.name" class="flex flex-col items-center gap-2">
              <div class="relative z-10 flex h-[72px] items-center">
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
              <span class="whitespace-nowrap font-sans text-[10px] tabular-nums text-ink-dim">{{ r.range }}</span>
            </li>
          </ol>
        </div>

        <div class="flex shrink-0 flex-col items-center gap-3 text-center lg:max-w-[210px]">
          <img
            src="/assets/images/crown-duke.png"
            alt=""
            class="h-16 w-auto drop-shadow-[0_4px_16px_rgba(212,175,55,0.5)]"
          />
          <p class="font-sans text-[11px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-champagne">
            The higher you rise,<br />the greater your rewards.
          </p>
          <GoldButton variant="outline" size="sm">View All Tiers <AppIcon name="arrowRight" :size="12" /></GoldButton>
        </div>
      </div>
    </section>

    <!-- Benefits + status -->
    <section class="container-royal grid gap-5 pt-12 sm:pt-16 lg:grid-cols-[2.2fr_1fr]">
      <div class="card-lux p-7 hover:translate-y-0 sm:p-8" data-reveal>
        <h3 class="font-display text-base font-semibold uppercase tracking-[0.2em] text-gold-gradient">
          Exclusive Kingdom Benefits
        </h3>
        <div class="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 xl:grid-cols-7">
          <div v-for="b in page.benefits" :key="b.title" class="group flex flex-col items-center gap-2.5 text-center">
            <span
              class="grid h-12 w-12 place-items-center rounded-full border border-border-gold text-champagne transition-all duration-300 group-hover:text-gold-bright group-hover:shadow-gold-soft"
              style="background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)"
            >
              <AppIcon :name="b.icon!" :size="19" />
            </span>
            <p class="font-sans text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-ink-muted">
              {{ b.title }}
            </p>
            <p class="font-sans text-[10px] leading-snug text-ink-dim">{{ b.sub }}</p>
          </div>
        </div>
      </div>

      <!-- Your kingdom status -->
      <div class="card-lux flex flex-col items-center justify-center gap-3 p-7 text-center hover:translate-y-0 sm:p-8" data-reveal>
        <img
          :src="statusCrown"
          alt=""
          class="h-16 w-auto drop-shadow-[0_0_18px_rgba(245,215,122,0.6)]"
        />
        <p class="eyebrow mt-1">Your Kingdom Status</p>
        <p class="font-display text-3xl font-bold tracking-[0.14em] text-gold-gradient">
          {{ page.status.level }}
        </p>
        <div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-gold-gradient shadow-[0_0_12px_rgba(245,215,122,0.5)] transition-[width] duration-1000"
            :style="{ width: `${xpPct}%` }"
          />
        </div>
        <p class="font-sans text-[11px] tabular-nums text-ink-muted">
          {{ page.status.xp.toLocaleString() }} / {{ page.status.next.toLocaleString() }} XP
        </p>
        <p class="font-sans text-[10px] uppercase tracking-[0.1em] text-ink-dim">{{ page.status.toNext }}</p>
        <GoldButton variant="outline" size="sm" class="mt-1">
          View Progress <AppIcon name="arrowRight" :size="12" />
        </GoldButton>
      </div>
    </section>

    <!-- Vault / Tournaments / News -->
    <section class="container-royal grid gap-5 pt-12 sm:grid-cols-2 sm:pt-16 xl:grid-cols-3">
      <article
        v-for="c in page.cards"
        :key="c.title"
        class="card-lux group relative flex min-h-[240px] flex-col justify-end overflow-hidden p-7"
        data-reveal
      >
        <div
          v-lazybg="`linear-gradient(180deg, rgba(8,8,10,0.55), rgba(5,5,5,0.9)), url('${c.image}'), url('${c.fallback}')`"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        />
        <span class="shine-beam" />
        <div class="relative z-10">
          <h3 class="font-display text-xl font-semibold tracking-[0.1em] text-gold-gradient">
            {{ c.title }}
          </h3>
          <p class="mt-2 max-w-xs font-sans text-[12px] leading-relaxed text-ink-muted">{{ c.sub }}</p>
          <GoldButton variant="outline" size="sm" class="mt-4">
            {{ c.cta }} <AppIcon name="arrowRight" :size="12" />
          </GoldButton>
        </div>
      </article>
    </section>

    <!-- Finale CTA -->
    <section class="container-royal pt-12 sm:pt-16">
      <div
        class="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border-gold bg-card/80 px-8 py-7 sm:flex-row"
        style="background-image: linear-gradient(90deg, rgba(13,13,16,0.9), rgba(8,8,10,0.95)), url('/assets/images/texture-marble.webp'); background-size: cover"
        data-reveal
      >
        <div class="flex items-center gap-5">
          <img src="/assets/images/throne-logo-mark.png" alt="" class="h-12 w-auto opacity-90" />
          <div>
            <p class="font-display text-lg font-bold uppercase tracking-[0.12em] text-gold-gradient sm:text-xl">
              {{ page.finale.title }}
            </p>
            <p class="mt-1 font-sans text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              {{ page.finale.sub }}
            </p>
          </div>
        </div>
        <GoldButton variant="solid" size="lg" @click="open('register')">
          <AppIcon name="crown" :size="16" /> {{ page.finale.cta }}
        </GoldButton>
      </div>
    </section>
  </main>
</template>
