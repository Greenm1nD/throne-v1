<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useAuth } from '@/composables/useAuth'
import { useEnter } from '@/composables/useEnter'

/**
 * Concierge band — the first thing a member sees under the hero. White-glove
 * recognition (name · tier · member no.) + a live private host. Guests get a
 * discreet "by invitation only" prompt. Bridges the hero like a private-bank
 * relationship card — calm, gold-hairline, never loud.
 */
const { user, isLoggedIn } = useAuth()
const { enter } = useEnter()
const router = useRouter()
</script>

<template>
  <section class="container-royal relative z-20 -mt-10 sm:-mt-12">
    <div
      class="veined flex flex-col gap-5 rounded-2xl border border-border-gold/15 bg-card/85 px-6 py-5 shadow-card-glow backdrop-blur transition-colors duration-300 hover:border-border-gold sm:flex-row sm:items-center sm:justify-between sm:px-8"
    >
      <!-- Member -->
      <template v-if="isLoggedIn && user">
        <div class="flex items-center gap-4">
          <span
            class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-gold/50 text-gold-bright"
            style="background: radial-gradient(circle, rgba(212,175,55,0.14), transparent 70%)"
          >
            <AppIcon name="crown" :size="20" />
          </span>
          <div>
            <p class="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-dim">Welcome back</p>
            <h2 class="font-display text-xl font-semibold tracking-[0.06em] text-gold-gradient">{{ user.name }}</h2>
            <p class="mt-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-muted">{{ user.tier }} · Private Member No. 0042</p>
          </div>
        </div>

        <!-- divider -->
        <span class="hidden h-12 w-px bg-border-gold/15 lg:block" />

        <!-- Private host -->
        <div class="flex items-center gap-4">
          <div class="relative shrink-0">
            <img src="/assets/images/avatars/royal-02.webp" alt="Private host" class="h-11 w-11 rounded-full border border-border-gold/50 object-cover" />
            <span class="concierge-dot absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-gold-bright" />
          </div>
          <div class="mr-1">
            <p class="font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">Your Private Host</p>
            <p class="font-sans text-[12px] font-semibold text-champagne">Online now</p>
          </div>
          <GoldButton variant="outline" size="sm" @click="router.push('/account')">
            <AppIcon name="chat" :size="13" /> Speak to your host
          </GoldButton>
        </div>
      </template>

      <!-- Guest -->
      <template v-else>
        <div class="flex items-center gap-4">
          <span
            class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-gold/50 text-gold-bright"
            style="background: radial-gradient(circle, rgba(212,175,55,0.14), transparent 70%)"
          >
            <AppIcon name="key" :size="19" />
          </span>
          <div>
            <p class="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-dim">By Invitation Only</p>
            <h2 class="font-display text-xl font-semibold tracking-[0.06em] text-gold-gradient">The Kingdom Awaits</h2>
            <p class="mt-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-muted">Discreet · Private · Yours</p>
          </div>
        </div>

        <div class="flex items-center gap-4 sm:shrink-0">
          <p class="hidden max-w-[200px] font-sans text-[11px] leading-relaxed text-ink-dim lg:block">
            A dedicated host and private limits await your title.
          </p>
          <GoldButton variant="solid" size="md" @click="enter()">
            Request Membership <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.concierge-dot {
  animation: conciergePulse 2.6s ease-out infinite;
}
@keyframes conciergePulse {
  0% { box-shadow: 0 0 0 0 rgba(245, 215, 122, 0.5); }
  70% { box-shadow: 0 0 0 6px rgba(245, 215, 122, 0); }
  100% { box-shadow: 0 0 0 0 rgba(245, 215, 122, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .concierge-dot { animation: none; }
}
</style>
