import type { AuthContext, UserClaims, VisitorSessionResponse } from '@throne/shared'
import type { Env } from '../../config/env.js'
import { signToken, verifyToken } from '../../lib/signed-token.js'
import type { UserAuthVerifier } from '../../plugins/auth.js'
import type { VisitorRepository } from './repository.js'

export class VisitorService {
  constructor(
    private readonly repo: VisitorRepository,
    private readonly env: Env,
    private readonly userVerifier: UserAuthVerifier,
  ) {
    // Not read yet: Phase 7's jwks work calls this.userVerifier from the
    // onRequest hook. `void` satisfies noUnusedLocals without changing behavior.
    void this.userVerifier
  }

  private issue(visitorId: string): VisitorSessionResponse {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + this.env.VISITOR_TOKEN_TTL_DAYS * 86_400
    return {
      visitorToken: signToken({ vid: visitorId, iat, exp }, this.env.VISITOR_TOKEN_SECRET),
      visitorId,
      expiresAt: new Date(exp * 1000).toISOString(),
    }
  }

  /**
   * A bad, expired or orphaned token is not an error: the visitor is simply
   * unknown and gets a fresh identity. Their old conversations stay
   * unreachable, which is the correct outcome for an anonymous identity.
   */
  async startSession(token: string | undefined): Promise<VisitorSessionResponse> {
    const existing = token ? await this.existingVisitor(token) : null
    if (existing) return this.issue(existing.id)
    const created = await this.repo.create()
    return this.issue(created.id)
  }

  async resolve(token: string | undefined): Promise<AuthContext | null> {
    if (!token) return null
    const visitor = await this.existingVisitor(token)
    if (!visitor) return null
    const user = visitor.userId ? await this.repo.findUser(visitor.userId) : null
    return {
      visitorId: visitor.id,
      userId: user?.id ?? null,
      user: user ? { externalId: user.externalId, email: user.email ?? undefined, displayName: user.displayName ?? undefined } : null,
    }
  }

  /** Reserved for the jwks verifier: links a visitor to a real account. */
  async linkUser(visitorId: string, claims: UserClaims): Promise<string> {
    const userId = await this.repo.upsertUser(claims.externalId, claims.email, claims.displayName)
    await this.repo.linkVisitorToUser(visitorId, userId)
    return userId
  }

  private async existingVisitor(token: string) {
    const payload = verifyToken(token, this.env.VISITOR_TOKEN_SECRET)
    if (!payload) return null
    return this.repo.touch(payload.vid)
  }
}
