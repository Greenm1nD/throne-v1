<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'

const steps = [
  { t: 'Identity Document', d: 'Passport or national ID — both sides', done: true },
  { t: 'Proof of Address', d: 'Utility bill or bank statement, issued within 3 months', done: true },
  { t: 'Payment Method', d: 'Card or wallet ownership confirmation', done: true },
  { t: 'Enhanced Due Diligence', d: 'Only requested for Crown-tier withdrawal limits', done: false },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">My Account</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Verification</h1>
    </div>

    <AccountPanel>
      <div class="mb-7 flex items-center gap-4 rounded-xl border border-border-gold/50 bg-gold/[0.04] p-5">
        <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-gold text-gold-bright">
          <AppIcon name="check" :size="20" />
        </span>
        <div>
          <p class="font-display text-[15px] font-semibold tracking-[0.1em] text-champagne">FULLY VERIFIED</p>
          <p class="font-sans text-[12px] text-ink-dim">Your identity is sealed by the court. Withdrawals are processed at Duke priority.</p>
        </div>
      </div>

      <ol class="space-y-3">
        <li v-for="(s, i) in steps" :key="s.t"
          class="flex items-center gap-4 rounded-xl border p-4"
          :class="s.done ? 'border-white/8 bg-black/30' : 'border-border-gold/40 bg-gold/[0.03]'">
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border font-sans text-[12px] font-bold"
            :class="s.done ? 'border-border-gold bg-gold-gradient text-[#1a1407]' : 'border-white/15 text-ink-dim'">
            <AppIcon v-if="s.done" name="check" :size="14" />
            <template v-else>{{ i + 1 }}</template>
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ s.t }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ s.d }}</p>
          </div>
          <span v-if="s.done" class="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-gold-bright">Approved</span>
          <GoldButton v-else variant="outline" size="sm">Upload</GoldButton>
        </li>
      </ol>
    </AccountPanel>
  </div>
</template>
