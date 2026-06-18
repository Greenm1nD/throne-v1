<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'
import { joinCta } from '@/config'

/**
 * Guest welcome sheet (phones only, < md). On a guest's first visit a light
 * bottom sheet rises with Join / Log In and a dismiss (X) so they can simply
 * browse. Choice persists in localStorage; never shown to members.
 */
const STORAGE = 'throne.mobile-welcome-seen'
const { isLoggedIn } = useAuth()
const { open } = useAuthModal()
const show = ref(false)

function dismiss() {
  show.value = false
  try {
    localStorage.setItem(STORAGE, '1')
  } catch {}
}
function act(mode: 'register' | 'login') {
  dismiss()
  open(mode)
}

onMounted(() => {
  if (isLoggedIn.value) return
  let seen = false
  try {
    seen = localStorage.getItem(STORAGE) === '1'
  } catch {}
  if (seen) return
  // Let the loading screen / age gate clear first.
  window.setTimeout(() => {
    if (!isLoggedIn.value) show.value = true
  }, 1600)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ws">
      <div
        v-if="show"
        class="fixed inset-x-0 bottom-0 z-[80] md:hidden"
        role="dialog"
        aria-label="Welcome to THRONE"
      >
        <div
          class="glass-panel mx-3 mb-3 rounded-2xl border border-border-gold/60 p-5 shadow-[0_-18px_50px_-20px_rgba(0,0,0,0.9)]"
          style="padding-bottom: calc(1.25rem + env(safe-area-inset-bottom))"
        >
          <button
            class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border-gold/40 text-ink-muted transition-colors hover:border-gold hover:text-gold-bright"
            aria-label="Dismiss — just browse"
            @click="dismiss"
          >
            <AppIcon name="x" :size="14" />
          </button>

          <div class="flex items-center gap-3">
            <img src="/assets/images/crown-duke.png" alt="" class="h-9 w-auto drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]" />
            <div>
              <p class="font-display text-lg font-semibold tracking-[0.08em] text-gold-gradient">Welcome to THRONE</p>
              <p class="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-dim">Claim your seat at the table</p>
            </div>
          </div>

          <div class="mt-4 flex flex-col gap-2.5">
            <GoldButton variant="solid" size="md" block @click="act('register')">
              {{ joinCta }} <AppIcon name="arrowRight" :size="14" />
            </GoldButton>
            <GoldButton variant="outline" size="md" block @click="act('login')">Log In</GoldButton>
          </div>

          <button
            class="mt-3 w-full text-center font-sans text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-ink"
            @click="dismiss"
          >
            Just browsing
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ws-enter-active { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease; }
.ws-leave-active { transition: transform 0.3s ease, opacity 0.25s ease; }
.ws-enter-from,
.ws-leave-to { transform: translateY(110%); opacity: 0; }
</style>
