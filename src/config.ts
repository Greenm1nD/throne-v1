/**
 * Site-wide access mode.
 *
 * INVITE_ONLY = false  → anyone may register (open sign-up, social buttons shown,
 *                        friendly "Join the Kingdom" copy). Used at launch/testing.
 * INVITE_ONLY = true   → admission by invitation only: the petition framing returns,
 *                        social sign-up is hidden, and copy switches to
 *                        "Request an Invitation".
 *
 * Flip this single flag to restore the invitation experience — every CTA, the
 * auth modal, and the referral/invitation field follow it.
 */
export const INVITE_ONLY = false

// Primary join CTA label (header, hero, footer, auth modal, page bands).
export const joinCta = INVITE_ONLY ? 'Request an Invitation' : 'Join the Kingdom'

// Closing-band subtitle.
export const finaleSub = INVITE_ONLY
  ? 'Request your invitation. Claim your throne.'
  : 'Join the Kingdom. Claim your throne.'
