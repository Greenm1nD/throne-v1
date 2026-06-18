import { ref } from 'vue'

/**
 * Shared open-state for the mobile account drawer, so the top-bar profile button
 * (MobileTopBar) can open the account navigation that lives in AccountLayout.
 */
const open = ref(false)

export function useAccountMenu() {
  return { open }
}
