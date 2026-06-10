<script setup lang="ts">
import { reactive } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import CrownBadge from '@/components/ui/CrownBadge.vue'
import { useAuthModal } from '@/composables/useAuthModal'
import { assets } from '@/data/assets'

const { state, close, setMode } = useAuthModal()

// Per-field password reveal toggles (keyed by field id).
const reveal = reactive<Record<string, boolean>>({})

interface Field {
  id: string
  icon: string
  placeholder: string
  type?: string
  password?: boolean
  select?: boolean
}

const registerFields: Field[] = [
  { id: 'fullName', icon: 'user', placeholder: 'Full Name' },
  { id: 'country', icon: 'globe', placeholder: 'Select Country', select: true },
  { id: 'email', icon: 'mail', placeholder: 'Email Address', type: 'email' },
  { id: 'dob', icon: 'calendar', placeholder: 'Date of Birth' },
  { id: 'password', icon: 'lock', placeholder: 'Password', password: true },
  { id: 'username', icon: 'user', placeholder: 'Username' },
  { id: 'confirm', icon: 'lock', placeholder: 'Confirm Password', password: true },
  { id: 'referral', icon: 'gift', placeholder: 'Referral Code (Optional)' },
]

const loginFields: Field[] = [
  { id: 'loginEmail', icon: 'user', placeholder: 'Your Email', type: 'email' },
  { id: 'loginPassword', icon: 'lock', placeholder: 'Your Password', password: true },
]

const socials = [
  { label: 'Google', icon: 'google' },
  { label: 'Apple', icon: 'apple' },
  { label: 'Telegram', icon: 'telegram' },
]

const benefits = {
  register: [
    { icon: 'shield', title: 'Royal Security', sub: 'Your data is protected' },
    { icon: 'key', title: 'Instant Access', sub: 'Join in seconds' },
    { icon: 'crown', title: 'Exclusive Benefits', sub: 'VIP rewards & bonuses' },
    { icon: 'headset', title: '24/7 Support', sub: 'We are here for you' },
  ],
  login: [
    { icon: 'star', title: 'Royal Experience', sub: 'Premium gaming' },
    { icon: 'gift', title: 'VIP Rewards', sub: 'Exclusive benefits' },
    { icon: 'user', title: 'Elite Community', sub: 'Members only' },
    { icon: 'crown', title: 'Unmatched Privileges', sub: 'Live like royalty' },
  ],
}

