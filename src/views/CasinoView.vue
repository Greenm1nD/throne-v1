<script setup lang="ts">
import { ref } from 'vue'
import { useRevealEach } from '@/composables/useReveal'
import PageHero from '@/components/page/PageHero.vue'
import GamesLobby from '@/components/page/GamesLobby.vue'
import RoyalPicks from '@/components/casino/RoyalPicks.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { casinoPage as page } from '@/data/pages'
import { lobbyGames, lobbyProviders } from '@/data/casinoGames'
import { RANKS } from '@/data/progression'
import { useEnter } from '@/composables/useEnter'
import { polishEnabled } from '@/composables/usePolish'

const { enter } = useEnter()

// Casino highlights — same strip as always, every figure real. Counts come
// from the catalogue, RTP is its average, the rakeback range is the published
// ladder. No players-online, no biggest-win: nothing here is fabricated.
const avgRtp = (
  lobbyGames.reduce((s, g) => s + parseFloat(g.rtp ?? '0'), 0) / lobbyGames.length
).toFixed(1)
const rateRange = `${RANKS[0].standingOrderBp / 100}–${RANKS[RANKS.length - 1].standingOrderBp / 100}%`
const highlights = [
  { icon: 'chip', value: `${lobbyGames.length}`, label: 'Games' },
  { icon: 'shield', value: `${lobbyProviders.length}`, label: 'Providers' },
  { icon: 'sparkle', value: `${avgRtp}%`, label: 'Average RTP' },
  { icon: 'crown', value: rateRange, label: 'Rakeback · Published' },
]

const root = ref<HTMLElement | null>(null)
useRevealEach(root)
</script>

<template>
  <main ref="root" class="pb-4">
    <PageHero v-bind="page.hero" :cta="page.hero.cta" />

    <!-- Casino highlights (the game-type categories live in the main nav) -->
    <section class="container-royal pt-5">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div v-for="h in highlights" :key="h.label"
          class="flex items-center gap-3 rounded-2xl border border-border-gold/15 bg-card/70 px-5 py-4">
          <AppIcon :name="h.icon" :size="22" class="shrink-0 text-gold/80" />
          <span class="min-w-0">
            <span class="block font-sans text-lg font-bold tabular-nums text-gold-gradient">{{ h.value }}</span>
            <span class="block truncate font-sans text-[11px] uppercase tracking-[0.1em] text-ink-dim">{{ h.label }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Royal Picks — curated editorial row (polish flag) -->
    <RoyalPicks v-if="polishEnabled" />

    <GamesLobby data-reveal />

    <!-- Progressive jackpot banner -->
    <section class="container-royal pt-12 sm:pt-16">
      <div
        class="group relative flex min-h-[210px] flex-col justify-center gap-5 overflow-hidden rounded-2xl border border-border-gold px-7 py-8 shadow-card-glow sm:flex-row sm:items-center sm:gap-10 sm:px-10 lg:min-h-[260px]"
        data-reveal
      >
        <!-- Artwork shown in FULL (contain, anchored right) — the crown is never cropped -->
        <div
          v-lazybg="`url('${page.jackpot.image}')`"
          class="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.03]"
          :style="{
            backgroundColor: '#050505',
            backgroundSize: 'contain',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
          }"
        />
        <!-- Left scrim for the copy -->
        <div
          class="absolute inset-0"
          style="background: linear-gradient(90deg, rgba(5,5,5,0.95) 28%, rgba(5,5,5,0.55) 52%, rgba(5,5,5,0) 75%)"
        />
        <span class="shine-beam" />

        <h2
          class="relative z-10 max-w-[200px] font-display text-xl font-semibold uppercase leading-snug tracking-[0.18em] text-champagne"
        >
          Progressive<br />Jackpot
        </h2>
        <span class="relative z-10 hidden h-14 w-px bg-white/10 sm:block" />
        <div class="relative z-10 flex flex-1 flex-col gap-4">
          <p class="font-sans text-4xl font-bold tabular-nums tracking-[0.02em] text-champagne sm:text-5xl">
            {{ page.jackpot.amount }}
          </p>
          <p class="font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">
            Demo figure — the live pool connects with the platform
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
        class="grid gap-8 rounded-2xl border border-border-gold/10 bg-card/70 px-8 py-8 lg:grid-cols-[auto_1fr_auto] lg:items-center"
        data-reveal
        style="background-image: linear-gradient(180deg, rgba(13,13,16,0.85), rgba(8,8,10,0.92)), url('/assets/images/texture-marble.webp'); background-size: cover"
      >
        <div>
          <h3 class="font-display text-lg font-semibold tracking-[0.16em] text-gold-gradient">
            VIP Experience
          </h3>
          <p class="eyebrow mt-2">Unlock royal privileges</p>
        </div>

        <div class="vipband-items flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
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
          <GoldButton variant="solid" size="md" @click="enter('/vip')">
            {{ page.vipBand.cta }} <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </div>
    </section>
  </main>
</template>
