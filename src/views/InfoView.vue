<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useRevealEach } from '@/composables/useReveal'
import { infoPages } from '@/data/legal'

const route = useRoute()
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useRevealEach(root)

const page = computed(() => infoPages[(route.meta.info as string) ?? ''])

// Keep the document title in step with the page.
watch(
  page,
  (p) => {
    if (p) document.title = `${p.title} · THRONE`
  },
  { immediate: true },
)
</script>

<template>
  <main ref="root" class="container-royal py-16 sm:py-24">
    <template v-if="page">
      <header class="max-w-2xl">
        <p class="eyebrow mb-2">{{ page.eyebrow }}</p>
        <h1 class="font-display text-4xl font-bold tracking-[0.06em] text-gold-gradient sm:text-5xl">
          {{ page.title }}
        </h1>
        <p v-if="page.updated" class="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          {{ page.updated }}
        </p>
        <p class="mt-5 font-sans text-sm leading-relaxed text-ink-muted">{{ page.intro }}</p>
      </header>

      <div class="mt-10 max-w-2xl space-y-7">
        <section v-for="s in page.sections" :key="s.h" data-reveal>
          <h2 class="flex items-center gap-2 font-display text-base font-semibold uppercase tracking-[0.16em] text-champagne">
            <span class="h-1 w-1 rotate-45 bg-gold/60" /> {{ s.h }}
          </h2>
          <p class="mt-2 font-sans text-[13px] leading-relaxed text-ink-muted">{{ s.p }}</p>
        </section>
      </div>

      <!-- Responsible-gaming reassurance footer on the RG page -->
      <div
        v-if="page.slug === 'responsible-gaming'"
        class="mt-10 flex max-w-2xl flex-wrap items-center gap-4 rounded-2xl border border-border-gold/40 bg-gold/[0.04] px-6 py-5"
        data-reveal
      >
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-dim/60 font-sans text-[12px] font-bold text-ink-muted">18+</span>
        <p class="flex-1 font-sans text-[12px] leading-relaxed text-ink-muted">
          Set your limits or take a break any time from your account. Our concierge can connect you to
          confidential support, privately.
        </p>
        <GoldButton variant="outline" size="sm" @click="router.push('/account/limits')">Set Limits</GoldButton>
      </div>
    </template>

    <!-- Unknown slug -->
    <div v-else class="grid place-items-center gap-4 py-24 text-center">
      <h1 class="font-display text-2xl font-bold tracking-[0.1em] text-gold-gradient">Page Not Found</h1>
      <GoldButton variant="solid" size="md" @click="router.push('/')">Return to the Throne Room</GoldButton>
    </div>
  </main>
</template>
