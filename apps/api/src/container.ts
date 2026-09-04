import type { Env } from './config/env.js'
import type { Db } from './db/client.js'
import { NoneVerifier, type UserAuthVerifier } from './plugins/auth.js'
import { VisitorRepository } from './modules/visitors/repository.js'
import { VisitorService } from './modules/visitors/service.js'

export interface Container {
  visitors: VisitorService
  userVerifier: UserAuthVerifier
}

/** Plain construction: no DI framework, one place that knows the wiring. */
export function buildContainer(env: Env, db: Db): Container {
  const userVerifier: UserAuthVerifier = new NoneVerifier()
  const visitors = new VisitorService(new VisitorRepository(db), env, userVerifier)
  return { visitors, userVerifier }
}
