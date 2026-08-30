<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '@/components/page/PageHero.vue'
import FeatureBand from '@/components/page/FeatureBand.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { rewardsPage as page } from '@/data/pages'
import ProgressionWidget from '@/components/progression/ProgressionWidget.vue'
import { useRevealEach } from '@/composables/useReveal'
import { useAuth } from '@/composables/useAuth'
import { useEnter } from '@/composables/useEnter'
import { useRouter } from 'vue-router'

const { isLoggedIn } = useAuth()
const { enter } = useEnter()
const router = useRouter()

const root = ref<HTMLElement | null>(null)
useRevealEach(root)
</script>

<template>
  <main ref="root" class="pb-4">
    <PageHero v-bind="page.hero" />

    <!-- Loyalty tiers ladder -->
    <section class="container-royal relative z-20 -mt-9">
      <div
        class="grid gap-8 rounded-2xl border border-border-gold/10 bg-card/90 px-6 py-7 shadow-card-glow backdrop-blur sm:px-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10"
      >
        <div class="shrink-0 lg:max-w-[160px]">
          <h3 class="font-display text-sm font-semibold uppercase leading-relaxed tracking-[0.22em] text-champagne">
            Loyalty<br />Tiers
          </h3>
          <p class="mt-2 font-sans text-[11px] leading-snug text-ink-dim">{{ page.tiers.sub }}</p>
        </div>

        <div class="min-w-0">
          <!-- Guests see the ladder with no personal position. -->
          <ProgressionWidget placement="Bar" :anonymous="!isLoggedIn" />
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
            The Privilege Exchange
          </h3>
          <button class="flex shrink-0 items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-gold/90 transition-colors hover:text-gold-bright">
            View All Privileges <AppIcon name="arrowRight" :size="13" />
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          <article
            v-for="r in page.redeem"
            :key="r.title"
            class="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border-gold/20 bg-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-border-gold"
          >
            <div class="relative aspect-square overflow-hidden">
              <div
                v-lazybg="`linear-gradient(180deg, rgba(8,8,10,0.15), rgba(5,5,5,0.65)), url('${r.image}'), url('${r.fallback}')`"
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                :style="{ backgroundColor: '#0d0d10' }"
              />
            </div>
            <div class="flex flex-1 flex-col px-3 pb-3 pt-3 text-center">
              <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-champagne transition-colors group-hover:text-gold-bright">
                {{ r.title }}
              </h4>
              <p class="mt-0.5 font-sans text-[10px] text-ink-dim">{{ r.sub }}</p>
            </div>
            <div class="mt-auto flex items-center justify-between gap-2 border-t border-border-gold/10 bg-white/[0.02] px-3 py-1.5">
              <span class="whitespace-nowrap font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-gold/90">
                {{ r.tier }}
              </span>
              <span class="whitespace-nowrap font-sans text-[9px] font-semibold tabular-nums tracking-[0.08em] text-champagne">
                {{ r.points }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <!-- Member: rank, Standing Order and Weekly Purse — one source, one meter. -->
      <div v-if="isLoggedIn" class="card-lux flex flex-col gap-4 p-7 hover:translate-y-0 sm:p-8" data-reveal>
        <ProgressionWidget placement="Hero" />
        <GoldButton variant="outline" size="md" block class="mt-auto" @click="router.push('/account/rewards')">
          Go to Rewards Wallet <AppIcon name="arrowRight" :size="14" />
        </GoldButton>
      </div>

      <!-- Guest: join-to-earn teaser (no personal data) -->
      <div v-else class="card-lux flex flex-col items-center justify-center gap-4 p-7 text-center hover:translate-y-0 sm:p-8" data-reveal>
        <img src="/assets/images/crown-duke.png" alt="" class="h-14 w-auto drop-shadow-[0_0_16px_rgba(245,215,122,0.55)]" loading="lazy" decoding="async" />
        <div>
          <p class="eyebrow">Your Treasury Awaits</p>
          <p class="mt-2 max-w-xs font-sans text-[13px] leading-relaxed text-ink-muted">
            Every wager earns points toward private jets, five-star escapes and bespoke gifts.
            Join to open your rewards wallet and start collecting.
          </p>
        </div>
        <GoldButton variant="solid" size="md" block class="mt-auto" @click="enter()">
          Join the Kingdom <AppIcon name="arrowRight" :size="14" />
        </GoldButton>
      </div>
    </section>

    <FeatureBand :items="page.band" />
  </main>
</template>
