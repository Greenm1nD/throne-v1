<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { useEnter } from '@/composables/useEnter'

/**
 * Tonight's Marquee — curated fixtures shown alongside the Arena (polish flag).
 * Gives the sports page real, scannable content (leagues, kick-offs, 1·X·2 odds)
 * while the third-party provider feed is empty, instead of only a loading shell.
 * Presentational: odds tap routes through the standard enter() join flow.
 */
type Match = {
  league: string
  kickoff: string
  live: boolean
  home: string
  away: string
  odds: { h: string; d: string; a: string }
}
defineProps<{ matches: Match[] }>()
const { enter } = useEnter()
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <div class="mb-6 flex items-center gap-3">
      <span class="h-6 w-1 rounded-full bg-gold-gradient shadow-gold-soft" />
      <div>
        <h2 class="font-display text-xl font-semibold tracking-[0.16em] text-gold-gradient">
          Tonight's Marquee
        </h2>
        <p class="eyebrow mt-1">Hand-picked fixtures &amp; odds</p>
      </div>
    </div>

    <div class="card-lux divide-y divide-border-gold/12 p-0 hover:translate-y-0" data-reveal>
      <article
        v-for="m in matches"
        :key="m.home + m.away"
        class="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-7"
      >
        <!-- League + kickoff -->
        <div class="flex w-full items-center justify-between gap-3 sm:w-44 sm:flex-col sm:items-start sm:gap-1">
          <p class="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-gold/80">{{ m.league }}</p>
          <p class="flex items-center gap-1.5 font-sans text-[11px] tabular-nums text-ink-dim">
            <span
              v-if="m.live"
              class="flex items-center gap-1 rounded-full border border-[#c2603f]/60 bg-black/40 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-[#e89a7c]"
            >
              <span class="h-1 w-1 animate-pulse rounded-full bg-[#e0552c]" /> Live
            </span>
            {{ m.kickoff }}
          </p>
        </div>

        <!-- Teams -->
        <div class="min-w-0 flex-1">
          <p class="truncate font-display text-[15px] font-semibold tracking-[0.03em] text-ink">
            {{ m.home }} <span class="px-1.5 text-ink-dim">vs</span> {{ m.away }}
          </p>
        </div>

        <!-- 1 · X · 2 odds -->
        <div class="grid w-full grid-cols-3 gap-2 sm:w-56">
          <button
            v-for="o in [{ k: '1', v: m.odds.h }, { k: 'X', v: m.odds.d }, { k: '2', v: m.odds.a }]"
            :key="o.k"
            class="flex flex-col items-center gap-0.5 rounded-lg border border-border-gold/40 bg-black/30 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/[0.06]"
            @click="enter()"
          >
            <span class="font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-ink-dim">{{ o.k }}</span>
            <span class="font-display text-[14px] font-bold tabular-nums text-gold-bright">{{ o.v }}</span>
          </button>
        </div>
      </article>
    </div>

    <p class="mt-3 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">
      <AppIcon name="sparkle" :size="12" class="text-gold/60" />
      Sample odds — live markets settle inside the provider feed.
    </p>
  </section>
</template>
