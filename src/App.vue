<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import LoadingScreen from '@/components/home/LoadingScreen.vue'
import AuthModal from '@/components/auth/AuthModal.vue'
import AmbientBackground from '@/components/ui/AmbientBackground.vue'
import AmbientAudio from '@/components/ui/AmbientAudio.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const ready = ref(false)
const route = useRoute()
// The members area ships its own sidebar/topbar chrome.
const isAccount = computed(() => route.path.startsWith('/account'))
</script>

<template>
  <LoadingScreen v-if="!ready" @done="ready = true" />
  <AmbientBackground />
  <AppHeader v-show="ready && !isAccount" />
  <div v-show="ready" class="min-h-[60vh]">
    <RouterView />
  </div>
  <AppFooter v-show="ready && !isAccount" />
  <AmbientAudio />
  <AuthModal />
</template>
