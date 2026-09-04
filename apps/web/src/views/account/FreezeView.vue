<script setup lang="ts">
import { ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'

const days = ref(7)
const options = [1, 3, 7, 14, 30]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Responsible Gaming</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Account Freeze</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Seal the gates for a while — your account, balances and history stay safe until you return.</p>
    </div>

    <AccountPanel title="Freeze My Account">
      <div v-glow class="flex items-start gap-4 rounded-xl border border-border-gold/30 bg-black/30 p-5">
        <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-gold/60 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
          <AppIcon name="shield" :size="19" />
        </span>
        <div class="flex-1">
          <p class="font-sans text-[13px] font-semibold text-ink">Choose how long the kingdom rests</p>
          <p class="mt-1 font-sans text-[12px] leading-relaxed text-ink-dim">
            While frozen you cannot log in, wager or deposit. The freeze lifts automatically when the period ends.
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <button v-for="d in options" :key="d"
              class="rounded-full border px-5 py-2 font-sans text-[12px] font-semibold tabular-nums transition-colors"
              :class="days === d ? 'border-border-gold bg-gold/[0.08] text-gold-bright' : 'border-border-gold/30 text-ink-muted hover:text-ink'"
              @click="days = d">
              {{ d }} {{ d === 1 ? 'day' : 'days' }}
            </button>
          </div>
          <GoldButton variant="solid" size="md" class="mt-5">Freeze for {{ days }} {{ days === 1 ? 'day' : 'days' }}</GoldButton>
        </div>
      </div>
    </AccountPanel>
  </div>
</template>
