<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Hall of Kings — the emotional centerpiece. A royal podium (champion centred,
 * #2/#3 flanking) over a season frame, with the chasing pack below. Reads like
 * an elite club ranking, not a casino leaderboard.
 */
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.1 })

const champion = { name: 'Kingmaker', title: 'The Champion', winnings: '€24,500,000', portrait: '/assets/images/avatars/royal-01.webp' }
const runners = [
  { rank: 2, name: 'Lionheart', title: 'The Conqueror', winnings: '€18,750,000', emblem: '/assets/images/emblems/emblem-02-lion.webp' },
  { rank: 3, name: 'Crown', title: 'The Strategist', winnings: '€12,890,000', emblem: '/assets/images/emblems/emblem-01-crown.webp' },
]
const pack = [
  { rank: 4, name: 'Duke', winnings: '€8,400,000' },
  { rank: 5, name: 'Sovereign', winnings: '€6,750,000' },
  { rank: 6, name: 'Baron', winnings: '€5,200,000' },
  { rank: 7, name: 'Monarch', winnings: '€4,100,000' },
  { rank: 8, name: 'Emperor', winnings: '€3,250,000' },
]
</script>

<template>
  <section ref="root" class="section-glow container-royal pt-16 sm:pt-24">
    <div class="relative overflow-hidden rounded-[24px] border border-border-gold/25 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]" data-reveal>
      <div v-lazybg="`linear-gradient(180deg, rgba(6,6,8,0.9), rgba(6,6,8,0.96)), url('/assets/images/hero-throne-room.webp')`"
        class="absolute inset-0 bg-cover bg-center" :style="{ backgroundColor: '#08080a' }" />
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(90% 60% at 50% 0%, rgba(245,215,122,0.12), transparent 55%)" />

      <div class="relative z-10 grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-6">
        <!-- Season info -->
        <div class="lg:col-span-3">
          <p class="eyebrow">Legends of the Realm</p>
          <h2 class="mt-1 font-display text-2xl font-semibold tracking-[0.14em] text-gold-gradient sm:text-3xl">Hall of Kings</h2>
          <p class="mt-3 max-w-xs font-sans text-[13px] leading-relaxed text-ink-muted">The throne belongs to those who rise.</p>

          <div class="mt-6 inline-flex items-center gap-2 rounded-full border border-border-gold/40 bg-black/30 px-3 py-1.5">
            <AppIcon name="crown" :size="13" class="text-gold-bright" />
            <span class="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne">Season of the Lion</span>
          </div>
          <div class="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p class="font-sans text-[9px] uppercase tracking-[0.18em] text-ink-dim">Prize Pool</p>
              <p class="font-display text-xl font-bold tracking-[0.06em] text-gold-gradient">€500,000</p>
            </div>
            <div>
              <p class="font-sans text-[9px] uppercase tracking-[0.18em] text-ink-dim">Days Remaining</p>
              <p class="font-display text-xl font-bold tracking-[0.06em] text-champagne">12</p>
            </div>
          </div>
          <GoldButton variant="outline" size="sm" class="mt-6" @click="router.push('/kingdom')">View Full Leaderboard <AppIcon name="arrowRight" :size="12" /></GoldButton>
        </div>

        <!-- Podium -->
        <div class="lg:col-span-6">
          <div class="grid grid-cols-3 items-end gap-3 sm:gap-4">
            <!-- #2 -->
            <article class="group rounded-[18px] border border-border-gold/20 bg-card/50 p-4 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold">
              <span class="mx-auto grid h-7 w-7 place-items-center rounded-full border border-border-gold/50 font-sans text-[11px] font-bold text-champagne">{{ runners[0].rank }}</span>
              <img :src="runners[0].emblem" alt="" class="mx-auto mt-3 h-14 w-14 object-contain drop-shadow-[0_0_14px_rgba(245,215,122,0.4)]" />
              <p class="mt-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-champagne">{{ runners[0].name }}</p>
              <p class="font-sans text-[9px] uppercase tracking-[0.14em] text-ink-dim">{{ runners[0].title }}</p>
              <p class="mt-2 font-sans text-[12px] font-semibold tabular-nums text-gold-bright">{{ runners[0].winnings }}</p>
            </article>

            <!-- #1 champion -->
            <article class="group relative -mt-6 rounded-[20px] border border-gold/60 bg-card/70 p-4 text-center shadow-[0_0_40px_-8px_rgba(245,215,122,0.4)] backdrop-blur">
              <ParticleLayer :count="10" />
              <AppIcon name="crown" :size="22" class="relative z-10 mx-auto text-gold-bright drop-shadow-[0_0_10px_rgba(245,215,122,0.7)]" />
              <div class="relative z-10 mx-auto mt-2 h-20 w-20">
                <span class="absolute inset-0 rounded-full" style="background: radial-gradient(circle, rgba(245,215,122,0.35), transparent 65%)" />
                <img :src="champion.portrait" alt="" class="relative h-20 w-20 rounded-full border-2 border-gold/70 object-cover" />
              </div>
              <p class="relative z-10 mt-3 font-display text-base font-bold uppercase tracking-[0.12em] text-gold-gradient">{{ champion.name }}</p>
              <p class="relative z-10 font-sans text-[9px] uppercase tracking-[0.16em] text-champagne/80">{{ champion.title }}</p>
              <p class="relative z-10 mt-2 font-display text-lg font-bold tabular-nums text-gold-bright">{{ champion.winnings }}</p>
              <p class="relative z-10 font-sans text-[8px] uppercase tracking-[0.18em] text-ink-dim">Total Winnings</p>
            </article>

            <!-- #3 -->
            <article class="group rounded-[18px] border border-border-gold/20 bg-card/50 p-4 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold">
              <span class="mx-auto grid h-7 w-7 place-items-center rounded-full border border-border-gold/50 font-sans text-[11px] font-bold text-champagne">{{ runners[1].rank }}</span>
              <img :src="runners[1].emblem" alt="" class="mx-auto mt-3 h-14 w-14 object-contain drop-shadow-[0_0_14px_rgba(245,215,122,0.4)]" />
              <p class="mt-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-champagne">{{ runners[1].name }}</p>
              <p class="font-sans text-[9px] uppercase tracking-[0.14em] text-ink-dim">{{ runners[1].title }}</p>
              <p class="mt-2 font-sans text-[12px] font-semibold tabular-nums text-gold-bright">{{ runners[1].winnings }}</p>
            </article>
          </div>
        </div>

        <!-- Chasing pack -->
        <div class="lg:col-span-3">
          <ul class="divide-y divide-border-gold/10 rounded-[16px] border border-border-gold/15 bg-black/25">
            <li v-for="p in pack" :key="p.rank" class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gold/[0.03]">
              <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-gold/40 font-sans text-[10px] font-bold tabular-nums text-champagne">{{ p.rank }}</span>
              <span class="flex-1 truncate font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">{{ p.name }}</span>
              <span class="shrink-0 font-sans text-[11px] font-semibold tabular-nums text-gold-bright">{{ p.winnings }}</span>
            </li>
          </ul>
          <button class="mt-4 w-full rounded-full border border-border-gold/30 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-champagne/80 transition-colors hover:border-border-gold hover:text-gold-bright" @click="router.push('/kingdom')">View All Ranks →</button>
        </div>
      </div>
    </div>
  </section>
</template>
