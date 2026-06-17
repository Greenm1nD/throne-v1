import { ref } from 'vue'

/**
 * Discreet mode — a privacy toggle that masks every monetary figure on screen
 * (balances, bonuses, totals). A quiet-luxury staple: high-net-worth members
 * play in public lounges and want their numbers shielded from a glance over
 * the shoulder. The choice is app-wide (module-level ref) and persists.
 */
const KEY = 'throne.discreet'
// Default ON: balances start masked for privacy. Only an explicit reveal ('0')
// keeps them visible across sessions.
const discreet = ref(localStorage.getItem(KEY) !== '0')

export function useDiscreet() {
  function toggle() {
    discreet.value = !discreet.value
    localStorage.setItem(KEY, discreet.value ? '1' : '0')
  }
  // Mask monetary values only (anything carrying a currency mark); leave plain
  // labels and counts untouched. Keep the currency mark and a +/− sign so the
  // masked value still reads as money: "+ $500.00" → "+ $••••".
  function mask(value: string) {
    if (!discreet.value || !/[$€£₿]/.test(value)) return value
    const mark = value.match(/[$€£₿]/)![0]
    const sign = value.match(/^\s*([+\-−])/)?.[1]
    return `${sign ? sign + ' ' : ''}${mark}••••`
  }
  return { discreet, toggle, mask }
}
