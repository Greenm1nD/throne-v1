/**
 * The one money formatter — every surface that renders a monetary figure goes
 * through here, so the site speaks a single currency. Fixes the split where
 * the header printed € while the wallet, account and progression printed $.
 *
 * Tabular alignment is the caller's concern (`tabular-nums` in CSS); this
 * module only owns the currency and the digits.
 */
export const CURRENCY = 'USD'
export const CURRENCY_SYMBOL = '$'

/** Major units → display string: 1240.5 → "$1,240.50". */
export function formatMoney(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Display string → major units: "$10,000" → 10000. The demo data layer ships
 * preformatted strings (min/max limits, balances), so validation parses them
 * back rather than duplicating the figures.
 */
export function parseMoney(value: string): number {
  const n = Number(value.replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}
