<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CategoryNav from '@/components/page/CategoryNav.vue'
import LoadingScreen from '@/components/home/LoadingScreen.vue'
import AuthModal from '@/components/auth/AuthModal.vue'
import TwoFaModal from '@/components/auth/TwoFaModal.vue'
import AmbientBackground from '@/components/ui/AmbientBackground.vue'
import AmbientAudio from '@/components/ui/AmbientAudio.vue'
import AgeGate from '@/components/ui/AgeGate.vue'
import WalletModal from '@/components/wallet/WalletModal.vue'
import FloatingCommandBar from '@/components/ui/FloatingCommandBar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import MobileTopBar from '@/components/layout/MobileTopBar.vue'
import MobileBottomNav from '@/components/layout/MobileBottomNav.vue'
import MobileAccountMenu from '@/components/layout/MobileAccountMenu.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppFooterPremium from '@/components/layout/AppFooterPremium.vue'
import { premiumEnabled } from '@/composables/usePremiumMotion'
import { polishEnabled } from '@/composables/usePolish'
import { mobilePolishEnabled } from '@/composables/useMobilePolish'
import { introDone } from '@/composables/useIntroDone'

const ready = ref(false)
// The intro loader mounts only when the sequencing below asks for it.
const showLoader = ref(false)

/** Loader dissolved (or skipped) — show the app and release entrance choreography. */
function onIntroDone() {
  ready.value = true
  introDone.value = true
}
const router = useRouter()
const route = useRoute()

/* ── Entrance sequencing ──────────────────────────────────────────────────────
 * Age gate FIRST, then (home only, once per session) the intro loader, then the
 * hero "lights-on" entrance — so a first visitor actually sees the entrance
 * instead of it playing underneath the gate overlay. All storage access is
 * try/caught: a blocked store simply skips the ceremony.
 * ──────────────────────────────────────────────────────────────────────────── */
const AGE_KEY = 'throne.age-ok' // written by AgeGate.vue on accept
const INTRO_KEY = 'throne.intro-seen'
let gatePoll = 0

function ageAccepted(): boolean {
  try {
    return localStorage.getItem(AGE_KEY) === '1'
  } catch {
    return true // storage blocked → the gate can't open either; proceed
  }
}

function introSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return true // can't remember it played → don't risk replaying every load
  }
}

function beginEntrance() {
  if (route.path === '/' && !introSeen()) {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* private mode — the loader just plays again next load */
    }
    showLoader.value = true
  } else {
    onIntroDone()
  }
}

// Global product category strip — shown on play/browse pages, hidden inside the
// account area, on static info pages, and on campaign landers (single-purpose
// pages where product navigation would leak the visitor before the CTA).
const showCategoryNav = computed(
  () =>
    ready.value &&
    !route.path.startsWith('/account') &&
    !route.meta.info &&
    route.name !== 'campaign',
)

// Activates all premium-motion CSS (scoped under html.premium). Flag off → no
// class → stable design, untouched. `data-page` drives the per-page atmosphere.
onMounted(() => {
  // Wait for the initial navigation so `route.path` is the real landing route,
  // then run the gate → loader → entrance chain. AgeGate resolves via
  // localStorage (it owns the key), so a light poll watches for the accept.
  void router.isReady().then(() => {
    if (ageAccepted()) {
      beginEntrance()
      return
    }
    gatePoll = window.setInterval(() => {
      if (!ageAccepted()) return
      window.clearInterval(gatePoll)
      beginEntrance()
    }, 250)
  })

  if (polishEnabled) document.documentElement.classList.add('polish')
  if (mobilePolishEnabled) document.documentElement.classList.add('mobile-polish')
  if (!premiumEnabled) return
  document.documentElement.classList.add('premium')
  const setPage = (name: unknown) => {
    document.documentElement.dataset.page = String(name ?? '')
  }
  setPage(router.currentRoute.value.name)
  router.afterEach((to) => setPage(to.name))
})

onBeforeUnmount(() => window.clearInterval(gatePoll))
</script>

<template>
  <LoadingScreen v-if="showLoader && !ready" @done="onIntroDone" />
  <AmbientBackground />
  <AppHeader v-show="ready" />
  <!-- Phone-only chrome (flag on; AppHeader is hidden < 768 via mobile.css) -->
  <MobileTopBar v-if="mobilePolishEnabled" v-show="ready" />
  <!-- Single primary nav line (desktop/tablet only; phones use the hamburger drawer) -->
  <CategoryNav v-if="showCategoryNav" class="hidden md:block" />
  <div v-show="ready" class="min-h-[60vh]">
    <RouterView v-slot="{ Component }">
      <Transition name="pm-page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
  <AppFooterPremium v-if="premiumEnabled" v-show="ready" />
  <AppFooter v-else v-show="ready" />
  <AmbientAudio />
  <AuthModal />
  <TwoFaModal />
  <WalletModal />
  <FloatingCommandBar v-if="premiumEnabled" />
  <template v-if="mobilePolishEnabled">
    <MobileBottomNav v-show="ready" />
    <MobileAccountMenu />
  </template>
  <!-- Mounted immediately: the gate must resolve before the intro plays -->
  <AgeGate />
</template>
