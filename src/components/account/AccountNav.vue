<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AccountIcon from './AccountIcon.vue'
import { accountNavSections } from '@/config/accountNavigation'
import { useAuth } from '@/composables/useAuth'

/**
 * Config-driven account navigation (champagne line icons) used by both the
 * desktop sidebar and the mobile account drawer. Sections are collapsible
 * (aria-expanded); the active route reads aria-current="page".
 */
const emit = defineEmits<{ navigate: [] }>()

const route = useRoute()
const router = useRouter()
const auth = useAuth()

const openSections = reactive<Record<string, boolean>>(
  Object.fromEntries(accountNavSections.map((s) => [s.id, true])),
)
const toggle = (id: string) => (openSections[id] = !openSections[id])

const isActive = (to?: string) => !!to && route.path === to

function activate(item: { to?: string; action?: string }) {
  if (item.action === 'logout') {
    emit('navigate')
    auth.logout()
    router.push('/')
    return
  }
  if (item.to) {
    router.push(item.to)
    emit('navigate')
  }
}
</script>

<template>
  <nav class="account-nav" aria-label="Account">
    <div v-for="sec in accountNavSections" :key="sec.id" class="mb-1">
      <button
        class="flex w-full items-center justify-between px-3 pb-1.5 pt-4 text-left"
        :aria-expanded="openSections[sec.id]"
        @click="toggle(sec.id)"
      >
        <span class="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-dim">
          {{ sec.title }}
        </span>
        <svg
          class="text-ink-dim transition-transform duration-200"
          :class="openSections[sec.id] ? 'rotate-180' : ''"
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul v-show="openSections[sec.id]" class="space-y-0.5">
        <li v-for="item in sec.items" :key="item.id">
          <button
            class="acc-item group flex h-12 w-full items-center gap-3 rounded-xl px-3 text-left font-sans text-[14px] transition-colors"
            :class="item.action === 'logout'
              ? 'acc-item--logout'
              : (isActive(item.to) ? 'acc-item--active' : 'text-[rgba(214,175,55,0.72)] hover:bg-white/[0.04]')"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            @click="activate(item)"
          >
            <span class="grid h-7 w-7 shrink-0 place-items-center">
              <AccountIcon :name="item.icon" :size="22" />
            </span>
            <span class="truncate">{{ item.label }}</span>
            <span
              v-if="isActive(item.to)"
              class="ml-auto h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-gradient shadow-[0_0_6px_rgba(245,215,122,0.8)]"
            />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Hover brightens the champagne line icon + label (not gold-bright). */
.acc-item:hover {
  color: #e8c76a;
}
/* Active: restrained dark-gold panel + left accent line + bright icon/label. */
.acc-item--active {
  position: relative;
  color: #f5d76e;
  background: linear-gradient(90deg, rgba(245, 215, 122, 0.12), rgba(245, 215, 122, 0.02));
  box-shadow: inset 0 0 0 1px rgba(245, 215, 122, 0.18);
}
.acc-item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  height: 60%;
  width: 3px;
  transform: translateY(-50%);
  border-radius: 9999px;
  background: linear-gradient(180deg, #f5d76e, #d4af37);
  box-shadow: 0 0 8px rgba(245, 215, 122, 0.7);
}
/* Logout: red by default, brighter red on hover. */
.acc-item--logout {
  color: #e0584d;
}
.acc-item--logout:hover {
  color: #f06a5c;
  background: rgba(224, 88, 77, 0.09);
}
</style>
