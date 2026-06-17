<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Live 3D model rendered via <model-viewer> (lazy-loaded), wrapped in a
 * champagne glow + sparkle layer so it reads as luxe metal. Falls back to the
 * static PNG for reduced-motion users and until the model loads.
 *
 * Motion:
 *  - default: continuous turntable spin + horizontal drag (vertical locked).
 *  - sway: no full spin — gently oscillates ±swayDeg left↔right on a loop
 *    (driven per-frame so it never goes edge-on); used for the auth badge.
 */
const props = withDefaults(
  defineProps<{
    src: string
    poster: string
    size?: number
    sway?: boolean
    swayDeg?: number
    swaySeconds?: number
    /** Yaw angle (deg) the sway oscillates around — i.e. the front-facing view. */
    centerDeg?: number
    /** Camera distance as % of auto-framing (higher = more padding, avoids edge clipping). */
    radius?: number
    /** Turntable speed (deg/sec) when not in sway mode. */
    spinDeg?: number
  }>(),
  { size: 160, sway: false, swayDeg: 30, swaySeconds: 7, centerDeg: 0, radius: 110, spinDeg: 20 },
)

const ready = ref(false)
const mv = ref<HTMLElement | null>(null)
let raf = 0
let start = 0

function onLoad() {
  if (!props.sway || !mv.value) return
  const el = mv.value as HTMLElement & { cameraOrbit?: string }
  start = performance.now()
  const loop = (now: number) => {
    const t = (now - start) / 1000
    const theta = props.centerDeg + props.swayDeg * Math.sin((2 * Math.PI * t) / props.swaySeconds)
    el.cameraOrbit = `${theta.toFixed(2)}deg 80deg ${props.radius}%`
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
}

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  await import('@google/model-viewer')
  ready.value = true
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="crown3d mx-auto" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- Breathing champagne aura behind the crown -->
    <span class="crown3d__glow" aria-hidden="true" />

    <!-- Twinkling sparkles -->
    <span class="crown3d__spark" style="top: 16%; left: 22%; animation-delay: 0s" aria-hidden="true" />
    <span class="crown3d__spark" style="top: 30%; right: 16%; animation-delay: 1.1s" aria-hidden="true" />
    <span class="crown3d__spark" style="bottom: 26%; left: 30%; animation-delay: 2.3s" aria-hidden="true" />
    <span class="crown3d__spark" style="top: 50%; right: 26%; animation-delay: 3.1s" aria-hidden="true" />

    <model-viewer
      v-if="ready"
      ref="mv"
      class="crown3d__mv"
      :src="src"
      loading="eager"
      reveal="auto"
      :camera-controls="sway ? null : true"
      disable-zoom
      disable-pan
      :auto-rotate="sway ? null : true"
      auto-rotate-delay="0"
      :rotation-per-second="`${spinDeg}deg`"
      interaction-prompt="none"
      :camera-orbit="`${centerDeg}deg 80deg ${radius}%`"
      min-camera-orbit="auto 80deg auto"
      max-camera-orbit="auto 80deg auto"
      shadow-intensity="0"
      exposure="1.35"
      tone-mapping="aces"
      environment-image="neutral"
      field-of-view="28deg"
      @load="onLoad"
    />
    <img
      v-else
      :src="poster"
      alt=""
      class="crown3d__poster"
    />
  </div>
</template>

<style scoped>
.crown3d {
  position: relative;
}

.crown3d__glow {
  position: absolute;
  inset: -18%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle, rgba(245, 215, 122, 0.3), rgba(245, 215, 122, 0.07) 45%, transparent 68%);
  filter: blur(4px);
  animation: crown-pulse 4.5s ease-in-out infinite;
}

.crown3d__mv {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: transparent;
  /* gold halo around the rendered silhouette */
  filter: drop-shadow(0 0 14px rgba(245, 215, 122, 0.45)) drop-shadow(0 6px 18px rgba(0, 0, 0, 0.6));
  --poster-color: transparent;
}

.crown3d__poster {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 16px rgba(212, 175, 55, 0.5));
}

.crown3d__spark {
  position: absolute;
  z-index: 2;
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: radial-gradient(circle, #fff6df, rgba(245, 215, 122, 0.9) 40%, transparent 70%);
  box-shadow: 0 0 6px rgba(245, 215, 122, 0.9);
  opacity: 0;
  pointer-events: none;
  animation: crown-twinkle 4s ease-in-out infinite;
}

@keyframes crown-pulse {
  0%, 100% { opacity: 0.55; transform: scale(0.96); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes crown-twinkle {
  0%, 100% { opacity: 0; transform: scale(0.4); }
  12% { opacity: 1; transform: scale(1.1); }
  24% { opacity: 0; transform: scale(0.5); }
}

@media (prefers-reduced-motion: reduce) {
  .crown3d__glow,
  .crown3d__spark {
    animation: none;
  }
}
</style>
