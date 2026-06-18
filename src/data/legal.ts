/**
 * Static info / legal pages (About, Help, Responsible Gaming, Terms, Privacy).
 * Rendered by InfoView.vue. Prototype copy — plausible and on-brand, not actual
 * legal counsel. Keyed by route slug.
 */
export interface InfoSection {
  h: string
  p: string
}
export interface InfoPage {
  slug: string
  eyebrow: string
  title: string
  intro: string
  updated?: string
  sections: InfoSection[]
}

export const infoPages: Record<string, InfoPage> = {
  about: {
    slug: 'about',
    eyebrow: 'The House',
    title: 'About THRONE',
    intro:
      'THRONE is a private royal gaming club built for the few. We pair the calm of a members-only lounge with a world-class casino and sportsbook — quiet luxury, impeccable service, and discretion above all.',
    sections: [
      { h: 'Our Standard', p: 'Every table, tier and privilege is curated. We measure ourselves not by volume, but by the experience of each member who takes a seat at the royal table.' },
      { h: 'Discretion', p: 'Membership is confidential. Balances can be masked on demand, and your activity is never shared. Privacy is not a feature here — it is the foundation.' },
      { h: 'Licensing', p: 'THRONE operates under strict regulatory oversight and partners only with certified game studios and payment providers. Fair play is independently audited.' },
    ],
  },
  help: {
    slug: 'help',
    eyebrow: 'Support',
    title: 'Help Center',
    intro:
      'Answers to common questions, and a direct line to the Royal Concierge whenever you need more. Members enjoy 24/7 priority assistance.',
    sections: [
      { h: 'Account & Verification', p: 'Create an account in seconds. Identity verification (KYC) is required before your first withdrawal and protects both you and the kingdom.' },
      { h: 'Deposits & Withdrawals', p: 'Fund your treasury by card, bank transfer or crypto. Withdrawals are processed with Duke-tier priority — typically under two hours for verified members.' },
      { h: 'Bonuses & Rewards', p: 'Every wager earns points and season crowns. Review the terms attached to each offer; bonus funds are not directly withdrawable.' },
      { h: 'Contact the Concierge', p: 'Reach a dedicated host any time via live chat from your account, or leave a message and we will respond promptly.' },
    ],
  },
  'responsible-gaming': {
    slug: 'responsible-gaming',
    eyebrow: 'Play Responsibly',
    title: 'Responsible Gaming',
    intro:
      'Gaming should remain a pleasure, never a pressure. THRONE is for adults 18 and over, and we give you the tools to stay firmly in control.',
    sections: [
      { h: '18+ Only', p: 'Access to THRONE is strictly limited to adults aged 18 or older. We verify age and will close any account found to belong to a minor.' },
      { h: 'Set Your Limits', p: 'From your account you can set deposit, wager and loss limits, and a session-time reminder. Limits take effect immediately and can only be loosened after a cooling-off period.' },
      { h: 'Take a Break', p: 'Use Cooling-Off to pause for a fixed period, or Self-Exclusion to step away for longer. During exclusion your account is fully locked and promotions stop.' },
      { h: 'Know the Signs', p: 'If play stops being fun, chasing losses, gambling to escape, or spending beyond your means are warning signs. Reach out early — to us, or to professional support.' },
      { h: 'Get Support', p: 'Confidential help is available 24/7 through organisations such as GamCare and BeGambleAware. Our concierge can also connect you to the right resources, privately.' },
    ],
  },
  terms: {
    slug: 'terms',
    eyebrow: 'The Rules',
    title: 'Terms of Service',
    updated: 'Last updated: June 2026',
    intro:
      'These terms govern your membership and use of THRONE. By entering the kingdom you agree to play by them.',
    sections: [
      { h: 'Eligibility', p: 'You must be at least 18 and legally permitted to gamble in your jurisdiction. One account per member; multiple or shared accounts may be closed.' },
      { h: 'Your Account', p: 'Keep your credentials secret and your details accurate. You are responsible for activity on your account. We may request verification at any time.' },
      { h: 'Wagering & Payouts', p: 'All games are governed by their published rules and RTP. Malfunctions void plays and pays. Bonus terms, including wagering requirements, apply where stated.' },
      { h: 'Fair Use', p: 'Fraud, collusion, bonus abuse and use of prohibited software are forbidden and may result in forfeiture of funds and closure of the account.' },
      { h: 'Changes', p: 'We may update these terms; material changes will be communicated. Continued use after changes constitutes acceptance.' },
    ],
  },
  privacy: {
    slug: 'privacy',
    eyebrow: 'Your Privacy',
    title: 'Privacy Policy',
    updated: 'Last updated: June 2026',
    intro:
      'We collect only what we must, protect it rigorously, and never sell it. Here is how your data is handled.',
    sections: [
      { h: 'What We Collect', p: 'Account, identity (KYC) and transaction data needed to operate your membership, comply with the law and prevent fraud.' },
      { h: 'How We Use It', p: 'To run your account, process payments, personalise rewards, ensure fair play and meet regulatory obligations. We do not sell your personal data.' },
      { h: 'Security', p: 'Data is encrypted in transit and at rest with 256-bit encryption, and access is tightly restricted on a need-to-know basis.' },
      { h: 'Your Rights', p: 'You may access, correct or request deletion of your data, subject to legal retention requirements. Contact the concierge to exercise these rights.' },
      { h: 'Cookies', p: 'We use essential and analytics cookies to keep the site secure and improve the experience. You can manage preferences in your browser.' },
    ],
  },
}
