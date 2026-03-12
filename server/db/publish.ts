import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

const log = {
  success: (msg: string) => console.log(`${colors.green}✔ ${msg}${colors.reset}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  error: (msg: string) => console.error(`${colors.red}✖ ${msg}${colors.reset}`),
  info: (msg: string) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
}

function parseEnv(content: string) {
  const env: Record<string, string> = {}

  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim()

    if (!line || line.startsWith('#')) continue

    const idx = line.indexOf('=')
    if (idx === -1) continue

    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    env[key] = value
  }

  return env
}

async function loadConnectionString(): Promise<string> {
  if (process.env.NUXT_PG_CONNECTION_STRING) {
    return process.env.NUXT_PG_CONNECTION_STRING
  }

  const envPath = join(process.cwd(), '.env')

  if (!existsSync(envPath)) {
    throw new Error('Missing .env file or connection string')
  }

  const envFile = await readFile(envPath, 'utf8')
  const env = parseEnv(envFile)

  if (!env.NUXT_PG_CONNECTION_STRING) {
    throw new Error('NUXT_PG_CONNECTION_STRING not found')
  }

  return env.NUXT_PG_CONNECTION_STRING
}

async function getSqlFiles(dir: string) {
  if (!existsSync(dir)) return []

  const files = await readdir(dir)

  return files
    .filter((f) => extname(f).toLowerCase() === '.sql')
    .sort((a, b) => a.localeCompare(b))
}

async function executeFiles(
  client: Client,
  baseDir: string,
  files: string[],
  label: string
) {
  const errors: string[] = [];
  for (const file of files) {
    const path = join(baseDir, file)
    const sql = await readFile(path, 'utf8')

    if (!sql.trim()) {
      log.warning(`Skipping empty ${label}: ${file}`)
      continue
    }

    try {
      await client.query(sql)
      log.success(`${label} applied: ${file}`)
    } catch (err: any) {
      log.error(`${label} failed: ${file} → ${err.message}`)
      errors.push(`${file}: ${err.message}`)
    }
  }
  if (errors.length) {
    log.error(`Some ${label.toLowerCase()}s failed:\n${errors.join('\n')}`)
  }
}

async function runMigrations() {
  const connectionString = await loadConnectionString()

  const client = new Client({ connectionString })

  const tablesDir = join(__dirname, 'tables')
  const functionsDir = join(__dirname, 'functions')

  const tableFiles = await getSqlFiles(tablesDir)
  const functionFiles = await getSqlFiles(functionsDir)

  await client.connect()

  try {
    if (tableFiles.length) {
      log.info(`Applying ${tableFiles.length} table migrations...`)
      await client.query('BEGIN')
      await executeFiles(client, tablesDir, tableFiles, 'Migration')
      await client.query('COMMIT')
      log.success('Table migrations completed')
    }
    if (functionFiles.length) {
      log.info(`Applying ${functionFiles.length} functions...`)
      await executeFiles(client, functionsDir, functionFiles, 'Function')
      log.success('Function migrations completed')
    }
  } finally {
    await client.end()
  }
}

runMigrations().catch((err) => {
  log.error(`Migration failed: ${err.message}`)
  process.exitCode = 1
})