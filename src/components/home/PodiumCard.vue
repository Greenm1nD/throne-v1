<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { KingChampion } from '@/data/hallOfKings'

/** One royal podium card. Rank 1 dominates: portrait, crown, halo, gold frame. */
const props = defineProps<{ champion: KingChampion }>()
const isChampion = props.champion.rank === 1
</script>

<template>
  <div
    class="podium-wrap group relative"
    :class="isChampion ? 'z-10 lg:-mt-6' : 'lg:mt-4'"
    data-reveal
  >
    <!-- Floating crown (champion) -->
    <img
      v-if="isChampion"
      src="/assets/images/crown-crown.png"
      alt=""
      class="crown-shimmer pointer-events-none absolute -top-7 left-1/2 z-30 h-12 w-auto -translate-x-1/2 drop-shadow-[0_0_16px_rgba(245,215,122,0.6)]"
    />

    <article
      class="relative flex h-full flex-col items-center overflow-hidden rounded-[18px] bg-card/40 px-5 pb-6 pt-5 text-center backdrop-blur-md transition-all duration-300 group-hover:-translate-y-[3px] motion-reduce:transform-none"
      :class="[
        isChampion
          ? 'border border-gold/55 shadow-[0_0_60px_-12px_rgba(245,215,122,0.5)] lg:pb-8 lg:pt-7'
          : champion.accent === 'silver'
            ? 'border border-[#c9ccd6]/25 group-hover:border-[#c9ccd6]/55'
            : 'border border-[#b8895a]/30 group-hover:border-[#caa06a]/65',
      ]"
    >
      <!-- Rank badge -->
      <span
        class="absolute left-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-lg border font-display text-sm font-bold tabular-nums"
        :class="isChampion ? 'border-gold/60 text-gold-bright' : champion.accent === 'silver' ? 'border-[#c9ccd6]/40 text-[#e7e9f0]' : 'border-[#caa06a]/45 text-[#e3c08f]'"
      >{{ champion.rank }}</span>

      <!-- Champion: portrait -->
      <template v-if="isChampion">
        <div class="relative mt-1 w-full">
          <span class="champion-halo pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
          <div class="relative mx-auto h-48 w-full overflow-hidden rounded-2xl border border-gold/30">
            <img :src="champion.image" alt="" class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <span class="absolute bottom-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/50 bg-black/55 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-gold-bright backdrop-blur">
              <AppIcon name="crown" :size="10" /> {{ champion.title }}
            </span>
          </div>
        </div>
      </template>

      <!-- Runners: insignia -->
      <template v-else>
        <div class="relative mb-1 mt-7 h-28 w-28">
          <AppIcon name="crown" :size="16" class="absolute -top-5 left-1/2 -translate-x-1/2" :class="champion.accent === 'silver' ? 'text-[#d6d9e2]' : 'text-[#caa06a]'" />
          <span class="absolute inset-0 rounded-full" :style="{ background: champion.accent === 'silver' ? 'radial-gradient(circle, rgba(201,204,214,0.22), transparent 64%)' : 'radial-gradient(circle, rgba(202,160,106,0.24), transparent 64%)' }" />
          <img
            :src="champion.image" alt=""
            class="relative h-28 w-28 rounded-full border object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
            :class="champion.accent === 'silver' ? 'border-[#c9ccd6]/40' : 'border-[#caa06a]/45'"
            style="-webkit-mask-image: radial-gradient(circle, #000 66%, transparent 76%); mask-image: radial-gradient(circle, #000 66%, transparent 76%)"
          />
        </div>
      </template>

      <!-- Name + winnings -->
      <h3
        class="mt-4 font-display text-lg font-bold uppercase tracking-[0.14em]"
        :class="isChampion ? 'text-gold-gradient sm:text-xl' : champion.accent === 'silver' ? 'text-[#eceef4]' : 'text-[#ecd2a8]'"
      >{{ champion.name }}</h3>
      <p v-if="!isChampion" class="font-sans text-[9px] uppercase tracking-[0.18em] text-ink-dim">{{ champion.title }}</p>

      <p
        class="mt-2 font-display font-bold tabular-nums"
        :class="isChampion ? 'text-2xl text-gold-gradient sm:text-[1.7rem]' : champion.accent === 'silver' ? 'text-xl text-[#e7e9f0]' : 'text-xl text-[#e3c08f]'"
      >{{ champion.winnings }}</p>
      <p class="mt-1 font-sans text-[9px] uppercase tracking-[0.22em] text-ink-dim">Total Winnings</p>

      <span class="shine-beam" />
    </article>
  </div>
</template>

<style scoped>
.champion-halo {
  background: radial-gradient(circle, rgba(245, 215, 122, 0.28), rgba(245, 215, 122, 0.08) 42%, transparent 66%);
  animation: haloBreathe 6s ease-in-out infinite;
}
@keyframes haloBreathe {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.96); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.04); }
}
.crown-shimmer { animation: crownShimmer 5s ease-in-out infinite; }
@keyframes crownShimmer {
  0%, 100% { filter: drop-shadow(0 0 12px rgba(245, 215, 122, 0.45)); }
  50% { filter: drop-shadow(0 0 22px rgba(245, 215, 122, 0.8)); }
}
@media (prefers-reduced-motion: reduce) {
  .champion-halo, .crown-shimmer { animation: none; }
}
</style>
