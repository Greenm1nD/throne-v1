<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import GoldButton from '@/components/ui/GoldButton.vue'
import AccountNav from '@/components/account/AccountNav.vue'
import { balances, user } from '@/data/account'
import { useDiscreet } from '@/composables/useDiscreet'

const { mask } = useDiscreet()

/**
 * The account area renders INSIDE the site. On desktop the sidebar is a sticky
 * card column; on mobile it is hidden and the global MobileAccountMenu provides
 * the account navigation. Both use the shared AccountNav (champagne line icons).
 */
const route = useRoute()

// The button for the page you're on reads as active (solid); the other is outline.
const onWithdraw = computed(() => route.path === '/account/withdraw')
</script>

<template>
  <div class="container-royal py-8 lg:py-10">
    <div class="flex items-start gap-6">
      <!-- ── Sidebar — desktop only (mobile uses the global account menu) ── -->
      <aside
        class="hidden w-[264px] shrink-0 self-start overflow-y-auto rounded-2xl border border-border-gold/25 bg-surface/60 [max-height:calc(100vh-112px)] [scrollbar-width:none] lg:sticky lg:top-[88px] lg:block"
      >
        <!-- Member + balance block -->
        <div class="border-b border-border-gold/25 p-5">
          <div class="flex items-center gap-3">
            <img :src="user.avatar" alt="" class="h-11 w-11 rounded-full border border-border-gold object-cover" />
            <div class="min-w-0">
              <p class="truncate font-sans text-[13px] font-semibold text-ink">{{ user.name }}</p>
              <p class="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-gold-bright">{{ user.tier }}</p>
            </div>
          </div>
          <p class="mt-4 font-display text-xl font-bold tabular-nums text-gold-gradient">{{ mask(balances.total) }}</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <RouterLink to="/account/deposit">
              <GoldButton :variant="onWithdraw ? 'outline' : 'solid'" size="sm" block>Deposit</GoldButton>
            </RouterLink>
            <RouterLink to="/account/withdraw">
              <GoldButton :variant="onWithdraw ? 'solid' : 'outline'" size="sm" block>Withdraw</GoldButton>
            </RouterLink>
          </div>
        </div>

        <!-- Shared config-driven nav (champagne line icons) — same as mobile -->
        <AccountNav class="px-2 pb-4" />
      </aside>
      <!-- ── Routed page ── (mobile account menu opens from the top-bar profile button) -->
      <main class="min-w-0 flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>
