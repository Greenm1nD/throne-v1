<script setup lang="ts">
import { ref } from 'vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { gameImage, type Game } from '@/data/games'
import { assets } from '@/data/assets'

const props = defineProps<{ game: Game }>()
const img = gameImage(props.game)
const hoverVideo = props.game.hoverVideo ? assets[props.game.hoverVideo] : null

const video = ref<HTMLVideoElement | null>(null)
const fav = ref(false)

function play() {
  video.value?.play().catch(() => {})
}
function stop() {
  const v = video.value
  if (v) {
    v.pause()
    v.currentTime = 0
  }
}
</script>

<template>
  <article
    class="card-lux group flex h-[290px] flex-col overflow-hidden"
    data-reveal
    @mouseenter="play"
    @mouseleave="stop"
  >
    <!-- Title block, centered at the top of the card -->
    <div class="relative z-20 px-3 pb-2 pt-6 text-center">
      <h3 class="font-display text-xl font-semibold tracking-[0.12em] text-gold-gradient">
        {{ game.name }}
      </h3>
      <p class="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {{ game.category }}
      </p>
    </div>

    <!-- Favorite star (brightens on hover) -->
    <button
      type="button"
      class="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/50 backdrop-blur transition-all duration-300 hover:border-gold"
      :class="fav ? 'text-gold-bright opacity-100' : 'text-ink-muted opacity-0 group-hover:opacity-100'"
      :aria-pressed="fav"
      :aria-label="`Favorite ${game.name}`"
      @click="fav = !fav"
    >
      <AppIcon name="star" :size="15" />
    </button>

    <!-- Media fills the remaining card area -->
    <div class="relative flex-1 overflow-hidden">
      <!-- Static image (default) -->
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        :style="{ backgroundImage: `url('${img.src}')`, backgroundColor: '#0d0d10' }"
      />

      <!-- Hover video: fades in and plays on hover -->
      <video
        v-if="hoverVideo"
        ref="video"
        class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        :poster="img.src"
        muted
        loop
        playsinline
        preload="none"
        aria-hidden="true"
      >
        <source :src="hoverVideo.src" type="video/mp4" />
      </video>

      <!-- Gradient scrim -->
      <div
        class="pointer-events-none absolute inset-0"
        style="
          background: linear-gradient(
            180deg,
            rgba(17, 17, 19, 0.55),
            rgba(5, 5, 5, 0.1) 38%,
            rgba(5, 5, 5, 0.78)
          );
        "
      />

      <!-- Reflection sweep on hover -->
      <span
        class="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-0 group-hover:opacity-100"
        style="
          background: linear-gradient(100deg, transparent, rgba(245, 215, 122, 0.28), transparent);
          animation: lightSweep 1.4s ease-out;
        "
      />

      <!-- Play Now appears on hover -->
      <div
        class="absolute inset-x-0 bottom-4 z-20 flex translate-y-2 justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <GoldButton variant="solid" size="sm">
          <AppIcon name="play" :size="12" /> Play Now
        </GoldButton>
      </div>
    </div>
  </article>
</template>
