<script setup lang="ts">
import { ref } from 'vue'
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
  { value: '4,820', label: 'Members Worldwide' },
  { value: 'MMXXI', label: 'Established' },
  { value: '3.2%', label: 'Acceptance Rate' },
]
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-24">
    <div class="relative overflow-hidden rounded-[24px] border border-border-gold/25 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]" data-reveal>
      <div
        v-lazybg="`linear-gradient(180deg, rgba(6,6,8,0.92), rgba(6,6,8,0.97)), url('/assets/images/hero-throne-room.webp')`"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundColor: '#08080a' }"
      />
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(80% 60% at 50% 0%, rgba(245,215,122,0.12), transparent 55%)" />
      <ParticleLayer :count="14" />

      <div class="relative z-10 flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-16">
        <!-- Wax seal -->
        <div class="relative h-28 w-28">
          <span class="absolute -inset-2 rounded-full" style="background: radial-gradient(circle, rgba(245,215,122,0.42), transparent 60%); filter: blur(6px)" />
          <img
            src="/assets/images/invitation-seal.webp"
            alt=""
            class="relative h-28 w-28 rounded-full object-cover drop-shadow-[0_0_24px_rgba(245,215,122,0.4)]"
            style="-webkit-mask-image: radial-gradient(circle, #000 60%, transparent 74%); mask-image: radial-gradient(circle, #000 60%, transparent 74%)"
          />
        </div>

        <p class="mt-7 font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-champagne/70">Strictly Limited · Season of the Lion</p>
        <h2 class="mt-3 font-display text-3xl font-semibold tracking-[0.1em] text-gold-gradient sm:text-4xl">Membership by Invitation</h2>
        <p class="mt-4 max-w-xl font-sans text-[14px] leading-7 text-ink-muted">
          The Kingdom admits a measured few each season. A private host, bespoke limits and the company of equals — reserved for those who hold a title.
        </p>

        <!-- Seats scarcity -->
        <div class="mt-9 w-full max-w-md">
          <div class="mb-2 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.14em]">
            <span class="text-ink-dim">Founding Seats</span>
            <span class="font-semibold text-gold-bright">{{ seatsRemaining }} of {{ seatsTotal }} remaining</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div class="h-full rounded-full bg-gold-gradient shadow-[0_0_12px_rgba(245,215,122,0.5)]" :style="{ width: `${claimedPct}%` }" />
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-9">
          <span v-if="isLoggedIn" class="inline-flex items-center gap-2 rounded-full border border-border-gold/50 bg-black/30 px-6 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-bright backdrop-blur">
            <AppIcon name="check" :size="14" /> Your Seat Is Secured
          </span>
          <GoldButton v-else variant="solid" size="lg" @click="enter()">
            Request Your Invitation <AppIcon name="arrowRight" :size="15" />
          </GoldButton>
        </div>

        <!-- Provenance stats -->
        <div class="mt-11 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-border-gold/10 pt-8">
          <div v-for="s in stats" :key="s.label">
            <p class="font-display text-xl font-bold tracking-[0.04em] text-gold-gradient sm:text-2xl">{{ s.value }}</p>
            <p class="mt-1 font-sans text-[10px] uppercase tracking-[0.14em] text-ink-dim">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
