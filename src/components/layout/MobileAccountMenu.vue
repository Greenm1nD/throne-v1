<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AccountNav from '@/components/account/AccountNav.vue'
import { balances, user } from '@/data/account'
import { useDiscreet } from '@/composables/useDiscreet'
import { useWalletModal } from '@/composables/useWalletModal'
import { useAccountMenu } from '@/composables/useAccountMenu'

/**
 * Global mobile account menu (phones, < md). Opens from the top-bar profile
 * button on ANY page as a top-most right-side drawer with a blurred scrim. The
 * nav body is the shared config-driven AccountNav (champagne line icons).
 */
const { open } = useAccountMenu()
const { mask } = useDiscreet()
const { open: openWallet } = useWalletModal()
function wallet(kind: 'deposit' | 'withdraw') {
  open.value = false
  openWallet(kind)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="ma-scrim">
      <div
        v-if="open"
        class="fixed inset-0 z-[95] bg-black/65 backdrop-blur-md md:hidden"
        @click="open = false"
      />
    </Transition>
    <Transition name="ma-drawer">
      <aside
        v-if="open"
        class="fixed inset-y-0 right-0 z-[96] flex w-[86%] max-w-[330px] flex-col border-l border-border-gold/40 bg-surface/95 backdrop-blur-xl md:hidden"
        aria-label="Account menu"
      >
        <!-- Member + balance (static header — does not scroll) -->
        <div class="shrink-0 border-b border-border-gold/25 p-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img :src="user.avatar" alt="" class="h-11 w-11 rounded-full border border-border-gold object-cover" />
              <div class="min-w-0">
                <p class="truncate font-sans text-[13px] font-semibold text-ink">{{ user.name }}</p>
                <p class="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-gold-bright">{{ user.tier }}</p>
              </div>
            </div>
            <button class="grid h-9 w-9 place-items-center rounded-full border border-border-gold/40 text-ink-muted transition-colors hover:border-gold hover:text-gold-bright" aria-label="Close" @click="open = false">
              <AppIcon name="x" :size="14" />
            </button>
          </div>
          <p class="mt-4 font-display text-xl font-bold tabular-nums text-gold-gradient">{{ mask(balances.total) }}</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <GoldButton variant="solid" size="sm" block @click="wallet('deposit')">Deposit</GoldButton>
            <GoldButton variant="outline" size="sm" block @click="wallet('withdraw')">Withdraw</GoldButton>
          </div>
        </div>

        <!-- Nav body (the only scrolling area) — shared config-driven nav -->
        <div class="min-h-0 flex-1 overflow-y-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AccountNav @navigate="open = false" />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ma-scrim-enter-active,
.ma-scrim-leave-active { transition: opacity 0.25s ease; }
.ma-scrim-enter-from,
.ma-scrim-leave-to { opacity: 0; }
.ma-drawer-enter-active,
.ma-drawer-leave-active { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.ma-drawer-enter-from,
.ma-drawer-leave-to { transform: translateX(100%); }
</style>
