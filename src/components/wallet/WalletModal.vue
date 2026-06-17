<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { DEPOSIT, WITHDRAW, WITHDRAW_BANKS, balances, type PayMethod } from '@/data/account'
import { useWalletModal } from '@/composables/useWalletModal'
import { useDiscreet } from '@/composables/useDiscreet'

const { state, close, setKind } = useWalletModal()
const { mask } = useDiscreet()

const isDeposit = computed(() => state.kind === 'deposit')
const methods = computed<PayMethod[]>(() => (isDeposit.value ? DEPOSIT : WITHDRAW))

const methodName = ref('')
const selected = computed(() => methods.value.find((m) => m.name === methodName.value) ?? methods.value[0])

// Reset the chosen method to the first available whenever the modal opens or
// the deposit/withdraw mode flips.
watch(
  () => [state.open, state.kind],
  () => {
    if (state.open) methodName.value = methods.value[0]?.name ?? ''
  },
  { immediate: true },
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && state.open) close()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="state.open"
        class="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        :aria-label="isDeposit ? 'Deposit' : 'Withdraw'"
        @mousedown.self="close"
      >
        <div
          class="grain relative my-6 w-full max-w-md overflow-hidden rounded-2xl border border-border-gold bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] motion-safe:animate-fadeUp"
        >
          <!-- Close -->
          <button
            class="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/5 hover:text-gold-bright"
            aria-label="Close"
            @click="close"
          >
            <AppIcon name="x" :size="18" />
          </button>

          <div class="px-6 py-7 sm:px-8">
            <!-- Brand -->
            <div class="flex flex-col items-center text-center">
              <img src="/assets/images/crown-duke.png" alt="" class="h-7 w-auto drop-shadow-[0_3px_12px_rgba(212,175,55,0.45)]" />
              <h2 class="mt-2 font-display text-xl font-bold tracking-[0.14em] text-gold-gradient">The Treasury</h2>
            </div>

            <!-- Deposit / Withdraw toggle -->
            <div class="mt-5 grid grid-cols-2 gap-1 rounded-full border border-border-gold/50 bg-black/40 p-1">
              <button
                type="button"
                class="rounded-full py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors"
                :class="isDeposit ? 'bg-gold-gradient text-bg' : 'text-ink-muted hover:text-ink'"
                @click="setKind('deposit')"
              >
                Deposit
              </button>
              <button
                type="button"
                class="rounded-full py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors"
                :class="!isDeposit ? 'bg-gold-gradient text-bg' : 'text-ink-muted hover:text-ink'"
                @click="setKind('withdraw')"
              >
                Withdraw
              </button>
            </div>

            <!-- Available balance -->
            <p class="mt-5 flex items-center justify-between rounded-xl border border-border-gold/30 bg-black/30 px-4 py-3">
              <span class="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-dim">Available</span>
              <span class="font-display text-base font-bold tabular-nums text-gold-gradient">{{ mask(balances.main) }}</span>
            </p>

            <form class="mt-5 flex flex-col gap-4" @submit.prevent>
              <!-- Method -->
              <label class="block">
                <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">
                  {{ isDeposit ? 'Method' : 'Destination' }}
                </span>
                <span class="relative block">
                  <AppIcon
                    v-if="selected"
                    :name="selected.icon"
                    :size="16"
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70"
                  />
                  <select
                    v-model="methodName"
                    class="h-12 w-full appearance-none rounded-lg border border-border-gold/60 bg-black/40 pl-11 pr-9 text-sm text-ink focus:border-gold focus:outline-none"
                  >
                    <option v-for="m in methods" :key="m.name" :value="m.name">{{ m.name }}</option>
                  </select>
                  <AppIcon name="chevronDown" :size="15" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                </span>
              </label>

              <!-- Withdraw extras -->
              <template v-if="!isDeposit">
                <label class="block">
                  <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Bank</span>
                  <span class="relative block">
                    <select class="h-12 w-full appearance-none rounded-lg border border-border-gold/60 bg-black/40 px-4 pr-9 text-sm text-ink-muted focus:border-gold focus:outline-none">
                      <option v-for="b in WITHDRAW_BANKS" :key="b">{{ b }}</option>
                    </select>
                    <AppIcon name="chevronDown" :size="15" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                  </span>
                </label>
                <label class="block">
                  <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">IBAN</span>
                  <input placeholder="GB00 XXXX 0000 0000 0000 00" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm tabular-nums text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
                </label>
              </template>

              <!-- Amount -->
              <label class="block">
                <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Amount</span>
                <input
                  :placeholder="selected ? `${selected.min} – ${selected.max}` : '0.00'"
                  inputmode="decimal"
                  class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm tabular-nums text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none"
                />
              </label>

              <GoldButton variant="solid" size="lg" block>{{ isDeposit ? 'Deposit' : 'Withdraw' }}</GoldButton>
            </form>

            <p class="mt-4 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              {{ isDeposit ? 'Sealed by 256-bit encryption' : 'Bonus funds are not withdrawable' }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
