import { Pool } from 'pg'

let pool: Pool | null = null

export function getPgPool() {
    if (pool) {
        return pool
    }

    const config = useRuntimeConfig()
    const connectionString = config.pgConnectionString

    if (!connectionString) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Missing NUXT_PG_CONNECTION_STRING',
        })
    }

    pool = new Pool({ connectionString })
    return pool
}