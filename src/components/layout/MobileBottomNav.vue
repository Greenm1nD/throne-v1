<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'
import { useWalletModal } from '@/composables/useWalletModal'
import { joinCta } from '@/config'

/**
 * Mobile bottom navigation (phones only, < md), auth-aware:
 *  - Member: four nav targets flanking a raised, prominent Deposit button ($).
 *  - Guest: Register + Log In actions (browsing nav stays in the top-left drawer).
 * Large tap targets, iOS safe-area padding. Rendered only under the mobile flag.
 */
const route = useRoute()
const { isLoggedIn } = useAuth()
const { open } = useAuthModal()
const { open: openWallet } = useWalletModal()

const items = [
  { label: 'Home', icon: 'crown', to: '/' },
  { label: 'Casino', icon: 'sparkle', to: '/casino' },
  { label: 'Sports', icon: 'trophy', to: '/sports' },
  { label: 'Kingdom', icon: 'star', to: '/kingdom' },
]
const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <nav
    class="mobile-bottomnav glass-panel fixed inset-x-0 bottom-0 z-50 border-t border-border-gold/50 md:hidden"
    aria-label="Primary"
  >
    <!-- Member: nav + raised centre Deposit -->
    <div v-if="isLoggedIn" class="mx-auto flex max-w-md items-end justify-around px-1">
      <RouterLink
        v-for="(item, i) in items"
        :key="item.to"
        :to="item.to"
        class="group flex min-w-[52px] flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors"
        :class="[isActive(item.to) ? 'text-gold-bright' : 'text-ink-dim hover:text-ink', ['order-1','order-2','order-4','order-5'][i]]"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        <span class="grid h-7 w-7 place-items-center rounded-full transition-colors" :class="isActive(item.to) && 'bg-gold/[0.14]'">
          <AppIcon :name="item.icon" :size="18" />
        </span>
        <span class="font-sans text-[9px] font-semibold uppercase tracking-[0.1em]">{{ item.label }}</span>
      </RouterLink>

      <!-- Raised centre Deposit button -->
      <button
        class="order-3 flex flex-1 min-w-[64px] flex-col items-center"
        aria-label="Deposit"
        @click="openWallet('deposit')"
      >
        <span
          class="-mt-7 grid h-[58px] w-[58px] place-items-center rounded-full bg-gold-gradient text-[#1a1407] shadow-[0_8px_24px_-6px_rgba(245,215,122,0.7),inset_0_1px_0_rgba(255,255,255,0.4)] ring-4 ring-[#0a0a0c]"
        >
          <span class="font-display text-2xl font-bold leading-none">$</span>
        </span>
        <span class="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-gold-bright">Deposit</span>
      </button>
    </div>

    <!-- Guest: Register + Log In -->
    <div v-else class="flex items-center gap-3 px-4 py-3">
      <GoldButton variant="outline" size="md" block @click="open('login')">Log In</GoldButton>
      <GoldButton variant="solid" size="md" block @click="open('register')">{{ joinCta }}</GoldButton>
    </div>

    <!-- iOS home-indicator safe area -->
    <div style="height: env(safe-area-inset-bottom)" />
  </nav>
</template>
