import { loadEnv } from './config/env.js'
import { createApp } from './app.js'
import { buildContainer } from './container.js'
import { createDb } from './db/client.js'

const env = loadEnv()
const { db, pool } = createDb(env.DATABASE_URL)
const container = buildContainer(env, db)
const app = createApp({ env, db, container })

const SHUTDOWN_TIMEOUT_MS = 10_000

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    app.log.info({ signal }, 'shutting down')
    // A wedged app.close() (or pool.end()) must not hold the process open
    // indefinitely until the supervisor SIGKILLs it — force the issue after
    // a short grace period.
    const forceExit = setTimeout(() => {
      app.log.error('graceful shutdown timed out; forcing exit')
      process.exit(1)
    }, SHUTDOWN_TIMEOUT_MS)
    app.close()
      .then(() => pool.end())
      .then(() => {
        clearTimeout(forceExit)
        process.exit(0)
      })
      .catch((error: unknown) => {
        // Without this, a rejection here (app.close() or pool.end() failing)
        // would leave neither the pool drained nor the process exited — it
        // would just hang until SIGKILL.
        app.log.error({ err: error }, 'error during shutdown')
        clearTimeout(forceExit)
        process.exit(1)
      })
  })
}

try {
  await app.listen({ port: env.PORT, host: '0.0.0.0' })
} catch (error) {
  app.log.fatal({ err: error }, 'failed to start')
  process.exit(1)
}
