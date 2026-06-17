<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GoldButton from '@/components/ui/GoldButton.vue'

/**
 * One-time 18+ gate. Required for a gambling brand, and doubles as a premium
 * "you are being admitted" ceremony. The choice persists in localStorage.
 */
const STORAGE = 'throne.age-ok'
const open = ref(false)
const denied = ref(false)

onMounted(() => {
  if (localStorage.getItem(STORAGE) !== '1') {
    open.value = true
    document.documentElement.style.overflow = 'hidden'
  }
})

function enter() {
  localStorage.setItem(STORAGE, '1')
  open.value = false
  document.documentElement.style.overflow = ''
}
function decline() {
  denied.value = true
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-400"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[300] grid place-items-center overflow-y-auto bg-black/92 p-5 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Age verification"
      >
        <div
          class="glass-panel w-full max-w-md rounded-2xl border border-border-gold p-8 text-center shadow-card-glow motion-safe:animate-fadeUp sm:p-10"
        >
          <img
            src="/assets/images/crown-duke.png"
            alt=""
            class="mx-auto h-12 w-auto drop-shadow-[0_4px_16px_rgba(212,175,55,0.5)]"
          />
          <h2 class="mt-4 font-display text-2xl font-bold tracking-[0.18em] text-gold-gradient">
            THRONE
          </h2>
          <p class="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.45em] text-ink-muted">
            Built for the Crowned
          </p>

          <template v-if="!denied">
            <p class="mt-7 font-sans text-sm leading-relaxed text-ink-muted">
              The kingdom admits adults only. Please confirm you are
              <span class="font-semibold text-champagne">18 years or older</span> to enter.
            </p>
            <div class="mt-8 flex flex-col gap-3">
              <GoldButton variant="solid" size="lg" block @click="enter">
                I am 18 or older — Enter
              </GoldButton>
              <button
                class="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-dim transition-colors hover:text-gold-bright"
                @click="decline"
              >
                I am under 18
              </button>
            </div>
            <p class="mt-7 font-sans text-[10px] leading-relaxed text-ink-dim">
              Play responsibly. Gambling can be addictive.
            </p>
          </template>

          <template v-else>
            <p class="mt-7 font-sans text-sm leading-relaxed text-ink-muted">
              We're sorry — you must be at least 18 to enter THRONE. The gates
              will await your coming of age.
            </p>
            <p class="mt-8 font-display text-base font-semibold uppercase tracking-[0.2em] text-champagne">
              Until then, farewell.
            </p>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
