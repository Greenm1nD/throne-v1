<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { user } from '@/data/account'

const services = [
  { icon: 'crown', t: 'Private Tables', d: 'Reserved live tables with elevated limits, arranged on request.' },
  { icon: 'gift', t: 'Bespoke Offers', d: 'Bonuses tailored to your play, not the public board.' },
  { icon: 'calendar', t: 'Court Events', d: 'Invitations to tournaments and gatherings of the Inner Circle.' },
  { icon: 'bolt', t: 'Instant Resolutions', d: 'Your requests bypass every queue in the kingdom.' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Support</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">VIP Concierge</h1>
    </div>

    <div class="group relative overflow-hidden rounded-2xl border border-border-gold shadow-card-glow">
      <div v-lazybg="`linear-gradient(90deg, rgba(5,5,5,0.94) 35%, rgba(5,5,5,0.4)), url('/assets/images/vip-lounge.webp'), url('/assets/images/vip-club.webp')`"
        class="absolute inset-0 bg-cover bg-center" />
      <div class="relative z-10 px-7 py-10 sm:px-10">
        <p class="eyebrow mb-2">At your service, {{ user.tier }} {{ user.name }}</p>
        <h2 class="font-display text-2xl font-bold tracking-[0.1em] text-gold-gradient">The Royal Concierge</h2>
        <p class="mt-3 max-w-xl font-sans text-[13px] leading-relaxed text-ink-muted">
          A dedicated host attends to your kingdom around the clock — from elevated limits to evenings arranged
          entirely in your honour. One word, and it is done.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <GoldButton variant="solid" size="md"><AppIcon name="headset" :size="15" /> Summon Concierge</GoldButton>
          <RouterLink to="/account/contact"><GoldButton variant="outline" size="md">Leave a Message</GoldButton></RouterLink>
        </div>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <AccountPanel v-for="s in services" :key="s.t">
        <div class="flex items-start gap-4">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/60 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AppIcon :name="s.icon" :size="17" />
          </span>
          <div>
            <p class="font-display text-[14px] font-semibold tracking-[0.1em] text-ink">{{ s.t }}</p>
            <p class="mt-1 font-sans text-[12px] leading-relaxed text-ink-dim">{{ s.d }}</p>
          </div>
        </div>
      </AccountPanel>
    </div>
  </div>
</template>
