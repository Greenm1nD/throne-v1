<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CrownLogo from '@/components/ui/CrownLogo.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { primaryNav } from '@/data/navigation'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'
import { user as member } from '@/data/account'
import { joinCta } from '@/config'

/**
 * Mobile top bar (phones only, < md). Replaces the desktop header on small
 * screens under the mobile flag: hamburger (left) opens a full page-list drawer,
 * centred crest, profile button (right) for quick auth / account. The existing
 * AppHeader is hidden < 768 via mobile.css so there is only one chrome.
 */
const router = useRouter()
const { isLoggedIn, logout } = useAuth()
const { open } = useAuthModal()
const drawer = ref(false)

const secondary = [
  { label: 'About', href: '/about' },
  { label: 'Help Center', href: '/help' },
  { label: 'Responsible Gaming', href: '/responsible-gaming' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
]

function go(href: string) {
  drawer.value = false
  router.push(href)
}
function profile() {
  if (isLoggedIn.value) router.push('/account')
  else open('login')
}
function signOut() {
  drawer.value = false
  logout()
  router.push('/')
}
</script>

<template>
  <header class="mobile-topbar glass-panel sticky top-0 z-50 h-14 w-full border-b border-border-gold md:hidden">
    <div class="flex h-full items-center justify-between px-3">
      <!-- Left: hamburger -->
      <button
        class="grid h-11 w-11 place-items-center rounded-full text-champagne transition-colors hover:text-gold-bright"
        :aria-expanded="drawer"
        aria-label="Open navigation menu"
        @click="drawer = true"
      >
        <span class="flex flex-col gap-[5px]">
          <span class="block h-0.5 w-5 rounded-full bg-current" />
          <span class="block h-0.5 w-5 rounded-full bg-current" />
          <span class="block h-0.5 w-5 rounded-full bg-current" />
        </span>
      </button>

      <!-- Center: crest -->
      <RouterLink to="/" aria-label="THRONE home" class="absolute left-1/2 -translate-x-1/2">
        <CrownLogo :size="28" :tagline="false" />
      </RouterLink>

      <!-- Right: profile -->
      <button
        class="grid h-11 w-11 place-items-center rounded-full border border-border-gold/60 text-champagne transition-colors hover:border-gold hover:text-gold-bright"
        :aria-label="isLoggedIn ? 'Your account' : 'Log in or join'"
        @click="profile"
      >
        <img v-if="isLoggedIn" :src="member.avatar" alt="" class="h-9 w-9 rounded-full object-cover" />
        <AppIcon v-else name="user" :size="18" />
      </button>
    </div>
  </header>

  <!-- Full page-list drawer -->
  <Teleport to="body">
    <Transition name="md-scrim">
      <div v-if="drawer" class="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm md:hidden" @click="drawer = false" />
    </Transition>
    <Transition name="md-drawer">
      <aside
        v-if="drawer"
        class="fixed inset-y-0 left-0 z-[71] flex w-[84%] max-w-[330px] flex-col overflow-y-auto border-r border-border-gold bg-surface/98 backdrop-blur-xl md:hidden [scrollbar-width:none]"
      >
        <div class="flex items-center justify-between border-b border-border-gold/30 px-5 py-4">
          <CrownLogo :size="30" :tagline="false" />
          <button class="grid h-10 w-10 place-items-center rounded-full text-ink-muted hover:text-gold-bright" aria-label="Close menu" @click="drawer = false">
            <AppIcon name="x" :size="18" />
          </button>
        </div>

        <!-- All pages -->
        <nav class="flex flex-col px-3 py-3">
          <RouterLink
            v-for="item in primaryNav"
            :key="item.href"
            :to="item.href"
            class="flex items-center gap-3 rounded-xl px-3 py-3.5 font-sans text-[15px] font-medium tracking-[0.02em] text-ink-muted transition-colors hover:bg-gold/[0.06] hover:text-gold-bright"
            :active-class="item.href === '/' ? '' : 'bg-gold/[0.08] text-gold-bright'"
            exact-active-class="bg-gold/[0.08] text-gold-bright"
            @click="drawer = false"
          >
            <span class="h-1.5 w-1.5 rotate-45 bg-gold/50" />
            {{ item.label }}
          </RouterLink>

          <div class="my-2 h-px bg-white/5" />

          <button
            v-for="s in secondary"
            :key="s.href"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left font-sans text-[12px] uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-ink"
            @click="go(s.href)"
          >
            {{ s.label }}
          </button>
        </nav>

        <!-- Auth / account block -->
        <div class="mt-auto border-t border-border-gold/30 p-4">
          <div v-if="!isLoggedIn" class="flex flex-col gap-3">
            <GoldButton variant="solid" size="md" block @click="open('register'); drawer = false">{{ joinCta }}</GoldButton>
            <GoldButton variant="outline" size="md" block @click="open('login'); drawer = false">Log In</GoldButton>
          </div>
          <div v-else class="flex flex-col gap-3">
            <RouterLink to="/account" @click="drawer = false">
              <GoldButton variant="solid" size="md" block>My Kingdom</GoldButton>
            </RouterLink>
            <GoldButton variant="ghost" size="md" block @click="signOut">Log out</GoldButton>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.md-scrim-enter-active,
.md-scrim-leave-active { transition: opacity 0.25s ease; }
.md-scrim-enter-from,
.md-scrim-leave-to { opacity: 0; }
.md-drawer-enter-active,
.md-drawer-leave-active { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.md-drawer-enter-from,
.md-drawer-leave-to { transform: translateX(-100%); }
</style>
