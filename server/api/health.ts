import { getPgPool } from '../config/connection'
import { defineEventHandler, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const health = {
    ok: true,
    postgres: { ok: true as boolean, message: 'connected' },
    timestamp: new Date().toISOString(),
  }

  try {
    await getPgPool().query('SELECT 1')
  } catch (error) {
    health.ok = false
    health.postgres.ok = false
    health.postgres.message = error instanceof Error ? error.message : 'connection failed'
  }

  if (!health.ok) {
    setResponseStatus(event, 503)
  }

  return health
})
