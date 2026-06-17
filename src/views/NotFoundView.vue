<script setup lang="ts">
import { useRouter } from 'vue-router'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const router = useRouter()
</script>

<template>
  <section
    class="grain relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
  >
    <!-- Soft champagne aura -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-goldenPulse"
      style="background: radial-gradient(circle, rgba(245, 215, 122, 0.12), transparent 68%)"
    />

    <img
      src="/assets/images/crown-duke.png"
      alt=""
      class="relative h-14 w-auto drop-shadow-[0_6px_22px_rgba(212,175,55,0.45)]"
    />

    <h1
      class="relative mt-6 font-display text-7xl font-bold tracking-[0.12em] text-gold-gradient sm:text-8xl"
    >
      404
    </h1>
    <p class="relative mt-3 font-sans text-sm font-medium uppercase tracking-[0.4em] text-ink">
      This Chamber Does Not Exist
    </p>
    <p class="relative mt-4 max-w-md font-sans text-sm leading-relaxed text-ink-muted">
      The page you seek has left the kingdom — or never belonged to it. Let the
      guards escort you back to the throne room.
    </p>

    <div class="relative mt-9 flex flex-wrap items-center justify-center gap-4">
      <GoldButton variant="solid" size="lg" @click="router.push('/')">
        Return to the Throne Room <AppIcon name="arrowRight" :size="15" />
      </GoldButton>
      <GoldButton variant="outline" size="lg" @click="router.push('/casino')">
        Enter the Casino
      </GoldButton>
    </div>
  </section>
</template>
