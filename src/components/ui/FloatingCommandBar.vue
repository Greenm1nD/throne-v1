<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'
import { useWalletModal } from '@/composables/useWalletModal'

/**
 * Floating Command Bar — an optional, desktop-only quick-nav (Linear/Raycast feel)
 * that fades in once the visitor scrolls past the hero. Rendered only behind the
 * premium-motion flag (see App.vue), so it is trivially removable. Hidden on
 * mobile; all targets are real routes/actions (no dead controls).
 */
const { isLoggedIn } = useAuth()
const { open } = useAuthModal()
const { open: openWallet } = useWalletModal()

const items = [
  { label: 'Home', to: '/', icon: 'crown' },
  { label: 'Casino', to: '/casino', icon: 'sparkle' },
  { label: 'Sports', to: '/sports', icon: 'trophy' },
  { label: 'VIP', to: '/vip', icon: 'star' },
  { label: 'Rewards', to: '/rewards', icon: 'gift' },
]

const scrolled = ref(false)
let raf = 0
function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > window.innerHeight * 0.7
    raf = 0
  })
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function wallet() {
  if (isLoggedIn.value) openWallet('deposit')
  else open('register')
}
</script>

<template>
  <Transition name="pm-cmdbar">
    <nav
      v-if="scrolled"
      class="glass-panel fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border-gold/40 p-1.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] md:flex"
      aria-label="Quick navigation"
    >
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <a
          :href="href"
          :aria-label="item.label"
          :aria-current="(item.to === '/' ? isExactActive : isActive) ? 'page' : undefined"
          class="group relative grid h-11 w-11 place-items-center rounded-full transition-colors"
          :class="(item.to === '/' ? isExactActive : isActive)
            ? 'bg-gold/[0.12] text-gold-bright'
            : 'text-ink-muted hover:text-ink'"
          @click="navigate"
        >
          <AppIcon :name="item.icon" :size="18" />
          <span class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-gold/50 bg-black/90 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-champagne opacity-0 transition-opacity group-hover:opacity-100">
            {{ item.label }}
          </span>
        </a>
      </RouterLink>

      <span class="mx-1 h-6 w-px bg-border-gold/30" />

      <button
        class="group relative grid h-11 w-11 place-items-center rounded-full text-ink-muted transition-colors hover:text-gold-bright"
        :aria-label="isLoggedIn ? 'Wallet' : 'Join'"
        @click="wallet"
      >
        <AppIcon name="vault" :size="18" />
        <span class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-gold/50 bg-black/90 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-champagne opacity-0 transition-opacity group-hover:opacity-100">
          {{ isLoggedIn ? 'Wallet' : 'Join' }}
        </span>
      </button>
    </nav>
  </Transition>
</template>
