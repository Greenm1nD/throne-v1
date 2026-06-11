<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { verificationStatus } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">My Account</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Verification</h1>
    </div>

    <AccountPanel title="Verification Status">
      <p class="mb-5 font-sans text-[12px] text-ink-dim">The channels confirmed on your account.</p>
      <ul class="space-y-3">
        <li v-glow v-for="v in verificationStatus" :key="v.channel"
          class="flex items-center gap-4 rounded-xl border border-border-gold/30 bg-black/30 p-4">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/40 text-ink-dim">
            <AppIcon name="shield" :size="16" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ v.channel }}</p>
            <p class="font-sans text-[11px] tabular-nums text-ink-dim">{{ v.detail }}</p>
          </div>
          <span class="rounded-full border border-border-gold/40 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-ink-dim">{{ v.state }}</span>
        </li>
      </ul>
    </AccountPanel>

    <AccountPanel title="Documents (KYC)">
      <p class="mb-5 font-sans text-[12px] text-ink-dim">Upload your documents — the court reviews each within 24 hours.</p>
      <ul class="space-y-3">
        <li v-glow v-for="doc in [
            { name: 'Passport / National ID', sub: 'Both sides, all corners visible', state: 'Pending', tone: 'wait' },
            { name: 'Proof of Address', sub: 'Utility bill or bank statement, under 3 months old', state: 'Rejected', tone: 'bad', note: 'Scan was blurry — please re-upload.' },
            { name: 'Payment Method', sub: 'Card or wallet ownership confirmation', state: 'Not Uploaded', tone: 'none' },
          ]" :key="doc.name"
          class="flex flex-wrap items-center gap-4 rounded-xl border border-border-gold/30 bg-black/30 p-4">
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ doc.name }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ doc.sub }}</p>
            <p v-if="doc.note" class="mt-1 font-sans text-[11px] text-champagne">{{ doc.note }}</p>
          </div>
          <span class="rounded-full border px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em]"
            :class="doc.tone === 'wait' ? 'border-champagne/40 text-champagne' : 'border-border-gold/40 text-ink-dim'">
            {{ doc.state }}
          </span>
          <GoldButton variant="outline" size="sm">{{ doc.tone === 'none' ? 'Upload' : 'Re-upload' }}</GoldButton>
        </li>
      </ul>
    </AccountPanel>

    <AccountPanel title="SMS Verification">
      <p class="mb-1 font-sans text-[13px] font-semibold text-ink">Phone not verified</p>
      <p class="mb-5 font-sans text-[12px] text-ink-dim">Please verify your mobile number — we'll send a code to your phone.</p>
      <div class="grid gap-4 sm:grid-cols-[1fr_1.4fr_auto]">
        <label class="block">
          <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Country</span>
          <span class="relative block">
            <select class="h-12 w-full appearance-none rounded-lg border border-border-gold/60 bg-black/40 px-4 pr-9 text-sm text-ink-muted focus:border-gold focus:outline-none">
              <option selected>United Kingdom (+44)</option>
              <option>Germany (+49)</option>
              <option>Canada (+1)</option>
            </select>
            <AppIcon name="chevronDown" :size="15" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          </span>
        </label>
        <label class="block">
          <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Phone</span>
          <input placeholder="*** *** 4567" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
        </label>
        <div class="flex items-end">
          <GoldButton variant="solid" size="md">Send Code</GoldButton>
        </div>
      </div>
    </AccountPanel>
  </div>
</template>
