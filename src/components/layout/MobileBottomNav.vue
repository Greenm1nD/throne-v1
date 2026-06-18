<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'

/**
 * Mobile bottom navigation (phones only, < md). Five large tap targets with a
 * clear active state and iOS safe-area padding. Profile routes to the account
 * for members, or opens auth for guests. Rendered only under the mobile flag.
 */
const route = useRoute()
const router = useRouter()
const { isLoggedIn } = useAuth()
const { open } = useAuthModal()

const items = [
  { label: 'Home', icon: 'crown', to: '/' },
  { label: 'Casino', icon: 'sparkle', to: '/casino' },
  { label: 'Sports', icon: 'trophy', to: '/sports' },
  { label: 'Kingdom', icon: 'star', to: '/kingdom' },
]

const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))

function profile() {
  if (isLoggedIn.value) router.push('/account')
  else open('login')
}
</script>

<template>
  <nav
    class="mobile-bottomnav glass-panel fixed inset-x-0 bottom-0 z-50 border-t border-border-gold/50 md:hidden"
    aria-label="Primary"
  >
    <div class="mx-auto flex max-w-md items-stretch justify-around px-1">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="group flex min-w-[56px] flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors"
        :class="isActive(item.to) ? 'text-gold-bright' : 'text-ink-dim hover:text-ink'"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        <span
          class="grid h-7 w-7 place-items-center rounded-full transition-colors"
          :class="isActive(item.to) && 'bg-gold/[0.14]'"
        >
          <AppIcon :name="item.icon" :size="18" />
        </span>
        <span class="font-sans text-[9px] font-semibold uppercase tracking-[0.1em]">{{ item.label }}</span>
      </RouterLink>

      <!-- Profile / account -->
      <button
        class="group flex min-w-[56px] flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors"
        :class="route.path.startsWith('/account') ? 'text-gold-bright' : 'text-ink-dim hover:text-ink'"
        :aria-label="isLoggedIn ? 'Account' : 'Log in or join'"
        @click="profile"
      >
        <span
          class="grid h-7 w-7 place-items-center rounded-full transition-colors"
          :class="route.path.startsWith('/account') && 'bg-gold/[0.14]'"
        >
          <AppIcon name="user" :size="18" />
        </span>
        <span class="font-sans text-[9px] font-semibold uppercase tracking-[0.1em]">{{ isLoggedIn ? 'Account' : 'Profile' }}</span>
      </button>
    </div>
    <!-- iOS home-indicator safe area -->
    <div style="height: env(safe-area-inset-bottom)" />
  </nav>
</template>
