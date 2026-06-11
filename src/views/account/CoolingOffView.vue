<script setup lang="ts">
import { ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import GoldButton from '@/components/ui/GoldButton.vue'

const picked = ref('7 days')
const presets = [
  { label: '24 hours', desc: 'A short breath between sessions' },
  { label: '7 days', desc: 'A week away from the tables' },
  { label: '30 days', desc: 'A full month of quiet' },
  { label: '6 months', desc: 'An extended leave from the court' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Responsible Gaming</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Cooling-off</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Step back from wagering for a set period — deposits and bets pause, everything else stays open.</p>
    </div>

    <AccountPanel title="Choose a Period">
      <div class="grid gap-3 sm:grid-cols-2">
        <button v-for="p in presets" :key="p.label"
          class="rounded-xl border p-5 text-left transition-all duration-300"
          :class="picked === p.label ? 'border-gold bg-gold/[0.07] shadow-gold-soft' : 'border-white/8 bg-black/30 hover:border-border-gold'"
          @click="picked = p.label">
          <p class="font-display text-[15px] font-semibold tracking-[0.08em]" :class="picked === p.label ? 'text-gold-gradient' : 'text-ink'">{{ p.label }}</p>
          <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ p.desc }}</p>
        </button>
      </div>
      <p class="mt-5 font-sans text-[12px] leading-relaxed text-ink-dim">
        During cooling-off you may still log in, view history and withdraw — but wagering and deposits are sealed. The period cannot be shortened once it begins.
      </p>
      <GoldButton variant="solid" size="md" class="mt-5">Begin {{ picked }} cooling-off</GoldButton>
    </AccountPanel>
  </div>
</template>
