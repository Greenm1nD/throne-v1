<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useEnter } from '@/composables/useEnter'

/**
 * Live Now — a curated spotlight of marquee tables (polish flag). Adds an
 * editorial "tables worth a seat right now" anchor above the full live grid,
 * with a named dealer and a one-line hook per table. Presentational: it overlays
 * an editorial map onto the existing tables passed in by the view.
 */
type Table = { name: string; provider: string; image: string; stakes: string; players: number }
defineProps<{ tables: Table[] }>()

const editorial: Record<string, { dealer: string; line: string }> = {
  'Blackjack Live': { dealer: 'Sofia', line: 'VIP shoe · seats filling fast' },
  'Crazy Time': { dealer: 'Marcus', line: "The realm's loudest wheel" },
  'Baccarat Live': { dealer: 'Elena', line: 'Squeeze the cards, royal style' },
  'Poker Live': { dealer: 'Viktor', line: 'Fresh table · low entry' },
}

const { enter } = useEnter()
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <!-- Header -->
    <div class="mb-6 flex items-center gap-3">
      <span class="h-6 w-1 rounded-full bg-gold-gradient shadow-gold-soft" />
      <div>
        <h2 class="font-display text-xl font-semibold tracking-[0.16em] text-gold-gradient">Live Now</h2>
        <p class="eyebrow mt-1">Tables worth a seat right now</p>
      </div>
    </div>

    <!-- Curated grid — fills the row, equal-size cards -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <article
        v-for="t in tables"
        :key="t.name"
        v-glow
        data-reveal
        class="card-lux group flex flex-col overflow-hidden p-0 hover:translate-y-0"
      >
        <div class="relative aspect-[16/9] overflow-hidden">
          <img
            :src="t.image"
            :alt="t.name"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span class="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded bg-black/70 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#e89a7c] backdrop-blur">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e0552c] shadow-[0_0_8px_rgba(224,85,44,0.9)]" /> Live
          </span>
          <span class="absolute right-2.5 top-2.5 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 font-sans text-[10px] font-semibold tabular-nums text-ink-muted backdrop-blur">
            <AppIcon name="user" :size="10" class="text-gold/70" /> {{ t.players }}
          </span>
          <div class="pointer-events-none absolute inset-0" style="background: linear-gradient(180deg, rgba(5,5,5,0) 55%, rgba(5,5,5,0.8))" />
          <span class="shine-beam z-10" />
        </div>

        <div class="flex flex-1 flex-col gap-2 px-4 py-4">
          <div class="flex items-center justify-between gap-2">
            <h3 class="truncate font-display text-[15px] font-semibold tracking-[0.05em] text-champagne transition-colors group-hover:text-gold-bright">
              {{ t.name }}
            </h3>
            <span class="shrink-0 font-sans text-[10px] tabular-nums text-ink-dim">{{ t.stakes }}</span>
          </div>
          <p class="flex items-center gap-1.5 font-sans text-[11px] text-ink-dim">
            <AppIcon name="user" :size="11" class="text-gold/70" />
            Dealer <span class="font-semibold text-ink-muted">{{ editorial[t.name]?.dealer ?? 'Live host' }}</span>
          </p>
          <p class="font-sans text-[12px] leading-relaxed text-ink-muted">
            {{ editorial[t.name]?.line ?? 'Take your seat at the table.' }}
          </p>
          <GoldButton variant="outline" size="sm" block class="mt-1" @click="enter()">
            Take a Seat <AppIcon name="arrowRight" :size="13" />
          </GoldButton>
        </div>
      </article>
    </div>
  </section>
</template>
