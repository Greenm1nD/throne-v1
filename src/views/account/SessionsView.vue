<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { sessions } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Security</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Session History</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ sessions.length }} total sessions — a record of every login to your account.</p>
    </div>

    <AccountPanel>
      <ul class="divide-y divide-white/5">
        <li v-for="s in sessions" :key="s.time" class="flex items-center gap-3.5 py-4">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AppIcon name="globe" :size="15" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">Successful login</p>
            <p class="font-sans text-[11px] tabular-nums text-ink-dim">{{ s.ip }} · {{ s.time }} · {{ s.ago }}</p>
          </div>
          <span class="rounded-full border border-border-gold px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-gold-bright">Verified</span>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
