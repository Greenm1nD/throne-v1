<script setup lang="ts">
import { ref } from 'vue'
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

// Deposit tap → spring pulse (class toggled for the animation duration).
const tapping = ref(false)
let tapTimer: ReturnType<typeof setTimeout> | undefined
function onDeposit() {
  tapping.value = false
  requestAnimationFrame(() => {
    tapping.value = true
    clearTimeout(tapTimer)
    tapTimer = setTimeout(() => (tapping.value = false), 360)
  })
  openWallet('deposit')
}
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

      <!-- Raised centre Deposit button (premium animated focal point) -->
      <button
        class="deposit-btn order-3 flex min-w-[64px] flex-1 flex-col items-center"
        aria-label="Deposit"
        @click="onDeposit"
      >
        <span class="deposit-raise relative grid place-items-center">
          <span class="deposit-halo" aria-hidden="true" />
          <span class="deposit-coin" :class="{ 'is-tap': tapping }">
            <span class="deposit-ring" aria-hidden="true" />
            <span class="deposit-sweep" aria-hidden="true" />
            <span class="deposit-sign font-display">$</span>
          </span>
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

<style scoped>
/* ── Central Deposit button: luxury focal point ──────────────────────────────
   Black & champagne-gold. Calm, restrained — a gold coin / watch-crown feel.
   GPU-only transforms (scale/translate/opacity), no layout shift. */
.deposit-raise {
  margin-top: -22px; /* raise above the bar (no layout shift; static) */
}

/* Soft breathing halo behind the coin (kept tight so it never covers nav items) */
.deposit-halo {
  position: absolute;
  z-index: 0;
  height: 112px;
  width: 112px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(245, 200, 90, 0.35), rgba(245, 200, 90, 0) 68%);
  opacity: 0.22;
  pointer-events: none;
  will-change: opacity, transform;
}

/* The gold coin */
.deposit-coin {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  height: 76px;
  width: 76px;
  border-radius: 9999px;
  overflow: hidden;
  color: #1a1407;
  background: linear-gradient(158deg, #f7dd86 0%, #e8c45e 46%, #c89f3c 100%);
  box-shadow:
    0 0 0 4px #0a0a0c, /* dark separator against the bar */
    inset 0 1px 0 rgba(255, 255, 255, 0.5), /* inner highlight */
    inset 0 -7px 13px rgba(120, 80, 10, 0.35),
    0 0 18px 2px rgba(245, 200, 90, 0.3), /* outer amber glow (≤0.35) */
    0 10px 22px -8px rgba(0, 0, 0, 0.85); /* dark drop */
  will-change: transform;
}

.deposit-sign {
  position: relative;
  z-index: 3;
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
}

/* Thin rotating champagne arc forming the outer ring (coin + 8px) */
.deposit-ring {
  position: absolute;
  z-index: 1;
  height: 84px;
  width: 84px;
  border-radius: 9999px;
  background: conic-gradient(
    from 0deg,
    rgba(245, 215, 122, 0) 0deg,
    rgba(245, 215, 122, 0.75) 55deg,
    rgba(245, 215, 122, 0) 130deg,
    rgba(245, 215, 122, 0) 360deg
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.3s ease;
  will-change: transform;
}

/* Diagonal light sweep clipped to the coin */
.deposit-sweep {
  position: absolute;
  z-index: 2;
  inset: -25%;
  background: linear-gradient(115deg, transparent 42%, rgba(255, 255, 255, 0.55) 50%, transparent 58%);
  transform: translateX(-120%);
  opacity: 0;
  pointer-events: none;
}

/* Active pulse + brighten ring + nudge sign on tap (interaction feedback) */
.deposit-coin.is-tap {
  animation: dTap 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.deposit-coin.is-tap .deposit-ring,
.deposit-btn:active .deposit-ring {
  opacity: 0.95;
}
.deposit-coin.is-tap .deposit-sign {
  animation: dSign 320ms ease-out;
}
@keyframes dTap {
  0% { transform: scale(0.96); }
  55% { transform: scale(1.03); }
  100% { transform: scale(1); }
}
@keyframes dSign {
  0% { transform: translateY(0); }
  40% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
}

/* Idle ambient motion — only when motion is welcome */
@media (prefers-reduced-motion: no-preference) {
  .deposit-halo { animation: dHalo 7s ease-in-out infinite; }
  .deposit-coin { animation: dBreath 7s ease-in-out infinite; }
  .deposit-ring { animation: dRing 14s linear infinite; }
  .deposit-sweep { animation: dSweep 6s ease-in-out infinite; }
}
@keyframes dHalo {
  0%, 100% { opacity: 0.16; transform: scale(0.96); }
  50% { opacity: 0.32; transform: scale(1.05); }
}
@keyframes dBreath {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.015); }
}
@keyframes dRing {
  to { transform: rotate(360deg); }
}
@keyframes dSweep {
  0% { transform: translateX(-120%); opacity: 0; }
  7% { opacity: 0.9; }
  20% { transform: translateX(120%); opacity: 0; }
  100% { transform: translateX(120%); opacity: 0; }
}
</style>
