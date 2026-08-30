/**
 * Company, licence and contact facts shown in the footer trust block.
 *
 * Every field is optional and every one is unset today, because none of them
 * is true yet: THRONE has no licence, no registered operating company on
 * record, no acquirer and no backend.
 *
 * The rule the component enforces: a row renders only when its value exists.
 * There is no placeholder, no "TBC" and no "pending" — an empty state is a
 * claim too, and "Licence: pending" reads as "we have applied", which would
 * also not be true. Affiliate networks and review portals check these against
 * public registers; a wrong number is worse than a blank, because a blank is
 * an absence while a wrong one is a misrepresentation.
 *
 * Fill a field the day it becomes true and the row appears by itself.
 */
export interface TrustConfig {
  /** Operating company, exactly as registered. */
  legalEntity?: string
  registrationNumber?: string
  registeredAddress?: string
  /** Only once a real licence is held and verifiable on the authority's register. */
  licence?: { authority: string; number: string; verifyUrl: string }
  supportEmail?: string
  complaintsUrl?: string
  /** Alternative dispute resolution body — only with an actual agreement in place. */
  adrProvider?: { name: string; url: string }
  restrictedTerritories?: string[]
  /**
   * Payment methods. Displaying an acceptance mark is a claim of live,
   * contractual acceptance obtained through an acquirer; listing brands
   * without that agreement is misuse of their marks.
   */
  payments?: string[]
}

export const trust: TrustConfig = {}

/**
 * Shown while the product is not live. This single line defuses every absence
 * below it: a reviewer who reads it stops looking for a licence, and a visitor
 * who reads it cannot be misled about what this is.
 * Set to null on the day real-money play opens.
 */
export const preparationNotice: string | null =
  'THRONE is in preparation. No real-money play, no deposits and no withdrawals.'

/**
 * Support organisations reachable from anywhere, with no licensing or
 * self-exclusion relationship implied.
 *
 * Deliberately excluded: GAMSTOP, GambleAware/BeGambleAware and GamCare are
 * Great Britain only. GAMSTOP in particular would tell a self-excluded GB
 * player they are protected on a site that has never seen the register.
 * Names only, never logos — a logo reads as endorsement, and most of these
 * organisations require written permission for theirs.
 */
export const helpOrganisations = [
  { name: 'Gambling Therapy', href: 'https://www.gamblingtherapy.org' },
  { name: 'BetBlocker', href: 'https://betblocker.org' },
  { name: 'Gamblers Anonymous', href: 'https://www.gamblersanonymous.org' },
] as const
