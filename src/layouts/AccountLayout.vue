<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AccGlyph from '@/components/account/AccGlyph.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import { accountNav, user } from '@/data/account'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const auth = useAuth()
const menuOpen = ref(false) // mobile sidebar
const dropOpen = ref(false)

const dropdown = [
  { label: 'Account', to: '/account/profile', icon: 'user' },
  { label: 'Wallet', to: '/account/balance', icon: 'vault' },
  { label: 'VIP Progress', to: '/account/vip-progress', icon: 'crown' },
  { label: 'Settings', to: '/account/security', icon: 'lock' },
]

function logout() {
  dropOpen.value = false
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- ── Sidebar ── -->
    <aside
      class="fixed inset-y-0 left-0 z-40 w-[264px] -translate-x-full overflow-y-auto border-r border-white/5 bg-surface/95 backdrop-blur transition-transform duration-300 [scrollbar-width:none] lg:static lg:translate-x-0"
      :class="menuOpen && 'translate-x-0'"
    >
      <!-- Brand -->
      <RouterLink to="/" class="flex items-center gap-3 px-5 py-6">
        <img src="/assets/images/auth-badge.png" alt="" class="h-12 w-auto" />
        <span class="leading-none">
          <span class="text-gold-flow block bg-clip-text font-display text-lg font-semibold tracking-[0.22em] text-transparent">THRONE</span>
          <span class="mt-1 block font-sans text-[7px] font-medium uppercase tracking-[0.3em] text-ink-dim">Built for the Crowned</span>
        </span>
      </RouterLink>

      <!-- Nav sections -->
      <nav class="px-3 pb-6">
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
      </nav>

      <!-- Royal Concierge card -->
      <div class="mx-4 mb-6 rounded-2xl border border-border-gold/60 p-4"
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
        >
          Summon
        </RouterLink>
      </div>
    </aside>

    <!-- Mobile scrim -->
    <div v-if="menuOpen" class="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden" @click="menuOpen = false" />

    <!-- ── Main column ── -->
    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Topbar -->
      <header class="glass-panel sticky top-0 z-20 flex h-[72px] items-center justify-between gap-4 border-b border-border-gold px-4 sm:px-7">
        <button class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-champagne lg:hidden" aria-label="Menu" @click="menuOpen = true">
          <FontIcon name="hamburger" class="text-[16px]" />
        </button>
        <p class="hidden font-sans text-[11px] uppercase tracking-[0.3em] text-ink-dim sm:block">
          Private Members Area
        </p>

        <div class="flex items-center gap-2.5">
          <RouterLink to="/account/rewards" aria-label="Rewards" class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-muted transition-colors hover:border-gold hover:text-gold-bright">
            <AppIcon name="gift" :size="17" />
          </RouterLink>
          <button aria-label="Notifications" class="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-muted transition-colors hover:border-gold hover:text-gold-bright">
            <AppIcon name="bell" :size="17" />
            <span class="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold-gradient font-sans text-[9px] font-bold text-[#1a1407]">3</span>
          </button>

          <!-- User chip + dropdown -->
          <div class="relative">
            <button class="flex items-center gap-3 rounded-full border border-white/10 py-1 pl-1 pr-3 transition-colors hover:border-border-gold" :aria-expanded="dropOpen" @click="dropOpen = !dropOpen">
              <img :src="user.avatar" alt="" class="h-9 w-9 rounded-full border border-border-gold object-cover" />
              <span class="hidden text-left sm:block">
                <span class="block font-sans text-[13px] font-semibold text-ink">{{ user.name }}</span>
                <span class="block font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-gold-bright">{{ user.tier }}</span>
              </span>
              <AppIcon name="chevronDown" :size="14" class="text-ink-dim transition-transform" :class="dropOpen && 'rotate-180'" />
            </button>

            <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150" leave-to-class="opacity-0 -translate-y-1">
              <div v-if="dropOpen" class="glass-panel absolute right-0 top-[calc(100%+8px)] w-52 overflow-hidden rounded-xl border border-border-gold/60 py-1.5 shadow-card-glow">
                <RouterLink
                  v-for="d in dropdown"
                  :key="d.label"
                  :to="d.to"
                  class="flex items-center gap-2.5 px-4 py-2.5 font-sans text-[12px] text-ink-muted transition-colors hover:bg-gold/[0.06] hover:text-gold-bright"
                  @click="dropOpen = false"
                >
                  <AppIcon :name="d.icon" :size="14" class="text-gold/70" /> {{ d.label }}
                </RouterLink>
                <button class="flex w-full items-center gap-2.5 border-t border-white/5 px-4 py-2.5 font-sans text-[12px] text-ink-muted transition-colors hover:bg-gold/[0.06] hover:text-gold-bright" @click="logout">
                  <AppIcon name="x" :size="14" class="text-gold/70" /> Logout
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- Routed page -->
      <main class="min-w-0 flex-1 px-4 py-8 sm:px-7 lg:px-9" @click="dropOpen = false">
        <RouterView />
      </main>
    </div>
  </div>
</template>
