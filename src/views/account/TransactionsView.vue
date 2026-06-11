<script setup lang="ts">
import { computed, ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AccGlyph from '@/components/account/AccGlyph.vue'
import { transactions } from '@/data/account'

const filter = ref<'All' | 'Deposit' | 'Withdraw' | 'Bonus'>('All')
const tabs = ['All', 'Deposit', 'Withdraw', 'Bonus'] as const
const rows = computed(() => (filter.value === 'All' ? transactions : transactions.filter((t) => t.type === filter.value)))
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Wallet</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Transactions</h1>
    </div>

    <AccountPanel>
      <template #action>
        <div class="flex gap-2">
          <button v-for="t in tabs" :key="t"
            class="rounded-full border px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
            :class="filter === t ? 'border-border-gold bg-gold/[0.08] text-gold-bright' : 'border-white/10 text-ink-muted hover:text-ink'"
            @click="filter = t">{{ t }}</button>
        </div>
      </template>

      <ul class="divide-y divide-white/5">
        <li v-for="t in rows" :key="t.date + t.amount" class="flex items-center gap-3.5 py-4">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AccGlyph :icon="t.icon" :size="15" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-[13px] font-semibold text-ink">{{ t.type }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ t.date }}</p>
          </div>
          <span class="hidden rounded-full border border-white/10 px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-ink-dim sm:block">{{ t.status }}</span>
          <p class="w-28 text-right font-sans text-[13px] font-bold tabular-nums" :class="t.positive ? 'text-gold-bright' : 'text-ink-muted'">{{ t.amount }}</p>
        </li>
      </ul>
      <p v-if="!rows.length" class="py-10 text-center font-sans text-[12px] text-ink-dim">No transactions in this category.</p>
    </AccountPanel>
  </div>
</template>
