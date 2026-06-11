<script setup lang="ts">
import { royalTreasures } from '@/data/rewards'
</script>

<template>
  <div
    class="card-lux h-full bg-cover bg-center p-7 hover:translate-y-0 hover:shadow-card-glow sm:p-8"
    style="background-image: linear-gradient(180deg, rgba(13,13,16,0.82), rgba(8,8,10,0.9)), url('/assets/images/texture-marble.webp')"
    data-reveal
  >
    <h3 class="font-display text-xl font-semibold tracking-[0.14em] text-gold-gradient">
      Royal Treasures
    </h3>

    <div class="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
      <article
        v-for="r in royalTreasures"
        :key="r.title"
        class="group/reward flex flex-col items-center gap-3 rounded-xl border border-transparent p-2 text-center transition-all duration-300 hover:-translate-y-1 hover:border-border-gold hover:bg-gold/[0.04]"
      >
        <img
          :src="r.image"
          :alt="r.title"
          loading="lazy"
          decoding="async"
          class="h-14 w-14 object-contain drop-shadow-[0_4px_14px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover/reward:scale-110"
        />
        <div>
          <h4
            class="font-sans text-[11px] font-semibold uppercase leading-tight tracking-[0.16em] text-ink-muted transition-colors group-hover/reward:text-gold-bright"
          >
            {{ r.title }}
          </h4>
          <p class="mt-1.5 font-sans text-[10px] leading-snug text-ink-dim">
            {{ r.description }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
