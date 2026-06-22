<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { KingChampion } from '@/data/hallOfKings'

/** One royal podium card. Rank 1 dominates: integrated portrait, crown, halo, gold frame. */
const props = defineProps<{ champion: KingChampion }>()
const isChampion = props.champion.rank === 1
const isSilver = props.champion.accent === 'silver'
</script>

<template>
  <div
    class="podium-wrap group relative"
    :class="isChampion ? 'z-10 lg:-mt-4 lg:scale-[1.06]' : 'lg:mt-10'"
    data-reveal
  >
    <!-- Champion outer glow -->
    <div
      v-if="isChampion"
      class="pointer-events-none absolute -inset-3 rounded-[26px]"
      style="background: radial-gradient(58% 50% at 50% 44%, rgba(245,215,122,0.3), transparent 70%); filter: blur(16px)"
      aria-hidden="true"
    />

    <!-- Floating crown (champion) -->
    <img
      v-if="isChampion"
      src="/assets/images/crown-crown.png"
      alt=""
      class="crown-shimmer pointer-events-none absolute -top-8 left-1/2 z-30 h-14 w-auto -translate-x-1/2"
    />

    <article
      class="relative flex h-full flex-col items-center overflow-hidden rounded-[20px] text-center backdrop-blur-md transition-all duration-300 group-hover:-translate-y-[3px] motion-reduce:transform-none"
      :class="[
        isChampion
          ? 'border-2 border-gold/60 bg-gradient-to-b from-[#171206]/55 to-black/65 px-6 pb-8 pt-6 shadow-[0_0_80px_-12px_rgba(245,215,122,0.6)]'
          : isSilver
            ? 'border border-[#cdd1db]/30 bg-black/45 px-5 pb-7 pt-6 group-hover:border-[#cdd1db]/60'
            : 'border border-[#c79a63]/35 bg-black/45 px-5 pb-7 pt-6 group-hover:border-[#d8ab72]/70',
      ]"
    >
      <!-- Subtle royal texture so cards never read flat -->
      <div class="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.07]" style="background-image: url('/assets/images/texture-marble.webp')" />
      <!-- Accent top wash by rank -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-24"
        :style="{ background: isChampion ? 'radial-gradient(80% 100% at 50% 0%, rgba(245,215,122,0.18), transparent 70%)' : isSilver ? 'radial-gradient(80% 100% at 50% 0%, rgba(205,209,219,0.12), transparent 70%)' : 'radial-gradient(80% 100% at 50% 0%, rgba(216,171,114,0.12), transparent 70%)' }"
      />

      <!-- Rank badge -->
      <span
        class="absolute left-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-lg border font-display text-sm font-bold tabular-nums"
        :class="isChampion ? 'border-gold/60 bg-black/40 text-gold-bright' : isSilver ? 'border-[#cdd1db]/45 bg-black/40 text-[#e9ebf1]' : 'border-[#d8ab72]/50 bg-black/40 text-[#ecca97]'"
      >{{ champion.rank }}</span>

      <!-- Champion: integrated portrait -->
      <template v-if="isChampion">
        <div class="relative z-10 w-full">
          <span class="champion-halo pointer-events-none absolute left-1/2 top-1/2 h-[180%] w-[150%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
          <img
            :src="champion.image"
            alt=""
            class="relative mx-auto h-60 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
            style="-webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 13%, #000 80%, transparent 100%); mask-image: linear-gradient(to bottom, transparent 0%, #000 13%, #000 80%, transparent 100%)"
          />
          <span class="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/55 bg-black/60 px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-gold-bright backdrop-blur">
            <AppIcon name="crown" :size="11" /> {{ champion.title }}
          </span>
        </div>
      </template>

      <!-- Runners: larger insignia -->
      <template v-else>
        <div class="relative z-10 mb-2 mt-8 h-32 w-32">
          <img src="/assets/images/emblems/emblem-07-laurel.webp" alt="" class="pointer-events-none absolute left-1/2 top-1/2 h-[11.5rem] w-[11.5rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-40" />
          <AppIcon name="crown" :size="20" class="absolute -top-6 left-1/2 z-10 -translate-x-1/2" :class="isSilver ? 'text-[#dfe2ea]' : 'text-[#d8ab72]'" />
          <span class="absolute inset-0 rounded-full" :style="{ background: isSilver ? 'radial-gradient(circle, rgba(205,209,219,0.24), transparent 64%)' : 'radial-gradient(circle, rgba(216,171,114,0.26), transparent 64%)' }" />
          <img
            :src="champion.image" alt=""
            class="relative h-32 w-32 rounded-full border-2 object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
            :class="isSilver ? 'border-[#cdd1db]/45' : 'border-[#d8ab72]/50'"
            style="-webkit-mask-image: radial-gradient(circle, #000 66%, transparent 76%); mask-image: radial-gradient(circle, #000 66%, transparent 76%)"
          />
        </div>
      </template>

      <!-- Name + winnings -->
      <h3
        class="relative z-10 mt-4 font-display font-bold uppercase tracking-[0.12em]"
        :class="isChampion ? 'text-2xl text-gold-gradient sm:text-3xl' : isSilver ? 'text-xl text-[#eef0f5]' : 'text-xl text-[#efd6ad]'"
      >{{ champion.name }}</h3>
      <p v-if="!isChampion" class="relative z-10 mt-0.5 font-sans text-[11px] uppercase tracking-[0.14em] text-ink-muted">{{ champion.title }}</p>

      <p
        class="relative z-10 mt-2 font-display font-bold tabular-nums"
        :class="isChampion ? 'text-[2rem] text-gold-gradient sm:text-[2.3rem]' : isSilver ? 'text-2xl text-[#eef0f5]' : 'text-2xl text-[#efd6ad]'"
      >{{ champion.winnings }}</p>
      <p class="relative z-10 mt-1 font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">Total Winnings</p>

      <!-- Champion inset frame (double-line gold) -->
      <span v-if="isChampion" class="pointer-events-none absolute inset-[7px] z-20 rounded-[13px] border border-gold/45" aria-hidden="true" />

      <span class="shine-beam" />
    </article>
  </div>
</template>

<style scoped>
.champion-halo {
  background: radial-gradient(circle, rgba(245, 215, 122, 0.42), rgba(245, 215, 122, 0.14) 38%, transparent 64%);
  animation: haloBreathe 6s ease-in-out infinite;
}
@keyframes haloBreathe {
  0%, 100% { opacity: 0.65; transform: translate(-50%, -50%) scale(0.95); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
}
.crown-shimmer { animation: crownShimmer 5s ease-in-out infinite; }
@keyframes crownShimmer {
  0%, 100% { filter: drop-shadow(0 0 12px rgba(245, 215, 122, 0.5)); }
  50% { filter: drop-shadow(0 0 24px rgba(245, 215, 122, 0.85)); }
}
@media (prefers-reduced-motion: reduce) {
  .champion-halo, .crown-shimmer { animation: none; }
}
</style>
