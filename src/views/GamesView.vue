<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GamesLobby from '@/components/page/GamesLobby.vue'
import { useRevealEach } from '@/composables/useReveal'

/**
 * THRONE Games — the shared games lobby (same GamesFilterBar as Casino/Virtuals
 * for one consistent filter) + top providers + value strip. (Hero banner removed.)
 */
const root = ref<HTMLElement | null>(null)
useRevealEach(root)

const providers = ['Pragmatic Play', 'Spribe', 'Evolution', 'Hacksaw', "Play'n GO", 'NetEnt', 'Relax Gaming', 'NoLimit City']

const values = [
  { icon: 'bolt', title: 'Instant Play', sub: 'No downloads. Start playing instantly.' },
  { icon: 'shield', title: 'Fair & Secure', sub: 'Provably fair games and secure environment.' },
  { icon: 'clock', title: '24/7 Action', sub: 'New games and events all day, every day.' },
  { icon: 'monitor', title: 'Mobile Ready', sub: 'Play your favorite games anywhere, anytime.' },
  { icon: 'percent', title: 'Fast Payouts', sub: 'Quick withdrawals and instant results.' },
]
</script>

<template>
  <main ref="root" class="pb-8 pt-4 sm:pt-6">
    <!-- Shared games lobby (same filter as every other page) -->
    <GamesLobby title="All Games" />

    <!-- ── Top providers ────────────────────────────────────────────────── -->
    <section class="container-royal pt-12 sm:pt-16">
      <h2 class="mb-5 font-display text-xl font-semibold tracking-[0.14em] text-gold-gradient">Top Providers</h2>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        <div v-for="p in providers" :key="p"
          class="flex h-16 items-center justify-center rounded-xl border border-border-gold/15 bg-card/60 px-3 text-center font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-border-gold/50 hover:text-champagne">
          {{ p }}
        </div>
      </div>
    </section>

    <!-- ── Value strip ──────────────────────────────────────────────────── -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="grid grid-cols-2 gap-3 rounded-2xl border border-border-gold/15 bg-card/60 p-4 sm:grid-cols-3 lg:grid-cols-5 lg:p-5" data-reveal>
        <div v-for="v in values" :key="v.title" class="flex flex-col items-center gap-2 px-2 py-4 text-center">
          <span class="grid h-10 w-10 place-items-center rounded-full border border-border-gold/40 text-gold-bright">
            <AppIcon :name="v.icon" :size="18" />
          </span>
          <span class="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-ink">{{ v.title }}</span>
          <span class="font-sans text-[11px] leading-snug text-ink-dim">{{ v.sub }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
