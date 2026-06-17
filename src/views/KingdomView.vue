<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '@/components/page/PageHero.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { kingdomPage as page } from '@/data/pages'
import { useAuthModal } from '@/composables/useAuthModal'
import { useRevealEach } from '@/composables/useReveal'

const { open } = useAuthModal()

const root = ref<HTMLElement | null>(null)
const courtEl = ref<HTMLElement | null>(null)
useRevealEach(root)

// Two-letter monogram from a handle, so leaderboard avatars need no image assets.
const initials = (name: string) => name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()

function scrollToCourt() {
  courtEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <main ref="root" class="pb-4">
    <PageHero v-bind="page.hero" @primary="open('register')" @secondary="scrollToCourt" />

    <!-- Season banner -->
    <section class="container-royal relative z-20 -mt-9">
      <div
        class="grid items-center gap-6 rounded-2xl border border-border-gold bg-card/90 px-7 py-7 shadow-card-glow backdrop-blur sm:px-9 lg:grid-cols-[1fr_auto] lg:gap-10"
        style="background-image: linear-gradient(90deg, rgba(13,13,16,0.94), rgba(8,8,10,0.82)), url('/assets/images/texture-marble.webp'); background-size: cover"
        data-reveal
      >
        <div>
          <p class="eyebrow mb-2 flex items-center gap-2">
            <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright shadow-[0_0_8px_rgba(245,215,122,0.9)]" />
            {{ page.season.chapter }} · Live Now
          </p>
          <h2 class="font-display text-3xl font-bold tracking-[0.08em] text-gold-gradient sm:text-4xl">
            {{ page.season.name }}
          </h2>
          <p class="mt-3 max-w-xl font-sans text-[13px] leading-relaxed text-ink-muted">
            {{ page.season.note }}
          </p>
        </div>

        <div class="flex shrink-0 flex-col gap-4 lg:items-end">
          <div class="flex gap-3">
            <div class="rounded-xl border border-border-gold/40 bg-black/40 px-5 py-3 text-center">
              <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Grand Prize</p>
              <p class="mt-1 font-display text-xl font-bold tabular-nums text-gold-gradient">{{ page.season.pool }}</p>
            </div>
            <div class="rounded-xl border border-border-gold/40 bg-black/40 px-5 py-3 text-center">
              <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Season Ends</p>
              <p class="mt-1 font-display text-xl font-bold tabular-nums text-champagne">{{ page.season.ends }}</p>
            </div>
          </div>
          <GoldButton variant="solid" size="md" class="w-full lg:w-auto" @click="open('register')">
            <AppIcon name="crown" :size="15" /> Enter the Season
          </GoldButton>
        </div>
      </div>
    </section>

    <!-- The Royal Court — leaderboard -->
    <section ref="courtEl" class="container-royal scroll-mt-24 pt-12 sm:pt-16">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow mb-1">This season's highest nobles</p>
          <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">The Royal Court</h3>
        </div>
        <span class="flex shrink-0 items-center gap-2 rounded-full border border-border-gold/40 px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#5fbf7a] shadow-[0_0_8px_rgba(95,191,122,0.9)]" />
          Updating live
        </span>
      </div>

      <div class="card-lux overflow-hidden p-0 hover:translate-y-0" data-reveal>
        <ol>
          <li
            v-for="n in page.court"
            :key="n.rank"
            class="flex items-center gap-3 border-b border-white/5 px-4 py-3.5 transition-colors last:border-0 sm:gap-4 sm:px-6"
            :class="n.you ? 'bg-gold/[0.06]' : 'hover:bg-white/[0.02]'"
          >
            <!-- Rank medallion -->
            <span
              class="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[13px] font-bold tabular-nums"
              :class="
                n.rank <= 3
                  ? 'bg-gold-gradient text-bg shadow-[0_0_12px_rgba(245,215,122,0.5)]'
                  : 'border border-border-gold/40 text-ink-muted'
              "
            >
              {{ n.rank }}
            </span>

            <!-- Monogram + tier crown -->
            <span class="relative shrink-0">
              <span
                class="grid h-10 w-10 place-items-center rounded-full border border-border-gold/50 font-display text-[12px] font-bold tracking-wide text-champagne"
                style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 72%)"
              >
                {{ initials(n.name) }}
              </span>
              <img :src="n.crown" alt="" class="absolute -bottom-1 -right-1 h-4 w-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
            </span>

            <!-- Name + tier -->
            <div class="min-w-0 flex-1">
              <p class="truncate font-sans text-[13px] font-semibold text-ink">
                {{ n.name }}
                <span v-if="n.you" class="ml-1 align-middle font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright">You</span>
              </p>
              <p class="font-sans text-[10px] uppercase tracking-[0.14em] text-ink-dim">{{ n.tier }}</p>
            </div>

            <!-- Movement -->
            <span
              class="hidden w-10 shrink-0 items-center justify-end gap-0.5 font-sans text-[11px] font-semibold tabular-nums sm:flex"
              :class="n.change > 0 ? 'text-[#5fbf7a]' : n.change < 0 ? 'text-[#c2603f]' : 'text-ink-dim'"
            >
              <template v-if="n.change !== 0">
                <span class="text-[9px] leading-none">{{ n.change > 0 ? '▲' : '▼' }}</span>{{ Math.abs(n.change) }}
              </template>
              <template v-else>—</template>
            </span>

            <!-- Crowns earned -->
            <span class="w-24 shrink-0 text-right font-display text-[14px] font-bold tabular-nums text-gold-gradient sm:w-28">
              {{ n.points.toLocaleString() }}
            </span>
          </li>
        </ol>
      </div>
      <p class="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">
        Crowns earned this season · top 8 of 4,210 nobles
      </p>
    </section>

    <!-- Royal Tournaments -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="mb-6">
        <p class="eyebrow mb-1">Compete for the realm</p>
        <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Royal Tournaments</h3>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="t in page.tournaments"
          :key="t.name"
          class="card-lux group relative flex min-h-[260px] flex-col justify-end overflow-hidden p-6"
          data-reveal
        >
          <div
            v-lazybg="`linear-gradient(180deg, rgba(8,8,10,0.45), rgba(5,5,5,0.92)), url('${t.image}'), url('${t.fallback}')`"
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          />
          <span class="shine-beam" />

          <!-- Status badge -->
          <span
            class="absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
            :class="t.status === 'live'
              ? 'border border-[#c2603f]/60 bg-black/50 text-[#e89a7c]'
              : 'border border-border-gold/50 bg-black/50 text-champagne'"
          >
            <span
              v-if="t.status === 'live'"
              class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#e0552c] shadow-[0_0_8px_rgba(224,85,44,0.9)]"
            />
            {{ t.status === 'live' ? 'Live' : 'Upcoming' }}
          </span>

          <div class="relative z-10">
            <p class="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80">{{ t.game }}</p>
            <h4 class="mt-1 font-display text-xl font-semibold tracking-[0.08em] text-gold-gradient">{{ t.name }}</h4>

            <div class="mt-4 flex items-end justify-between gap-3">
              <div>
                <p class="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">Prize Pool</p>
                <p class="font-display text-2xl font-bold tabular-nums text-champagne">{{ t.prize }}</p>
              </div>
              <div class="text-right">
                <p class="font-sans text-[11px] tabular-nums text-ink-muted">
                  <AppIcon name="user" :size="11" class="mr-0.5 inline align-[-1px] text-gold/70" />{{ t.players }} entered
                </p>
                <p class="mt-0.5 font-sans text-[11px] text-ink-dim">Entry · {{ t.entry }}</p>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between gap-3">
              <span class="font-sans text-[11px] font-medium text-ink-muted">{{ t.when }}</span>
              <GoldButton :variant="t.status === 'live' ? 'solid' : 'outline'" size="sm" @click="open('register')">
                {{ t.status === 'live' ? 'Enter Now' : 'Remind Me' }} <AppIcon name="arrowRight" :size="12" />
              </GoldButton>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Royal Decrees — kingdom news -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="mb-6">
        <p class="eyebrow mb-1">From the herald</p>
        <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Royal Decrees</h3>
      </div>

      <div class="card-lux divide-y divide-white/5 p-0 hover:translate-y-0" data-reveal>
        <article
          v-for="d in page.decrees"
          :key="d.title"
          class="group flex flex-col gap-1.5 px-5 py-5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:gap-5 sm:px-7"
        >
          <span class="shrink-0 self-start rounded-full border border-border-gold/50 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-champagne">
            {{ d.tag }}
          </span>
          <div class="min-w-0 flex-1">
            <h4 class="font-display text-[15px] font-semibold tracking-[0.04em] text-ink transition-colors group-hover:text-gold-bright">
              {{ d.title }}
            </h4>
            <p class="mt-0.5 font-sans text-[12px] leading-relaxed text-ink-dim">{{ d.sub }}</p>
          </div>
          <span class="shrink-0 font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">{{ d.date }}</span>
        </article>
      </div>
    </section>

    <!-- Finale CTA -->
    <section class="container-royal pt-12 sm:pt-16">
      <div
        class="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border-gold bg-card/80 px-8 py-7 sm:flex-row"
        style="background-image: linear-gradient(90deg, rgba(13,13,16,0.9), rgba(8,8,10,0.95)), url('/assets/images/texture-marble.webp'); background-size: cover"
        data-reveal
      >
        <div class="flex items-center gap-5">
          <img src="/assets/images/throne-logo-mark.webp" alt="" class="h-12 w-auto opacity-90" />
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
