<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { bonuses } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Rewards</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Bonuses</h1>
    </div>

    <AccountPanel>
      <ul class="space-y-4">
        <li v-for="b in bonuses" :key="b.name" class="rounded-xl border border-white/8 bg-black/30 p-5 transition-colors hover:border-border-gold/70">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div class="flex items-center gap-2.5">
                <p class="font-display text-[14px] font-semibold tracking-[0.08em] text-ink">{{ b.name }}</p>
                <span class="rounded-full border px-2.5 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.16em]"
                  :class="b.status === 'Active' ? 'border-border-gold text-gold-bright' : b.status === 'Completed' ? 'border-white/15 text-ink-dim' : 'border-white/10 text-ink-dim'">
                  {{ b.status }}
                </span>
              </div>
              <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ b.desc }}</p>
            </div>
            <GoldButton v-if="b.status === 'Active'" variant="outline" size="sm">Details</GoldButton>
          </div>
          <div class="mt-4">
            <div class="mb-1 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">
              <span>Wagering progress</span><span class="tabular-nums">{{ b.progress }}%</span>
            </div>
            <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div class="h-full rounded-full bg-gold-gradient" :style="{ width: `${b.progress}%` }" />
            </div>
          </div>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
