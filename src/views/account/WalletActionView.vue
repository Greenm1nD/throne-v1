<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { DEPOSIT, WITHDRAW, WITHDRAW_BANKS, balances, type PayMethod } from '@/data/account'

/**
 * Deposit and Withdraw share this panel — `route.meta.kind` flips the copy,
 * the method list and the inline form (withdraw adds bank + IBAN).
 */
const route = useRoute()
const kind = computed(() => (route.meta.kind as 'deposit' | 'withdraw') ?? 'deposit')
const isDeposit = computed(() => kind.value === 'deposit')

const methods = computed<PayMethod[]>(() => (isDeposit.value ? DEPOSIT : WITHDRAW))

const CATS = computed(() =>
  isDeposit.value
    ? ([['All', 'all'], ['Fast Bank', 'bank'], ['Crypto', 'crypto'], ['Credit Card', 'card']] as const)
    : ([['All', 'all'], ['Fast Bank', 'bank'], ['Crypto', 'crypto']] as const),
)

const cat = ref<'all' | 'bank' | 'crypto' | 'card'>('all')
const openName = ref<string | null>(null)
watch([kind, cat], () => (openName.value = null))

const visible = computed(() => (cat.value === 'all' ? methods.value : methods.value.filter((m) => m.cat === cat.value)))
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Wallet</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">
        {{ isDeposit ? 'Deposit' : 'Withdraw' }}
      </h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">
        {{ isDeposit ? 'Replenish the treasury — funds arrive under royal escort.' : 'Cash out with Duke-tier priority — typically under 2 hours.' }}
      </p>
    </div>

    <p v-if="!isDeposit" class="flex items-center justify-between rounded-xl border border-white/8 bg-black/30 px-5 py-3.5">
      <span class="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-dim">Available</span>
      <span class="font-display text-base font-bold tabular-nums text-gold-gradient">{{ balances.main }}</span>
    </p>

    <AccountPanel :title="isDeposit ? 'Choose Method' : 'Destination'">
      <template #action>
        <div class="flex flex-wrap gap-2">
          <button v-for="[label, key] in CATS" :key="key"
            class="rounded-full border px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
            :class="cat === key ? 'border-border-gold bg-gold/[0.08] text-gold-bright' : 'border-white/10 text-ink-muted hover:text-ink'"
            @click="cat = key">{{ label }}</button>
        </div>
      </template>

      <ul class="space-y-3">
        <li v-for="m in visible" :key="m.name" class="rounded-xl border transition-colors"
          :class="openName === m.name ? 'border-gold bg-gold/[0.04]' : 'border-white/8 bg-black/30 hover:border-border-gold/70'">
          <button class="flex w-full flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 text-left" @click="openName = openName === m.name ? null : m.name">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
              <AppIcon :name="m.icon" :size="16" />
            </span>
            <span class="min-w-[140px] flex-1 font-sans text-[13px] font-semibold text-ink">{{ m.name }}</span>
            <span class="font-sans text-[11px] text-ink-dim">Time <span class="text-ink-muted">{{ m.time }}</span></span>
            <span class="font-sans text-[11px] tabular-nums text-ink-dim">Min <span class="text-ink-muted">{{ m.min }}</span></span>
            <span class="font-sans text-[11px] tabular-nums text-ink-dim">Max <span class="text-ink-muted">{{ m.max }}</span></span>
            <span class="rounded-full border border-border-gold px-3.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-champagne">
              {{ openName === m.name ? 'Hide' : 'Details' }}
            </span>
          </button>

          <form v-if="openName === m.name" class="grid gap-4 border-t border-white/8 px-5 py-5 sm:grid-cols-2" @submit.prevent>
            <label v-if="!isDeposit" class="block">
              <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Select bank</span>
              <span class="relative block">
                <select class="h-12 w-full appearance-none rounded-lg border border-border-gold/60 bg-black/40 px-4 pr-9 text-sm text-ink-muted focus:border-gold focus:outline-none">
                  <option v-for="b in WITHDRAW_BANKS" :key="b">{{ b }}</option>
                </select>
                <AppIcon name="chevronDown" :size="15" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
              </span>
            </label>
            <label v-if="!isDeposit" class="block">
              <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">IBAN</span>
              <input placeholder="GB00 XXXX 0000 0000 0000 00" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm tabular-nums text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
            </label>
            <label class="block">
              <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Amount</span>
              <input :placeholder="`${m.min} – ${m.max}`" inputmode="decimal" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm tabular-nums text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
            </label>
            <label class="block">
              <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Description <span class="normal-case text-ink-dim">(optional)</span></span>
              <input placeholder="A note for the ledger…" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
            </label>
            <div class="sm:col-span-2">
              <GoldButton variant="solid" size="md">{{ isDeposit ? 'Deposit' : 'Withdraw' }}</GoldButton>
            </div>
          </form>
        </li>
      </ul>
      <p class="mt-5 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">
        {{ isDeposit ? 'Sealed by 256-bit encryption' : 'Bonus funds are not withdrawable' }}
      </p>
    </AccountPanel>
  </div>
</template>
