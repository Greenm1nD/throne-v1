<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useEnter } from '@/composables/useEnter'
import { trust } from '@/config/trust'
import TrustBlock from '@/components/layout/TrustBlock.vue'

/**
 * Slim premium footer (Phase 2, premium-motion flag). ~40% shorter than the
 * stable AppFooter: centred crest, two condensed link rows, minimal payments,
 * 18+/responsible play kept. Rendered only when the flag is on (App.vue);
 * the original AppFooter is untouched and used otherwise.
 */
const { enter, enterLabel } = useEnter()

const primary = [
  { label: 'Casino', to: '/casino' },
  { label: 'Sports', to: '/sports' },
  { label: 'Live Casino', to: '/live-casino' },
  { label: 'VIP', to: '/vip' },
  { label: 'Kingdom', to: '/kingdom' },
  { label: 'Rewards', to: '/rewards' },
]
const secondary = [
  { label: 'About', to: '/about' },
  { label: 'Help Center', to: '/help' },
  { label: 'Responsible Gaming', to: '/responsible-gaming' },
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
]
</script>

<template>
  <footer
    class="app-footer-premium veined relative mt-20 bg-cover bg-center"
    style="background-image: linear-gradient(180deg, rgba(5,5,5,0.86), rgba(5,5,5,0.94)), url('/assets/images/texture-marble.webp'); background-color: #08080a"
  >
    <!-- Thin top rule with centre diamond -->
    <div class="absolute inset-x-0 top-0 flex items-center justify-center">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/55" />
      <span class="mx-2 h-1.5 w-1.5 rotate-45 bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)]" />
      <div class="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/55" />
    </div>

    <div class="container-royal py-12">
      <!-- Crest -->
      <div class="flex flex-col items-center text-center">
        <img src="/assets/images/throne-logo-mark.webp" alt="" class="h-10 w-auto opacity-90 drop-shadow-[0_3px_14px_rgba(212,175,55,0.4)]" loading="lazy" decoding="async" />
        <p class="mt-3 font-display text-2xl font-bold tracking-[0.22em] text-gold-gradient">THRONE</p>
        <p class="mt-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-champagne/70">
          Built for the Crowned
        </p>
        <GoldButton variant="outline" size="sm" class="mt-5" @click="enter()">
          {{ enterLabel }} <AppIcon name="arrowRight" :size="13" />
        </GoldButton>
      </div>

      <!-- Primary nav -->
      <nav class="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        <RouterLink
          v-for="l in primary"
          :key="l.to"
          :to="l.to"
          class="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-gold-bright"
        >
          {{ l.label }}
        </RouterLink>
      </nav>

      <!-- Secondary links -->
      <nav class="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <RouterLink
          v-for="s in secondary"
          :key="s.to"
          :to="s.to"
          class="font-sans text-[11px] uppercase tracking-[0.1em] text-ink-dim transition-colors hover:text-ink-muted"
        >
          {{ s.label }}
        </RouterLink>
      </nav>

      <!-- Bottom bar -->
      <div class="mt-9 flex flex-col items-center gap-5 border-t border-border-gold/10 pt-7 lg:flex-row lg:justify-between">
        <p class="order-2 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-dim lg:order-1">
          © 2026 THRONE. All rights reserved.
        </p>

        <!-- An acceptance mark is a claim of live contractual acceptance through
             an acquirer. Empty until that is true. -->
        <ul
          v-if="trust.payments?.length"
          class="order-1 flex flex-wrap items-center justify-center gap-4 lg:order-2"
        >
          <li
            v-for="p in trust.payments"
            :key="p"
            class="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-dim"
          >
            {{ p }}
          </li>
        </ul>
      </div>

      <div class="mt-7">
        <TrustBlock />
      </div>
    </div>
  </footer>
</template>
