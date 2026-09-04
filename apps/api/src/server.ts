import { loadEnv } from './config/env.js'
import { createApp } from './app.js'

const env = loadEnv()
const app = createApp({ env })

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    app.log.info({ signal }, 'shutting down')
    void app.close().then(() => process.exit(0))
  })
}

try {
  await app.listen({ port: env.PORT, host: '0.0.0.0' })
} catch (error) {
  app.log.fatal({ err: error }, 'failed to start')
  process.exit(1)
}
