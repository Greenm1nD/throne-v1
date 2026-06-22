<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Kingdom Community Hub — belonging near the footer. Channels + live signals
 * ("the kingdom is alive").
 */
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.08 })

const channels = [
  { icon: 'discord', label: 'Discord', sub: 'Join the kingdom', href: '#' },
  { icon: 'telegram', label: 'Telegram', sub: 'Latest updates', href: '#' },
  { icon: 'chart', label: 'Leaderboards', sub: 'Top of the realm', href: '/kingdom' },
  { icon: 'calendar', label: 'Season Events', sub: 'Compete & earn', href: '/kingdom' },
  { icon: 'trophy', label: 'Tournaments', sub: 'Glory & rewards', href: '/kingdom' },
]
const signals = [
  { value: '4,820', label: 'Members Online' },
  { value: '7', label: 'Active Events' },
  { value: 'Lion', label: 'Current Season' },
]
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-24">
    <SectionHeader title="Kingdom Community Hub" eyebrow="The Kingdom Is Alive" align="center" />

    <div class="overflow-hidden rounded-[20px] border border-border-gold/20 bg-card/60 p-6 sm:p-8" data-reveal>
      <!-- Live signals -->
      <div class="mb-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-b border-border-gold/10 pb-7">
        <div v-for="s in signals" :key="s.label" class="flex items-center gap-2.5">
          <span class="ch-dot h-1.5 w-1.5 rounded-full bg-gold-bright" />
          <span class="font-display text-lg font-bold tracking-[0.06em] text-gold-gradient">{{ s.value }}</span>
          <span class="font-sans text-[10px] uppercase tracking-[0.14em] text-ink-dim">{{ s.label }}</span>
        </div>
      </div>

      <!-- Channels -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <a v-for="c in channels" :key="c.label" :href="c.href"
          class="group flex flex-col items-center gap-2.5 rounded-[16px] border border-border-gold/15 bg-black/25 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold/[0.03]">
          <span class="grid h-12 w-12 place-items-center rounded-full border border-border-gold/40 text-gold-bright transition-all duration-300 group-hover:border-gold group-hover:shadow-gold-soft">
            <AppIcon :name="c.icon" :size="20" />
          </span>
          <span class="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-champagne transition-colors group-hover:text-gold-bright">{{ c.label }}</span>
          <span class="font-sans text-[10px] tracking-[0.06em] text-ink-dim">{{ c.sub }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ch-dot { animation: chPulse 2.6s ease-out infinite; }
@keyframes chPulse {
  0% { box-shadow: 0 0 0 0 rgba(245,215,122,0.45); }
  70% { box-shadow: 0 0 0 6px rgba(245,215,122,0); }
  100% { box-shadow: 0 0 0 0 rgba(245,215,122,0); }
}
@media (prefers-reduced-motion: reduce) { .ch-dot { animation: none; } }
</style>
