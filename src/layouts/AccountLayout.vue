<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AccGlyph from '@/components/account/AccGlyph.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { accountNav, balances, user } from '@/data/account'
import { useAuth } from '@/composables/useAuth'

/**
 * GreenBet-style mechanics: the account area renders INSIDE the site —
 * the public header/footer stay, the sidebar is a card column in the page
 * flow (sticky on desktop, off-canvas drawer on mobile).
 */
const router = useRouter()
const auth = useAuth()
const menuOpen = ref(false) // mobile drawer

function logout() {
  menuOpen.value = false
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="container-royal py-8 lg:py-10">
    <div class="flex items-start gap-6">
      <!-- ── Sidebar (card on lg, off-canvas drawer below) ── -->
      <aside
        class="fixed inset-y-0 left-0 z-40 w-[280px] -translate-x-full overflow-y-auto border-r border-border-gold/25 bg-surface/95 pt-[72px] backdrop-blur transition-transform duration-300 [scrollbar-width:none] lg:sticky lg:top-[88px] lg:z-auto lg:w-[264px] lg:shrink-0 lg:translate-x-0 lg:self-start lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-border-gold/25 lg:bg-surface/60 lg:pt-0 lg:[max-height:calc(100vh-112px)]"
        :class="menuOpen && 'translate-x-0'"
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
          <p class="mt-4 font-display text-xl font-bold tabular-nums text-gold-gradient">{{ balances.total }}</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <RouterLink to="/account/deposit" @click="menuOpen = false">
              <GoldButton variant="solid" size="sm" block>Deposit</GoldButton>
            </RouterLink>
            <RouterLink to="/account/withdraw" @click="menuOpen = false">
              <GoldButton variant="outline" size="sm" block>Withdraw</GoldButton>
            </RouterLink>
          </div>
        </div>

        <!-- Nav sections -->
        <nav class="px-3 pb-3 pt-2">
          <template v-for="(sec, si) in accountNav" :key="si">
            <p v-if="sec.title" class="px-3 pb-2 pt-5 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-dim">
              {{ sec.title }}
            </p>
            <RouterLink
              v-for="item in sec.items"
              :key="item.label + item.to"
              :to="item.to"
              class="group mb-0.5 flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 font-sans text-[13px] text-ink-muted transition-all hover:text-gold-bright"
              :exact-active-class="'border-border-gold bg-gold/[0.07] text-gold-bright shadow-[inset_2px_0_0_0_rgba(245,215,122,0.8)]'"
              @click="menuOpen = false"
            >
              <span class="grid w-5 place-items-center text-gold/70 transition-colors group-hover:text-gold-bright">
                <AccGlyph :icon="item.icon" :font="item.font" :size="15" />
              </span>
              {{ item.label }}
            </RouterLink>
          </template>

          <button
            class="group mt-2 flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 font-sans text-[13px] text-ink-muted transition-all hover:text-gold-bright"
            @click="logout"
          >
            <span class="grid w-5 place-items-center text-gold/70 transition-colors group-hover:text-gold-bright">
              <AppIcon name="x" :size="15" />
            </span>
            Log out
          </button>
        </nav>

        <!-- Royal Concierge card -->
        <div class="mx-4 mb-5 rounded-2xl border border-border-gold/60 p-4"
          style="background: linear-gradient(160deg, rgba(212,175,55,0.08), rgba(8,8,10,0.6))"
        >
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 place-items-center rounded-full border border-border-gold text-gold-bright">
              <AppIcon name="headset" :size="17" />
            </span>
            <div>
              <p class="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-champagne">Royal Concierge</p>
              <p class="font-sans text-[10px] text-ink-dim">24/7 dedicated assistance</p>
            </div>
          </div>
          <RouterLink
            to="/account/concierge"
            class="mt-3 block rounded-full border border-border-gold py-1.5 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne transition-colors hover:border-gold hover:text-gold-bright"
            @click="menuOpen = false"
          >
            Summon
          </RouterLink>
        </div>
      </aside>

      <!-- Mobile scrim -->
      <div v-if="menuOpen" class="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden" @click="menuOpen = false" />

      <!-- ── Routed page ── -->
      <main class="min-w-0 flex-1">
        <button
          class="mb-5 flex items-center gap-2.5 rounded-full border border-border-gold/60 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne transition-colors hover:border-gold hover:text-gold-bright lg:hidden"
          aria-label="Account menu"
          @click="menuOpen = true"
        >
          <FontIcon name="hamburger" class="text-[14px]" /> Account Menu
        </button>
        <RouterView />
      </main>
    </div>
  </div>
</template>
