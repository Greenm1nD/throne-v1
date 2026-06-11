<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import CrownLogo from '@/components/ui/CrownLogo.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { primaryNav } from '@/data/navigation'
import { useAuthModal } from '@/composables/useAuthModal'
import { useAuth } from '@/composables/useAuth'
import { user as member } from '@/data/account'

const { open } = useAuthModal()
const { isLoggedIn, user, balance, logout } = useAuth()
const router = useRouter()
const bar = ref<HTMLElement | null>(null)
const menuOpen = ref(false)
const accOpen = ref(false)

const balanceLabel = computed(() =>
  `$${balance.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
)

const accLinks = [
  { label: 'Dashboard', to: '/account', icon: 'crown' },
  { label: 'Wallet', to: '/account/balance', icon: 'vault' },
  { label: 'Bet History', to: '/account/bet-history', icon: 'trophy' },
  { label: 'VIP Club', to: '/account/vip-progress', icon: 'star' },
]

function signOut() {
  accOpen.value = false
  logout()
  router.push('/')
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  gsap.from(bar.value, { y: -72, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })
})
</script>

<template>
  <header
    ref="bar"
    class="glass-panel sticky top-0 z-50 h-[72px] w-full border-b border-border-gold"
  >
    <div class="container-royal flex h-full items-center justify-between gap-6">
      <!-- Left: logo -->
      <CrownLogo :size="34" :tagline="false" />

      <!-- Center: nav (visible from lg, 1024px) -->
      <nav class="hidden items-center gap-5 lg:flex xl:gap-7">
        <RouterLink
          v-for="item in primaryNav"
          :key="item.label"
          :to="item.href"
          custom
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <a
            :href="href"
            class="group relative font-sans text-[13px] font-medium tracking-wide transition-colors hover:text-ink"
            :class="(item.href === '/' ? isExactActive : isActive) ? 'text-ink' : 'text-ink-muted'"
            @click="navigate"
          >
            {{ item.label }}
            <span
              class="absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300"
              :class="(item.href === '/' ? isExactActive : isActive) ? 'w-full' : 'w-0 group-hover:w-full'"
            />
            <!-- Gold diamond crowning the active underline -->
            <span
              v-if="item.href === '/' ? isExactActive : isActive"
              class="absolute -bottom-[9px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-gold-gradient shadow-[0_0_6px_rgba(245,215,122,0.8)]"
            />
          </a>
        </RouterLink>
      </nav>

      <!-- Right: actions -->
      <div class="flex items-center gap-3">
        <button
          class="group hidden h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-muted transition-all duration-300 hover:border-gold hover:text-gold-bright sm:grid"
          aria-label="Search"
        >
          <AppIcon name="search" :size="17" class="transition-transform duration-500 group-hover:rotate-[18deg]" />
        </button>

        <!-- Guest cluster -->
        <template v-if="!isLoggedIn">
          <GoldButton variant="outline" size="sm" class="hidden sm:inline-flex" @click="open('login')">
            Log In
          </GoldButton>
          <GoldButton
            variant="solid"
            size="sm"
            class="cta-breathe hidden md:inline-flex"
            @click="open('register')"
          >
            Join the Kingdom
          </GoldButton>
        </template>

        <!-- Logged-in cluster: balance pill + avatar dropdown -->
        <template v-else>
          <div class="hidden items-center gap-1 rounded-full border border-border-gold/60 py-1 pl-4 pr-1 sm:flex">
            <span class="font-sans text-[13px] font-bold tabular-nums text-gold-bright">{{ balanceLabel }}</span>
            <RouterLink to="/account/deposit">
              <GoldButton variant="solid" size="sm">Deposit</GoldButton>
            </RouterLink>
          </div>

          <div class="relative">
            <button
              class="flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-2.5 transition-colors hover:border-border-gold"
              :aria-expanded="accOpen"
              aria-label="Account menu"
              @click="accOpen = !accOpen"
            >
              <img :src="member.avatar" alt="" class="h-8 w-8 rounded-full border border-border-gold object-cover" />
              <span class="hidden font-sans text-[12px] font-semibold text-ink md:block">{{ user?.name }}</span>
              <AppIcon name="chevronDown" :size="13" class="text-ink-dim transition-transform" :class="accOpen && 'rotate-180'" />
            </button>

            <Transition
              enter-active-class="transition duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              leave-active-class="transition duration-150"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div v-if="accOpen" class="glass-panel absolute right-0 top-[calc(100%+10px)] w-52 overflow-hidden rounded-xl border border-border-gold/60 py-1.5 shadow-card-glow">
                <RouterLink
                  v-for="l in accLinks"
                  :key="l.label"
                  :to="l.to"
                  class="flex items-center gap-2.5 px-4 py-2.5 font-sans text-[12px] text-ink-muted transition-colors hover:bg-gold/[0.06] hover:text-gold-bright"
                  @click="accOpen = false"
                >
                  <AppIcon :name="l.icon" :size="14" class="text-gold/70" /> {{ l.label }}
                </RouterLink>
                <button
                  class="flex w-full items-center gap-2.5 border-t border-white/5 px-4 py-2.5 font-sans text-[12px] text-ink-muted transition-colors hover:bg-gold/[0.06] hover:text-gold-bright"
                  @click="signOut"
                >
                  <AppIcon name="x" :size="14" class="text-gold/70" /> Log out
                </button>
              </div>
            </Transition>
          </div>
        </template>

        <!-- Mobile menu toggle -->
        <button
          class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-champagne lg:hidden"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'x' : 'plus'" :size="18" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        class="glass-panel absolute inset-x-0 top-[72px] border-b border-border-gold lg:hidden"
      >
        <nav class="container-royal flex flex-col py-4">
          <RouterLink
            v-for="item in primaryNav"
            :key="item.label"
            :to="item.href"
            class="group flex items-center gap-3 border-b border-white/5 py-3.5 font-sans text-sm uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-gold-bright"
            :active-class="item.href === '/' ? '' : 'text-gold-bright'"
            exact-active-class="text-gold-bright"
            @click="menuOpen = false"
          >
            <span class="h-1.5 w-1.5 rotate-45 bg-gold/40 transition-colors group-hover:bg-gold-bright" />
            {{ item.label }}
          </RouterLink>
          <div v-if="!isLoggedIn" class="mt-4 flex flex-col gap-3 pb-2">
            <GoldButton variant="outline" size="md" block @click="open('login'); menuOpen = false">
              Log In
            </GoldButton>
            <GoldButton variant="solid" size="md" block @click="open('register'); menuOpen = false">
              Join the Kingdom
            </GoldButton>
          </div>
          <div v-else class="mt-4 flex flex-col gap-3 pb-2">
            <div class="flex items-center justify-between rounded-full border border-border-gold/60 py-1.5 pl-4 pr-1.5">
              <span class="font-sans text-[13px] font-bold tabular-nums text-gold-bright">{{ balanceLabel }}</span>
              <RouterLink to="/account/deposit" @click="menuOpen = false">
                <GoldButton variant="solid" size="sm">Deposit</GoldButton>
              </RouterLink>
            </div>
            <RouterLink to="/account" @click="menuOpen = false">
              <GoldButton variant="outline" size="md" block>My Kingdom</GoldButton>
            </RouterLink>
            <GoldButton variant="ghost" size="md" block @click="signOut(); menuOpen = false">
              Log out
            </GoldButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
