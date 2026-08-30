<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { useAuth } from '@/composables/useAuth'
import { useEnter } from '@/composables/useEnter'
import { useReveal } from '@/composables/useReveal'

/**
 * The Invitation — exclusivity & scarcity. Membership is capped; founding seats
 * are visibly limited. Wax-seal crest, season name, seats remaining. The lever
 * that makes access feel earned, not bought.
 */
const { isLoggedIn } = useAuth()
const { enter } = useEnter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.1 })

// Founding-seat scarcity (prototype figures).
const seatsTotal = 100
const seatsRemaining = 12
const claimedPct = ((seatsTotal - seatsRemaining) / seatsTotal) * 100

const stats = [
  { value: '4,820', label: 'Members' },
  { value: 'MMXXI', label: 'Established' },
  { value: '3.2%', label: 'Accepted' },
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

<style scoped>
/* Slow conic gold shimmer ring orbiting the wax seal. */
.seal-aura {
  background: conic-gradient(from 0deg, transparent 0%, rgba(245, 215, 122, 0.28) 12%, transparent 28%, transparent 60%, rgba(245, 215, 122, 0.18) 72%, transparent 88%);
  -webkit-mask-image: radial-gradient(circle, transparent 58%, #000 62%, #000 72%, transparent 78%);
  mask-image: radial-gradient(circle, transparent 58%, #000 62%, #000 72%, transparent 78%);
  animation: sealSpin 18s linear infinite;
}
@keyframes sealSpin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .seal-aura { animation: none; }
}
</style>

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

      <div class="relative z-10 flex flex-col gap-7 px-6 py-7 sm:px-10 sm:py-8 lg:flex-row lg:items-center lg:gap-10">
        <!-- Left: seal + headline -->
        <div class="flex items-center gap-5">
          <div class="relative h-16 w-16 shrink-0">
            <span class="seal-aura absolute -inset-3 rounded-full" aria-hidden="true" />
            <span class="absolute -inset-1.5 rounded-full" style="background: radial-gradient(circle, rgba(245,215,122,0.42), transparent 60%); filter: blur(5px)" />
            <img loading="lazy" decoding="async"
              src="/assets/images/invitation-seal.webp"
              alt=""
              class="relative h-16 w-16 rounded-full object-cover drop-shadow-[0_0_18px_rgba(245,215,122,0.4)]"
              style="-webkit-mask-image: radial-gradient(circle, #000 60%, transparent 74%); mask-image: radial-gradient(circle, #000 60%, transparent 74%)"
            />
          </div>
          <div>
            <p class="font-sans text-[9px] font-semibold uppercase tracking-[0.26em] text-champagne/70">Strictly Limited · Season of the Lion</p>
            <h2 class="mt-1 font-display text-2xl font-semibold tracking-[0.08em] text-gold-gradient sm:text-3xl">Membership by Invitation</h2>
            <p class="mt-2 max-w-md font-sans text-[12.5px] leading-6 text-ink-muted">
              The Kingdom admits a measured few each season — reserved for those who hold a title.
            </p>
            <p class="mt-2.5 font-sans text-[10px] uppercase tracking-[0.1em] text-ink-dim">
              <template v-for="(s, i) in stats" :key="s.label"><span class="font-semibold text-champagne/80">{{ s.value }}</span> {{ s.label }}<span v-if="i < stats.length - 1" class="px-2 text-gold/40">·</span></template>
            </p>
          </div>
        </div>

        <!-- Right: seats + CTA -->
        <div class="w-full shrink-0 lg:w-[300px]">
          <div class="mb-2 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.14em]">
            <span class="text-ink-dim">Founding Seats</span>
            <span class="font-semibold text-gold-bright">{{ seatsRemaining }} of {{ seatsTotal }} left</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div class="h-full rounded-full bg-gold-gradient shadow-[0_0_12px_rgba(245,215,122,0.5)]" :style="{ width: `${claimedPct}%` }" />
          </div>
          <div class="mt-4">
            <span v-if="isLoggedIn" class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-gold/50 bg-black/30 px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright backdrop-blur">
              <AppIcon name="check" :size="14" /> Your Seat Is Secured
            </span>
            <GoldButton v-else variant="solid" size="md" block @click="enter()">
              Request Your Invitation <AppIcon name="arrowRight" :size="14" />
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
