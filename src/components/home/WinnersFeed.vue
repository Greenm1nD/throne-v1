<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Recently Won — compact live win feed. Premium financial-dashboard feel:
 * obsidian surface, champagne accents, a single quiet live pulse. No flashing.
 */
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.06 })

const winners = [
  { name: 'Kingmaker', amount: '€2,450', time: '2 min ago' },
  { name: 'Crown', amount: '€12,100', time: '8 min ago' },
  { name: 'Lionheart', amount: '€5,600', time: '15 min ago' },
  { name: 'Duke', amount: '€3,200', time: '23 min ago' },
  { name: 'Sovereign', amount: '€8,750', time: '31 min ago' },
]
</script>

<template>
  <div ref="root" data-reveal
    class="flex h-full flex-col overflow-hidden rounded-[20px] border border-border-gold/20 bg-card/70 shadow-[inset_0_1px_0_rgba(245,215,122,0.06)] backdrop-blur">
    <div class="flex items-center justify-between border-b border-border-gold/10 px-5 py-4">
      <h2 class="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-gradient">Recently Won</h2>
      <span class="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-champagne/70">
        <span class="live-dot h-1.5 w-1.5 rounded-full bg-gold-bright" /> Live
      </span>
    </div>

    <ul class="flex-1 divide-y divide-border-gold/10">
      <li v-for="w in winners" :key="w.name"
        class="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gold/[0.03]">
        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-gold/40 bg-black/30 text-gold-bright">
          <AppIcon name="crown" :size="15" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-champagne">{{ w.name }}</p>
          <p class="font-sans text-[11px] text-ink-dim">won <span class="font-semibold text-gold-bright">{{ w.amount }}</span></p>
        </div>
        <span class="shrink-0 font-sans text-[10px] tabular-nums tracking-wide text-ink-dim">{{ w.time }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.live-dot {
  box-shadow: 0 0 0 0 rgba(245, 215, 122, 0.5);
  animation: livePulse 2.6s ease-out infinite;
}
@keyframes livePulse {
  0% { box-shadow: 0 0 0 0 rgba(245, 215, 122, 0.45); }
  70% { box-shadow: 0 0 0 6px rgba(245, 215, 122, 0); }
  100% { box-shadow: 0 0 0 0 rgba(245, 215, 122, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .live-dot { animation: none; }
}
</style>
