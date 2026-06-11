<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { user } from '@/data/account'

const fields = [
  { label: 'First Name', value: user.firstName, icon: 'user' },
  { label: 'Last Name', value: user.lastName, icon: 'user' },
  { label: 'Email Address', value: user.email, icon: 'mail' },
  { label: 'Phone Number', value: user.phone, icon: 'chat' },
  { label: 'Country', value: user.country, icon: 'globe' },
  { label: 'Currency', value: user.currency, icon: 'vault' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">My Account</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Profile</h1>
    </div>

    <AccountPanel title="Royal Identity">
      <div class="mb-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div class="relative">
          <img :src="user.avatar" alt="" class="h-20 w-20 rounded-full border-2 border-border-gold object-cover shadow-gold-soft" />
          <img src="/assets/images/crown-duke.png" alt="" class="absolute -top-3 left-1/2 h-6 w-auto -translate-x-1/2" />
        </div>
        <div>
          <p class="font-display text-lg font-semibold tracking-[0.08em] text-ink">{{ user.name }}</p>
          <p class="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-bright">{{ user.tier }} · Member since {{ user.memberSince }}</p>
          <button class="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-ink-muted underline-offset-4 transition-colors hover:text-gold-bright hover:underline">
            Change portrait
          </button>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <label v-for="f in fields" :key="f.label" class="block">
          <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">{{ f.label }}</span>
          <span class="relative block">
            <AppIcon :name="f.icon" :size="15" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" />
            <input :value="f.value" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 pl-11 pr-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
          </span>
        </label>
      </div>

      <div class="mt-7 flex flex-wrap gap-3">
        <GoldButton variant="solid" size="md">Save Changes</GoldButton>
        <GoldButton variant="outline" size="md">Discard</GoldButton>
      </div>
    </AccountPanel>

    <AccountPanel title="Preferences">
      <ul class="divide-y divide-white/5">
        <li v-for="p in [
            { t: 'Royal correspondence', d: 'Exclusive offers and court announcements by email', on: true },
            { t: 'Ambient music', d: 'Throne hall soundtrack across the kingdom', on: true },
            { t: 'Discreet mode', d: 'Hide balances until hovered', on: false },
          ]" :key="p.t" class="flex items-center justify-between gap-4 py-4">
          <div>
            <p class="font-sans text-[13px] font-semibold text-ink">{{ p.t }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ p.d }}</p>
          </div>
          <label class="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" class="peer sr-only" :checked="p.on" />
            <span class="h-6 w-11 rounded-full border border-white/10 bg-black/50 transition-colors peer-checked:border-border-gold peer-checked:bg-gold/20" />
            <span class="absolute left-1 h-4 w-4 rounded-full bg-ink-dim transition-all peer-checked:left-6 peer-checked:bg-gold-bright" />
          </label>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
