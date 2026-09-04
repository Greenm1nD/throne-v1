/**
 * Campaign manifest — one CONFIG ENTRY per traffic source, never a redesign.
 *
 * A campaign is a row here plus a shared lander (CampaignLanderView). Launching
 * for a new website/source means adding an entry and sharing
 * `/c/<id>?btag=…&click_id=…` — see docs/campaign-playbook.md. The tracking
 * contract (btag, click_id, sub1..5, 90-day window) lives in
 * marketing_strategy/01_affiliate_program.md §5 (read-only).
 *
 * Copy rules: factual, English, no urgency, no countdowns. Describe what the
 * house IS. Every number the lander shows is computed from the progression
 * ladder (src/data/progression.ts), never typed in here.
 */

/** Where the traffic comes from. */
export type CampaignSource = 'affiliate-review' | 'kick-streamer' | 'push-network' | 'direct'

/** Which proof block the lander leads with. */
export type CampaignProof = 'rates' | 'trust' | 'sla'

export interface Campaign {
  id: string
  source: CampaignSource
  /** ISO country code, or a region label such as 'LATAM'. */
  geo: string
  /** BCP 47 tag of the audience. Site copy itself stays English. */
  locale: string
  headline: string
  sub: string
  heroNote: string
  /** Preset the rakeback calculator opens with. */
  calculatorDefaults: { monthlyWager: number; houseEdgePct: number }
  proof: CampaignProof
  ctaLabel: string
}

/**
 * Rendered for unknown or missing campaign ids — a campaign link must never
 * dead-end in a 404.
 */
export const DEFAULT_CAMPAIGN: Campaign = {
  id: 'default',
  source: 'direct',
  geo: 'GLOBAL',
  locale: 'en',
  headline: 'A gaming house that publishes its arithmetic.',
  sub: 'THRONE returns a fixed share of tribute — the house margin on your play — at every rank. Every rate and every rank floor is on the page. Run your own numbers below.',
  heroNote: 'The ladder on this page and the ladder inside the club are the same numbers.',
  calculatorDefaults: { monthlyWager: 2000, houseEdgePct: 4 },
  proof: 'rates',
  ctaLabel: 'Create account',
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'affiliate-review-mx',
    source: 'affiliate-review',
    geo: 'MX',
    locale: 'es-MX',
    headline: 'The rates are published. Check them yourself.',
    sub: 'THRONE returns a fixed share of tribute — the house margin on your play — at every rank. The full ladder is below; run your own monthly figure through it before you decide anything.',
    heroNote: 'Written for review readers: every number on this page comes from the same ladder the club runs on, not from a promotional rate.',
    calculatorDefaults: { monthlyWager: 2000, houseEdgePct: 4 },
    proof: 'rates',
    ctaLabel: 'Create account',
  },
  {
    id: 'kick-streamer-cl',
    source: 'kick-streamer',
    geo: 'CL',
    locale: 'es-CL',
    headline: 'The same tables the stream plays. The same ladder.',
    sub: 'No streamer rate, no private terms. The account you open here runs on the published ladder below — the one every member is on.',
    heroNote: 'A stream shows play, not results you should expect. The house edge is real and listed in the calculator.',
    calculatorDefaults: { monthlyWager: 1000, houseEdgePct: 5 },
    proof: 'trust',
    ctaLabel: 'Open your account',
  },
  {
    id: 'push-latam',
    source: 'push-network',
    geo: 'LATAM',
    locale: 'es-419',
    headline: 'A casino that shows the math before you deposit.',
    sub: 'Pick a monthly wager and a house edge. The page computes the tribute — the house margin — and the share each rank pays back, in plain arithmetic.',
    heroNote: 'Nothing on this page counts down, runs out, or is reserved for you. The ladder is the offer.',
    calculatorDefaults: { monthlyWager: 500, houseEdgePct: 5 },
    proof: 'sla',
    ctaLabel: 'Register',
  },
]

/** Look a campaign up by id. Unknown ids fall back to the default campaign. */
export function campaignById(id: string): Campaign {
  return CAMPAIGNS.find((c) => c.id === id) ?? DEFAULT_CAMPAIGN
}
