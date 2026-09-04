<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import ProgressionWidget from '@/components/progression/ProgressionWidget.vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Rewards</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Rank &amp; Tribute</h1>
    </div>

    <AccountPanel>
      <ProgressionWidget placement="Page" />
    </AccountPanel>
  </div>
</template>
