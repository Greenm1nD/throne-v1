<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { statements } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Activity</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Statements</h1>
    </div>

    <AccountPanel title="Monthly Ledgers">
      <ul class="divide-y divide-white/5">
        <li v-for="s in statements" :key="s.period" class="flex items-center gap-4 py-4">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AppIcon name="calendar" :size="16" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ s.period }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ s.items }} entries · Net <span class="tabular-nums" :class="s.net.startsWith('+') ? 'text-gold-bright' : 'text-ink-muted'">{{ s.net }}</span></p>
          </div>
          <GoldButton variant="outline" size="sm">Download PDF</GoldButton>
        </li>
      </ul>
      <p class="mt-5 border-t border-white/5 pt-4 font-sans text-[11px] text-ink-dim">
        Ledgers are sealed monthly and retained for seven years, as the court records demand.
      </p>
    </AccountPanel>
  </div>
</template>