// Layered background: dedicated portrait on top, hero as fallback if absent.
const panelBg = `linear-gradient(180deg, rgba(5,5,5,0.25), rgba(5,5,5,0.55)), url('${assets.authThrone.src}'), url('${assets.heroThroneRoom.src}')`
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="state.open"
        class="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
        @mousedown.self="close"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4 scale-95"
          appear
        >
          <div class="relative my-6 w-full max-w-5xl">
            <!-- Ornate crown badge over the top edge (outside the clip) -->
            <div class="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
              <CrownBadge :size="174" />
            </div>

            <!-- Clipped modal body -->
            <div
              class="overflow-hidden rounded-3xl border border-border-gold bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] grain"
            >
              <!-- Close -->
            <button
              class="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/5 hover:text-gold-bright"
              aria-label="Close"
              @click="close"
            >
              <AppIcon name="x" :size="18" />
            </button>

            <!-- Fixed grid height so the modal keeps the SAME outer size in both modes -->
            <div class="grid lg:h-[660px] lg:grid-cols-2">
              <!-- Photo panel -->
              <div
                class="relative hidden h-full min-h-[560px] bg-cover bg-center lg:block"
                :style="{ backgroundImage: panelBg, backgroundColor: '#07070a' }"
              />

              <!-- Form panel -->
              <div class="flex flex-col px-6 py-8 sm:px-10 lg:h-full lg:overflow-y-auto">
                <!-- Brand -->
                <div class="flex flex-col items-center text-center">
                  <AppIcon name="crown" :size="22" class="text-gold-bright" />
                  <h2 class="mt-1 font-display text-3xl font-bold tracking-[0.18em] text-gold-gradient">
                    THRONE
                  </h2>
                  <p class="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.45em] text-ink-muted">
                    {{ state.mode === 'register' ? 'Join the Kingdom' : 'Enter the Kingdom' }}
                  </p>
                </div>

                <!-- Fields -->
                <form class="mt-6 flex flex-col gap-3" @submit.prevent>
                  <div
                    :class="
                      state.mode === 'register'
                        ? 'grid grid-cols-1 gap-3 sm:grid-cols-2'
                        : 'flex flex-col gap-3'
                    "
                  >
                    <div
                      v-for="(f, i) in state.mode === 'register' ? registerFields : loginFields"
                      :key="f.id"
                      class="relative motion-safe:animate-fadeUp"
                      :style="{ animationDelay: `${i * 55}ms` }"
                    >
                      <AppIcon
                        :name="f.icon"
                        :size="16"
                        class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70"
                      />
                      <select
                        v-if="f.select"
                        class="h-12 w-full appearance-none rounded-lg border border-border-gold/60 bg-black/40 pl-11 pr-9 text-sm text-ink-muted focus:border-gold focus:outline-none"
                      >
                        <option value="" disabled selected>{{ f.placeholder }}</option>
                        <option>United Kingdom</option>
                        <option>Georgia</option>
                        <option>United Arab Emirates</option>
                        <option>Germany</option>
                        <option>Other</option>
                      </select>
                      <input
                        v-else
                        :type="f.password ? (reveal[f.id] ? 'text' : 'password') : f.type ?? 'text'"
                        :placeholder="f.placeholder"
                        class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 pl-11 pr-11 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none"
                      />
                      <!-- select chevron -->
                      <AppIcon
                        v-if="f.select"
                        name="chevronDown"
                        :size="16"
                        class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
                      />
                      <!-- password reveal -->
                      <button
                        v-if="f.password"
                        type="button"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted transition-colors hover:text-gold-bright"
                        :aria-label="reveal[f.id] ? 'Hide password' : 'Show password'"
                        @click="reveal[f.id] = !reveal[f.id]"
                      >
                        <AppIcon :name="reveal[f.id] ? 'eyeOff' : 'eye'" :size="16" />
                      </button>
                    </div>
                  </div>

                  <!-- Register consents -->
                  <div v-if="state.mode === 'register'" class="mt-1 flex flex-col gap-2">
                    <label class="flex items-center gap-2.5 text-[13px] text-ink-muted">
                      <input type="checkbox" class="peer sr-only" />
                      <span class="grid h-4 w-4 place-items-center rounded border border-border-gold text-transparent peer-checked:bg-gold peer-checked:text-bg">
                        <AppIcon name="check" :size="11" />
                      </span>
                      I agree to the <span class="text-gold-bright">Terms &amp; Conditions</span>
                    </label>
                    <label class="flex items-center gap-2.5 text-[13px] text-ink-muted">
                      <input type="checkbox" class="peer sr-only" checked />
                      <span class="grid h-4 w-4 place-items-center rounded border border-border-gold text-transparent peer-checked:bg-gold peer-checked:text-bg">
                        <AppIcon name="check" :size="11" />
                      </span>
                      I confirm that I am 18 years or older
                    </label>
                  </div>

                  <GoldButton variant="solid" size="lg" block class="mt-3">
                    {{ state.mode === 'register' ? 'Create My Account' : 'Enter the Kingdom' }}
                  </GoldButton>
                </form>

                <!-- Divider -->
                <div class="my-5 flex items-center gap-4">
                  <span class="h-px flex-1 bg-white/10" />
                  <span class="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-dim">
                    {{ state.mode === 'register' ? 'Or sign up with' : 'Or continue with' }}
                  </span>
                  <span class="h-px flex-1 bg-white/10" />
                </div>

                <!-- Socials -->
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="s in socials"
                    :key="s.label"
                    type="button"
                    class="flex h-12 items-center justify-center gap-2 rounded-lg border border-border-gold/60 bg-black/30 text-xs font-medium text-ink-muted transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
                  >
                    <AppIcon :name="s.icon" :size="16" class="text-champagne" />
                    {{ s.label }}
                  </button>
                </div>

                <!-- Switch mode -->
                <p class="mt-5 text-center font-sans text-sm text-ink-muted">
                  <template v-if="state.mode === 'register'">
                    Already a member?
                    <button class="font-semibold uppercase tracking-[0.12em] text-gold-bright" @click="setMode('login')">
                      Log In
                    </button>
                  </template>
                  <template v-else>
                    Not a member yet?
                    <button class="font-semibold uppercase tracking-[0.12em] text-gold-bright" @click="setMode('register')">
                      Join the Kingdom
                    </button>
                  </template>
                </p>
              </div>
            </div>

            <!-- Bottom feature strip -->
            <div class="grid grid-cols-2 gap-px border-t border-white/5 bg-white/[0.02] sm:grid-cols-4">
              <div
                v-for="b in state.mode === 'register' ? benefits.register : benefits.login"
                :key="b.title"
                class="flex items-center gap-3 px-5 py-4"
              >
                <AppIcon :name="b.icon" :size="22" class="shrink-0 text-gold/80" />
                <div>
                  <p class="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-champagne">
                    {{ b.title }}
                  </p>
                  <p class="font-sans text-[11px] text-ink-dim">{{ b.sub }}</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
