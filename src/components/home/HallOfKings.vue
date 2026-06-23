<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import PodiumCard from './PodiumCard.vue'
import CountUp from '@/components/ui/CountUp.vue'
import { kingsSeason, kingsChampions, kingsStats } from '@/data/hallOfKings'
import { useReveal } from '@/composables/useReveal'
import { useViewport } from '@/composables/useMobilePolish'

const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.1 })

// Mobile gets far fewer particles and no parallax (perf + battery).
const { lite } = useViewport()

// Very slow cinematic parallax on the royal-hall backdrop (desktop, GPU-only).
const bgEl = ref<HTMLElement | null>(null)
let raf = 0
function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const el = bgEl.value
    const sec = root.value
    if (!el || !sec) return
    const r = sec.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (r.bottom < -80 || r.top > vh + 80) return
    const prog = (r.top + r.height / 2 - vh / 2) / vh
    const y = Math.max(-46, Math.min(46, -prog * 92))
    el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
  })
}
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = window.matchMedia('(min-width: 1024px)').matches
  if (reduce || !desktop) return
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section ref="root" class="section-glow container-royal pt-10 sm:pt-14">
    <div class="relative overflow-hidden rounded-[24px] border border-border-gold/20 px-5 py-8 shadow-[0_40px_110px_-45px_rgba(0,0,0,0.95)] sm:px-8 sm:py-10">
      <!-- Cinematic royal-hall backdrop (slow parallax) -->
      <div ref="bgEl" class="absolute inset-0 will-change-transform">
        <div
          v-lazybg="`linear-gradient(180deg, rgba(7,7,9,0.55), rgba(7,7,9,0.74)), url('/assets/images/king-hall-bg.webp')`"
          class="hk-zoom absolute inset-0 bg-cover bg-center"
          :style="{ backgroundColor: '#08080a' }"
        />
      </div>
      <!-- Candlelit top glow (gentle flicker) -->
      <div class="hk-flicker pointer-events-none absolute inset-0" style="background: radial-gradient(70% 50% at 50% 0%, rgba(245,215,122,0.12), transparent 55%)" aria-hidden="true" />
      <!-- Warm spotlight behind the champion (desktop) -->
      <div class="pointer-events-none absolute left-1/2 top-[22%] hidden h-[60%] w-[46%] -translate-x-1/2 lg:block" style="background: radial-gradient(circle, rgba(245,215,122,0.17), transparent 66%); filter: blur(28px)" aria-hidden="true" />
      <!-- Volumetric light beams (desktop) -->
      <div class="hk-beam hk-beam-1 pointer-events-none absolute hidden sm:block" aria-hidden="true" />
      <div class="hk-beam hk-beam-2 pointer-events-none absolute hidden sm:block" aria-hidden="true" />
      <!-- Slow gold reflection sweep across the whole hall (lions + bar) -->
      <div class="hk-sweep pointer-events-none absolute inset-0" aria-hidden="true" />

      <ParticleLayer :count="lite ? 4 : 16" />

      <div class="relative z-10">
        <SectionHeader title="Hall of Kings" eyebrow="Legends of the Realm" align="center" />

        <!-- Season info bar -->
        <div class="hk-bar relative mx-auto mb-12 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border-gold/15 bg-black/25 backdrop-blur sm:flex-row sm:rounded-full lg:mb-16" data-reveal>
          <div class="flex flex-1 items-center justify-center gap-2 px-4 py-2.5">
            <img src="/assets/images/emblems/emblem-02-lion.webp" alt="" class="hk-ipulse h-4 w-4 object-contain" />
            <span class="whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-champagne">{{ kingsSeason.name }}</span>
          </div>
          <div class="flex flex-1 items-center justify-center gap-2 border-t border-border-gold/12 px-4 py-2.5 sm:border-l sm:border-t-0">
            <AppIcon name="vault" :size="14" class="hk-ipulse text-gold-bright" />
            <span class="whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-champagne">{{ kingsSeason.prizePool }}</span>
          </div>
          <div class="flex flex-1 items-center justify-center gap-2 border-t border-border-gold/12 px-4 py-2.5 sm:border-l sm:border-t-0">
            <AppIcon name="clock" :size="14" class="hk-ipulse text-gold-bright" />
            <span class="whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-champagne">{{ kingsSeason.daysRemaining }}</span>
          </div>
          <span class="hk-bar-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
        </div>

        <!-- Podium -->
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-end">
          <PodiumCard
            v-for="c in kingsChampions"
            :key="c.rank"
            :champion="c"
            :class="c.rank === 1 ? 'order-first sm:col-span-2 lg:order-none lg:col-span-1' : ''"
          />
        </div>

        <!-- Headline stats -->
        <div class="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-gold/25 bg-border-gold/20 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          <div v-for="s in kingsStats" :key="s.label" class="group/stat flex items-center gap-3.5 bg-[#08080b]/70 px-5 py-4 transition-colors hover:bg-[#0d0d11]/70">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/45 bg-black/30 text-gold-bright transition-shadow duration-300 group-hover/stat:shadow-gold-soft">
              <AppIcon :name="s.icon" :size="18" />
            </span>
            <div class="min-w-0">
              <p class="font-sans text-[10px] uppercase tracking-[0.12em] text-ink-dim">{{ s.label }}</p>
              <p class="font-display text-xl font-bold tabular-nums tracking-[0.01em] text-gold-bright"><CountUp :value="s.value" /></p>
              <p class="truncate font-sans text-[10px] text-ink-muted">{{ s.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Static scale on the backdrop — headroom for the scroll parallax */
.hk-zoom { transform: scale(1.16); }

/* Candlelight flicker — gentle, irregular opacity drift */
.hk-flicker { animation: hkFlicker 9s ease-in-out infinite; }
@keyframes hkFlicker {
  0%, 100% { opacity: 0.9; }
  20% { opacity: 1; }
  45% { opacity: 0.82; }
  70% { opacity: 0.97; }
}

/* Volumetric light beams — extremely slow drift */
.hk-beam {
  top: -20%;
  height: 150%;
  width: 38%;
  background: linear-gradient(105deg, transparent 35%, rgba(245, 215, 122, 0.07) 50%, transparent 65%);
  filter: blur(14px);
}
.hk-beam-1 { left: 8%; transform: rotate(8deg); animation: hkBeam1 16s ease-in-out infinite; }
.hk-beam-2 { right: 6%; transform: rotate(-10deg); animation: hkBeam2 19s ease-in-out infinite; }
@keyframes hkBeam1 {
  0%, 100% { opacity: 0.4; transform: translateX(-6%) rotate(8deg); }
  50% { opacity: 0.9; transform: translateX(6%) rotate(8deg); }
}
@keyframes hkBeam2 {
  0%, 100% { opacity: 0.5; transform: translateX(5%) rotate(-10deg); }
  50% { opacity: 0.85; transform: translateX(-5%) rotate(-10deg); }
}

/* Slow gold reflection sweep across the whole hall */
.hk-sweep {
  background: linear-gradient(115deg, transparent 42%, rgba(245, 215, 122, 0.06) 50%, transparent 58%);
  transform: translateX(-100%);
  animation: hkSweep 11s ease-in-out infinite;
}
@keyframes hkSweep {
  0% { transform: translateX(-100%); }
  35%, 100% { transform: translateX(100%); }
}

/* Season-bar highlight sweep + icon pulse */
.hk-bar-sweep {
  background: linear-gradient(110deg, transparent 40%, rgba(245, 215, 122, 0.14) 50%, transparent 60%);
  transform: translateX(-110%);
  animation: hkSweep 10s ease-in-out infinite;
}
.hk-ipulse { animation: hkIconPulse 6s ease-in-out infinite; }
@keyframes hkIconPulse {
  0%, 100% { filter: drop-shadow(0 0 0 rgba(245, 215, 122, 0)); opacity: 0.92; }
  50% { filter: drop-shadow(0 0 6px rgba(245, 215, 122, 0.55)); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .hk-flicker, .hk-beam, .hk-sweep, .hk-bar-sweep, .hk-ipulse, .hk-zoom { animation: none; }
  .hk-zoom { transform: scale(1.16); }
}
</style>
