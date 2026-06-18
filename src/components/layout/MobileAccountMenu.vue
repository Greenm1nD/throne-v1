<script setup lang="ts">
import { useRouter } from 'vue-router'
import AccGlyph from '@/components/account/AccGlyph.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { accountNav, balances, user } from '@/data/account'
import { useAuth } from '@/composables/useAuth'
import { useDiscreet } from '@/composables/useDiscreet'
import { useWalletModal } from '@/composables/useWalletModal'
import { useAccountMenu } from '@/composables/useAccountMenu'

/**
 * Global mobile account menu (phones, < md). Opens from the top-bar profile
 * button on ANY page as a top-most right-side drawer with a blurred scrim, so a
 * member reaches their account nav in one tap from anywhere.
 */
const router = useRouter()
const { open } = useAccountMenu()
const { mask } = useDiscreet()
const auth = useAuth()

function go(to: string) {
  open.value = false
  router.push(to)
}
const { open: openWallet } = useWalletModal()
function wallet(kind: 'deposit' | 'withdraw') {
  open.value = false
  openWallet(kind)
}
function logout() {
  open.value = false
  auth.logout()
  router.push('/')
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
        class="fixed inset-y-0 right-0 z-[96] flex w-[86%] max-w-[330px] flex-col overflow-y-auto border-l border-border-gold/40 bg-surface/95 backdrop-blur-xl [scrollbar-width:none] md:hidden"
        aria-label="Account menu"
      >
        <!-- Member + balance -->
        <div class="border-b border-border-gold/25 p-5">
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

        <!-- Nav sections -->
        <nav class="px-3 pb-4 pt-2">
          <template v-for="(sec, si) in accountNav" :key="si">
            <p v-if="sec.title" class="px-3 pb-2 pt-5 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-dim">
              {{ sec.title }}
            </p>
            <button
              v-for="item in sec.items"
              :key="item.label + item.to"
              class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-sans text-[13px] text-ink-muted transition-colors hover:bg-gold/[0.06] hover:text-gold-bright"
              @click="go(item.to)"
            >
              <span class="grid w-8 place-items-center text-gold/70">
                <AccGlyph :icon="item.icon" :font="item.font" :img="item.img" :size="item.img ? 28 : 15" />
              </span>
              {{ item.label }}
            </button>
          </template>

          <button
            class="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-sans text-[13px] text-ink-muted transition-colors hover:bg-gold/[0.06] hover:text-gold-bright"
            @click="logout"
          >
            <span class="grid w-8 place-items-center"><AccGlyph img="/assets/images/account/icon-logout.png" :size="28" /></span>
            Log out
          </button>
        </nav>
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
