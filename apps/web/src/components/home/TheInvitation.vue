<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { RANKS, formatBp } from '@/data/progression'
import { useReveal } from '@/composables/useReveal'

/**
 * The Invitation — the trust panel: "What you will never see here."
 * The old scarcity theatre (seat counts, acceptance rates, member tallies) is
 * gone. The panel now states what the house IS, in plain words, and points to
 * the player's own limits.
 */
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.1 })

// Rate range straight from the ladder, so the copy can never drift from the data.
const minRate = formatBp(Math.min(...RANKS.map((r) => r.standingOrderBp)))
const maxRate = formatBp(Math.max(...RANKS.map((r) => r.standingOrderBp)))
const firstRank = RANKS[0].name
const lastRank = RANKS[RANKS.length - 1].name

const promises = [
  {
    icon: 'clock',
    title: 'No countdown timers',
    body: 'Nothing here expires while you decide. A season has an end date; an offer never has a ticking clock.',
  },
  {
    icon: 'shield',
    title: 'No fake scarcity',
    body: 'No invented seat counts, no closing windows, no "only 12 left". What you see is what exists.',
  },
  {
    icon: 'check',
    title: 'No offers that pay for losing',
    body: 'The Standing Order pays on every settled bet, win or lose — never a bonus triggered by a loss.',
  },
  {
    icon: 'percent',
    title: 'Published rates on every rank',
    body: `Every rank's rate is printed on the ladder — ${minRate} at ${firstRank} to ${maxRate} at ${lastRank} — before you stake anything.`,
  },
]

// Subtle scroll parallax on the throne-room backdrop — cinematic depth, GPU-only,
// reduced-motion safe.
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
    const y = Math.max(-40, Math.min(40, -prog * 80))
    el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(1.12)`
  })
}
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section ref="root" class="container-royal pt-10 sm:pt-14">
    <div class="relative overflow-hidden rounded-[24px] border border-border-gold/25 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]" data-reveal>
      <div
        ref="bgEl"
        v-lazybg="`linear-gradient(180deg, rgba(6,6,8,0.92), rgba(6,6,8,0.97)), url('/assets/images/hero-throne-room.webp')`"
        class="absolute inset-0 scale-[1.12] bg-cover bg-center will-change-transform"
        :style="{ backgroundColor: '#08080a' }"
      />
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(80% 60% at 50% 0%, rgba(245,215,122,0.12), transparent 55%)" />
      <ParticleLayer :count="14" />

      <div class="relative z-10 px-6 py-7 sm:px-10 sm:py-9">
        <!-- Header: seal + headline -->
        <div class="flex items-center gap-5" data-reveal>
          <div class="relative h-16 w-16 shrink-0">
            <span class="absolute -inset-1.5 rounded-full" style="background: radial-gradient(circle, rgba(245,215,122,0.42), transparent 60%); filter: blur(5px)" />
            <img loading="lazy" decoding="async"
              src="/assets/images/invitation-seal.webp"
              alt=""
              class="relative h-16 w-16 rounded-full object-cover drop-shadow-[0_0_18px_rgba(245,215,122,0.4)]"
              style="-webkit-mask-image: radial-gradient(circle, #000 60%, transparent 74%); mask-image: radial-gradient(circle, #000 60%, transparent 74%)"
            />
          </div>
          <div>
            <p class="font-sans text-[9px] font-semibold uppercase tracking-[0.26em] text-champagne/70">The House's Word</p>
            <h2 class="mt-1 font-display text-2xl font-semibold tracking-[0.08em] text-gold-gradient sm:text-3xl">What You Will Never See Here</h2>
            <p class="mt-2 max-w-md font-sans text-[12.5px] leading-6 text-ink-muted">
              Four things this house does not do — each one a promise you can check.
            </p>
          </div>
        </div>

        <!-- The four promises -->
        <div class="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            v-for="p in promises"
            :key="p.title"
            class="flex items-start gap-3.5 rounded-2xl border border-border-gold/20 bg-black/30 px-5 py-4 backdrop-blur-sm"
            data-reveal
          >
            <span class="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-gold/45 bg-black/30 text-gold-bright">
              <AppIcon :name="p.icon" :size="15" />
            </span>
            <div>
              <h3 class="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-champagne">{{ p.title }}</h3>
              <p class="mt-1 font-sans text-[12px] leading-5 text-ink-muted">{{ p.body }}</p>
            </div>
          </div>
        </div>

        <!-- Quiet footer: the player's own limits -->
        <p class="mt-6 border-t border-border-gold/15 pt-4 font-sans text-[11px] leading-5 text-ink-dim" data-reveal>
          Set your own ceiling before you play —
          <RouterLink
            to="/responsible-gaming"
            class="text-champagne/80 underline decoration-border-gold/50 underline-offset-2 transition-colors hover:text-gold-bright"
          >Writ of Restraint — deposit &amp; loss limits</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
