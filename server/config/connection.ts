import { Pool, QueryResult } from 'pg'
import { QueryResultRow } from 'pg'

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

const getData = async <T extends QueryResultRow>(query: string, params: any[] = []): Promise<T[]> => {
    const pool = getPgPool();
    const result: QueryResult<T> = await pool.query<T>(query, params);
    return result.rows;
}

export default {
    getPgPool,
    getData,
}