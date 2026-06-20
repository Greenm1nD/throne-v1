<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import CrownLogo from '@/components/ui/CrownLogo.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { primaryNav } from '@/data/navigation'
import { useAuthModal } from '@/composables/useAuthModal'
import { useAuth } from '@/composables/useAuth'
import { useDiscreet } from '@/composables/useDiscreet'
import { useWalletModal } from '@/composables/useWalletModal'
import { user as member } from '@/data/account'
import { joinCta } from '@/config'

const { open } = useAuthModal()
const { open: openWallet } = useWalletModal()
const { isLoggedIn, balance, logout } = useAuth()
const { discreet, toggle: toggleDiscreet, mask } = useDiscreet()
const router = useRouter()
const bar = ref<HTMLElement | null>(null)
const menuOpen = ref(false)
const scrolled = ref(false)
const accOpen = ref(false)

const balanceLabel = computed(() =>
  mask(`€${balance.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`),
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

function onScroll() {
  scrolled.value = window.scrollY > 24
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  gsap.from(bar.value, { y: -72, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    ref="bar"
    class="app-header glass-panel sticky top-0 z-50 h-[72px] w-full border-b border-border-gold transition-colors duration-300"
    :class="{ 'app-header--scrolled': scrolled }"
  >
    <div class="container-royal flex h-full items-center justify-between gap-6">
      <!-- Left: logo + short decorative divider (THRONE ◇──── ♔) -->
      <div class="flex items-center gap-3.5">
        <CrownLogo :size="38" :tagline="false" />
        <div class="hidden items-center gap-2 lg:flex" aria-hidden="true">
          <span class="h-2 w-2 rotate-45 bg-gold-gradient shadow-[0_0_7px_rgba(245,215,122,0.75)]" />
          <span
            class="h-px w-28 xl:w-36"
            style="background: linear-gradient(90deg, rgba(212,175,55,0.18), rgba(245,215,122,0.6) 50%, rgba(212,175,55,0.18))"
          />
          <AppIcon name="crown" :size="14" class="text-gold/75" />
        </div>
      </div>

      <!-- Right: actions -->
      <div class="flex items-center gap-3">
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
            {{ joinCta }}
          </GoldButton>
        </template>

        <!-- Logged-in cluster: balance pill · Deposit · gift · user menu -->
        <template v-else>
          <!-- Balance pill (eye + amount) — secondary to Deposit -->
          <div class="hidden items-center gap-1.5 rounded-full border border-border-gold/40 bg-black/40 py-1.5 pl-3 pr-4 transition-colors hover:border-border-gold/80 sm:flex">
            <button
              class="grid h-6 w-6 place-items-center rounded-full text-ink-dim transition-colors hover:text-gold-bright"
              :aria-pressed="discreet"
              :aria-label="discreet ? 'Show balance' : 'Hide balance (discreet mode)'"
              @click="toggleDiscreet"
            >
              <AppIcon :name="discreet ? 'eyeOff' : 'eye'" :size="15" />
            </button>
            <span class="font-sans text-[13px] font-semibold tabular-nums text-champagne">{{ balanceLabel }}</span>
          </div>

          <GoldButton variant="solid" size="sm" class="hidden sm:inline-flex" @click="openWallet('deposit')">Deposit</GoldButton>

          <!-- Gift / rewards -->
          <button
            class="relative hidden h-10 w-10 place-items-center rounded-full border border-white/10 text-gold/80 transition-colors hover:border-border-gold hover:text-gold-bright sm:grid"
            aria-label="Rewards"
            @click="router.push('/rewards')"
          >
            <AppIcon name="gift" :size="18" />
            <span class="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-gradient px-1 font-sans text-[9px] font-bold text-bg">3</span>
          </button>

          <div class="relative ml-1.5">
            <button
              class="flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-2.5 transition-colors hover:border-border-gold"
              :aria-expanded="accOpen"
              aria-label="Account menu"
              @click="accOpen = !accOpen"
            >
              <img :src="member.avatar" alt="" class="h-9 w-9 rounded-full border border-border-gold object-cover" />
              <span class="hidden text-left leading-tight lg:block">
                <span class="block font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-ink">{{ member.name }}</span>
                <span class="block font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-bright">{{ member.tier }}</span>
              </span>
              <AppIcon name="chevronDown" :size="13" class="hidden text-ink-dim transition-transform lg:block" :class="accOpen && 'rotate-180'" />
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
              {{ joinCta }}
            </GoldButton>
          </div>
          <div v-else class="mt-4 flex flex-col gap-3 pb-2">
            <div class="flex items-center justify-between rounded-full border border-border-gold/60 py-1.5 pl-3 pr-1.5">
              <div class="flex items-center gap-2">
                <button
                  class="grid h-8 w-8 place-items-center rounded-full text-ink-dim transition-colors hover:text-gold-bright"
                  :aria-pressed="discreet"
                  :aria-label="discreet ? 'Show balance' : 'Hide balance (discreet mode)'"
                  @click="toggleDiscreet"
                >
                  <AppIcon :name="discreet ? 'eyeOff' : 'eye'" :size="16" />
                </button>
                <span class="font-sans text-[13px] font-bold tabular-nums text-gold-bright">{{ balanceLabel }}</span>
              </div>
              <GoldButton variant="solid" size="sm" @click="openWallet('deposit'); menuOpen = false">Deposit</GoldButton>
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
