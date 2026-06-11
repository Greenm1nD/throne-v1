<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'

const channels = [
  { icon: 'chat', t: 'Live Chat', d: 'Average reply under 30 seconds', cta: 'Open Chat' },
  { icon: 'mail', t: 'Email', d: 'court@throne.club · within 2 hours', cta: 'Write Email' },
  { icon: 'headset', t: 'VIP Line', d: 'Duke tier and above, 24/7', cta: 'Request Call' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Support</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Contact Support</h1>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <AccountPanel v-for="c in channels" :key="c.t">
        <div class="flex flex-col items-start gap-3">
          <span class="grid h-11 w-11 place-items-center rounded-full border border-border-gold/60 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AppIcon :name="c.icon" :size="17" />
          </span>
          <div>
            <p class="font-display text-[14px] font-semibold tracking-[0.1em] text-ink">{{ c.t }}</p>
            <p class="mt-1 font-sans text-[11px] text-ink-dim">{{ c.d }}</p>
          </div>
          <GoldButton variant="outline" size="sm">{{ c.cta }}</GoldButton>
        </div>
      </AccountPanel>
    </div>

    <AccountPanel title="Send a Message">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Subject</span>
          <input placeholder="How may the court assist?" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
        </label>
        <label class="block">
          <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Category</span>
          <span class="relative block">
            <select class="h-12 w-full appearance-none rounded-lg border border-border-gold/60 bg-black/40 px-4 pr-9 text-sm text-ink-muted focus:border-gold focus:outline-none">
              <option disabled selected>Choose a category</option>
              <option>Wallet & Payments</option>
              <option>Bonuses & Rewards</option>
              <option>Account & Verification</option>
              <option>Other</option>
            </select>
            <AppIcon name="chevronDown" :size="15" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          </span>
        </label>
      </div>
      <label class="mt-4 block">
        <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Message</span>
        <textarea rows="5" placeholder="Describe your request in detail…"
          class="w-full rounded-lg border border-border-gold/60 bg-black/40 p-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
      </label>
      <GoldButton variant="solid" size="md" class="mt-5">Dispatch to the Court</GoldButton>
    </AccountPanel>
  </div>
</template>
