<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'

/**
 * Step two of the login chain: a 6-digit royal seal. Static prototype —
 * any code passes; auth.login() fetches the demo user through the mock api.
 */
const { state, closeTwofa } = useAuthModal()
const { login, loading } = useAuth()
const router = useRouter()

const digits = ref<string[]>(['', '', '', '', '', ''])
const boxes = ref<HTMLInputElement[]>([])

watch(
  () => state.twofaOpen,
  async (open) => {
    if (!open) return
    digits.value = ['', '', '', '', '', '']
    await nextTick()
    boxes.value[0]?.focus()
  },
)

function onInput(i: number, e: Event) {
  const el = e.target as HTMLInputElement
  el.value = el.value.replace(/\D/g, '').slice(-1)
  digits.value[i] = el.value
  if (el.value && i < 5) boxes.value[i + 1]?.focus()
}

function onKeydown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) boxes.value[i - 1]?.focus()
  if (e.key === 'Escape') closeTwofa()
}

async function confirm() {
  await login()
  closeTwofa()
  router.push('/account')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="state.twofaOpen"
        class="fixed inset-0 z-[120] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Two-factor verification"
        @click.self="closeTwofa"
      >
        <div class="glass-panel w-full max-w-md rounded-2xl border border-border-gold p-8 shadow-card-glow motion-safe:animate-fadeUp">
          <div class="flex flex-col items-center text-center">
            <span class="grid h-14 w-14 place-items-center rounded-full border border-border-gold text-gold-bright" style="background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)">
              <AppIcon name="shield" :size="22" />
            </span>
            <p class="eyebrow mt-4">2FA Verification</p>
            <h2 class="mt-1 font-display text-lg font-semibold tracking-[0.1em] text-gold-gradient">
              Present the Royal Seal
            </h2>
            <p class="mt-2 font-sans text-[12px] text-ink-dim">Enter the 6-digit code from your authenticator.</p>
          </div>

          <div class="mt-6 flex justify-center gap-2.5">
            <input
              v-for="(d, i) in digits"
              :key="i"
              :ref="(el) => { if (el) boxes[i] = el as HTMLInputElement }"
              :value="d"
              inputmode="numeric"
              maxlength="1"
              autocomplete="one-time-code"
              class="h-13 w-11 rounded-lg border border-border-gold/60 bg-black/40 text-center font-display text-xl tabular-nums text-gold-bright focus:border-gold focus:outline-none"
              style="height: 52px"
              @input="onInput(i, $event)"
              @keydown="onKeydown(i, $event)"
            />
          </div>

          <label class="mt-5 flex items-center justify-center gap-2 font-sans text-[12px] text-ink-dim">
            <input type="checkbox" class="accent-[#D4AF37]" /> Trust this device
          </label>

          <GoldButton variant="solid" size="lg" block class="mt-5" :disabled="loading" @click="confirm">
            {{ loading ? 'Opening the gates…' : 'Enter the Kingdom' }}
          </GoldButton>
          <button class="mt-4 block w-full text-center font-sans text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-gold-bright" @click="closeTwofa">
            Didn't receive the code? <span class="text-champagne">Resend</span>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
