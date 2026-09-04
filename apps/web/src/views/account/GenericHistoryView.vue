<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AccountPanel from '@/components/account/AccountPanel.vue'
import HistoryFilter from '@/components/account/HistoryFilter.vue'
import HistoryRows from '@/components/account/HistoryRows.vue'
import StatCard from '@/components/account/StatCard.vue'
import { genericHistories, type HistoryRow } from '@/data/account'
import { api } from '@/services/api'

/**
 * One panel, many sections: Free Spins, Bonuses, Financial History,
 * Account Activity and Transfers all render through this view, configured
 * by `route.meta.gen` → genericHistories[key].
 */
const route = useRoute()
const cfg = computed(() => genericHistories[route.meta.gen as string])

const filter = ref('All')
const rows = ref<HistoryRow[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  filter.value = 'All'
  rows.value = await api.getList(cfg.value.rows)
  loading.value = false
}
onMounted(load)
watch(() => route.meta.gen, load)

const visible = computed(() =>
  filter.value === 'All' ? rows.value : rows.value.filter((r) => r.tag === filter.value),
)
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">{{ cfg.filter === 'status' ? 'History' : 'Transactions' }}</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">{{ cfg.title }}</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">{{ cfg.desc }}</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2" :class="cfg.tiles.length > 3 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'">
      <StatCard v-for="t in cfg.tiles" :key="t.label" :label="t.label" :value="t.value" :icon="t.icon" :font="t.font" :tone="t.tone" />
    </div>

    <HistoryFilter
      :key="String(route.meta.gen)"
      v-model="filter"
      :type-label="cfg.filter === 'status' ? 'Status' : 'Type'"
      :options="cfg.filter === 'none' ? undefined : cfg.filterOptions"
    />

    <AccountPanel>
      <HistoryRows :rows="visible" :loading="loading" />
    </AccountPanel>
  </div>
</template>
