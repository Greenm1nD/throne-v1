import { loadEnv } from './config/env.js'
import { createApp } from './app.js'
import { createDb } from './db/client.js'

const env = loadEnv()
const { db, pool } = createDb(env.DATABASE_URL)
const app = createApp({ env, db })

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    app.log.info({ signal }, 'shutting down')
    void app.close().then(() => pool.end()).then(() => process.exit(0))
  })
}

try {
  await app.listen({ port: env.PORT, host: '0.0.0.0' })
} catch (error) {
  app.log.fatal({ err: error }, 'failed to start')
  process.exit(1)
}
