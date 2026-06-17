<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoadingScreen from '@/components/home/LoadingScreen.vue'
import AuthModal from '@/components/auth/AuthModal.vue'
import TwoFaModal from '@/components/auth/TwoFaModal.vue'
import AmbientBackground from '@/components/ui/AmbientBackground.vue'
import AmbientAudio from '@/components/ui/AmbientAudio.vue'
import AgeGate from '@/components/ui/AgeGate.vue'
import WalletModal from '@/components/wallet/WalletModal.vue'
import FloatingCommandBar from '@/components/ui/FloatingCommandBar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { premiumEnabled } from '@/composables/usePremiumMotion'

const ready = ref(false)

// Activates all premium-motion CSS (scoped under html.premium). Flag off → no
// class → stable design, untouched.
onMounted(() => {
  if (premiumEnabled) document.documentElement.classList.add('premium')
})
</script>

<template>
  <LoadingScreen v-if="!ready" @done="ready = true" />
  <AmbientBackground />
  <AppHeader v-show="ready" />
  <div v-show="ready" class="min-h-[60vh]">
    <RouterView v-slot="{ Component }">
      <Transition name="pm-page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
  <AppFooter v-show="ready" />
  <AmbientAudio />
  <AuthModal />
  <TwoFaModal />
  <WalletModal />
  <FloatingCommandBar v-if="premiumEnabled" />
  <AgeGate v-if="ready" />
</template>
