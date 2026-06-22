<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * The High Table — discreet, status-first social proof. Not loud "BIG WIN"
 * banners: a private-club bulletin of what the realm's elite are doing now.
 * Titles shown; identities discreet by default. The point is belonging, not noise.
 */
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.08 })

const feed = [
  { who: 'A Sovereign member', action: 'entered a private Blackjack salon', time: 'just now', icon: 'spade', fresh: true },
  { who: 'Lionheart', action: 'claimed the Season crown', time: '4 min ago', icon: 'crown' },
  { who: 'A Duke', action: 'secured €120,000 at Imperial Roulette', time: '11 min ago', icon: 'trophy' },
  { who: 'Kingmaker', action: 'opened a high-limit private table', time: '18 min ago', icon: 'spade' },
  { who: 'A Baron', action: 'ascended to Crown tier', time: '26 min ago', icon: 'sparkle' },
  { who: 'An Emperor', action: 'joined the Inner Circle', time: '34 min ago', icon: 'key' },
]

const signals = [
  { value: '1,204', label: 'Private tables this week' },
  { value: '38', label: 'Members at play now' },
]
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-24">
    <SectionHeader title="The High Table" eyebrow="Live From The Realm" align="center" />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12" data-reveal>
      <!-- Intro -->
      <div class="lg:col-span-4">
        <p class="max-w-sm font-sans text-[14px] leading-7 text-ink-muted">
          A quiet account of the realm in motion. Identities are observed with discretion — titles shown, names by consent.
        </p>
        <div class="mt-7 space-y-5">
          <div v-for="s in signals" :key="s.label" class="flex items-baseline gap-3">
            <span class="font-display text-2xl font-bold tracking-[0.04em] text-gold-gradient">{{ s.value }}</span>
            <span class="font-sans text-[11px] uppercase tracking-[0.14em] text-ink-dim">{{ s.label }}</span>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div class="overflow-hidden rounded-[18px] border border-border-gold/20 bg-card/70 shadow-[inset_0_1px_0_rgba(245,215,122,0.06)] backdrop-blur lg:col-span-8">
        <div class="flex items-center justify-between border-b border-border-gold/10 px-5 py-4">
          <h3 class="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-gradient">At the Tables Now</h3>
          <span class="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-champagne/70"><span class="ht-dot h-1.5 w-1.5 rounded-full bg-gold-bright" /> Live</span>
        </div>
        <ul class="divide-y divide-border-gold/10">
          <li v-for="(e, i) in feed" :key="i"
            class="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gold/[0.03]"
            :class="e.fresh ? 'bg-gold/[0.04]' : ''">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-gold/40 bg-black/30 text-gold-bright"><AppIcon :name="e.icon" :size="15" /></span>
            <p class="min-w-0 flex-1 truncate font-sans text-[13px] text-ink">
              <span class="font-semibold text-champagne">{{ e.who }}</span>
              <span class="text-ink-muted"> {{ e.action }}</span>
            </p>
            <span class="shrink-0 font-sans text-[10px] tabular-nums tracking-wide text-ink-dim">{{ e.time }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ht-dot { animation: htPulse 2.6s ease-out infinite; }
@keyframes htPulse {
  0% { box-shadow: 0 0 0 0 rgba(245,215,122,0.45); }
  70% { box-shadow: 0 0 0 6px rgba(245,215,122,0); }
  100% { box-shadow: 0 0 0 0 rgba(245,215,122,0); }
}
@media (prefers-reduced-motion: reduce) { .ht-dot { animation: none; } }
</style>
