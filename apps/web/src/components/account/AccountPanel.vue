<script setup lang="ts">
/** Dashboard card shell: smoked glass, gold hairline, optional header row. */
defineProps<{ title?: string; eyebrow?: string }>()
</script>

<template>
  <section class="card-lux p-6 hover:translate-y-0 sm:p-7">
    <header v-if="title || $slots.action" class="mb-5 flex items-center justify-between gap-4">
      <div>
        <p v-if="eyebrow" class="eyebrow mb-1">{{ eyebrow }}</p>
        <h2 v-if="title" class="font-display text-base font-semibold uppercase tracking-[0.18em] text-gold-gradient">
          {{ title }}
        </h2>
      </div>
      <slot name="action" />
    </header>
    <slot />
  </section>
</template>
