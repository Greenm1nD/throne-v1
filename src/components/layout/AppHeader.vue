<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import CrownLogo from '@/components/ui/CrownLogo.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { primaryNav } from '@/data/navigation'
import { useAuthModal } from '@/composables/useAuthModal'

const { open } = useAuthModal()
const bar = ref<HTMLElement | null>(null)
const menuOpen = ref(false)

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
          <div class="mt-4 flex flex-col gap-3 pb-2">
            <GoldButton variant="outline" size="md" block @click="open('login'); menuOpen = false">
              Log In
            </GoldButton>
            <GoldButton variant="solid" size="md" block @click="open('register'); menuOpen = false">
              Join the Kingdom
            </GoldButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
