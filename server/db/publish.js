import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ANSI color codes
const colors = {
	reset: '\x1b[0m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	cyan: '\x1b[36m',
	bold: '\x1b[1m',
}

const log = {
	success: (msg) => console.log(`${colors.green}✔ ${msg}${colors.reset}`),
	warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
	error: (msg) => console.error(`${colors.red}✖ ${msg}${colors.reset}`),
	info: (msg) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
}

function parseEnvFile(content) {
	const out = {}

	for (const rawLine of content.split(/\r?\n/)) {
		const line = rawLine.trim()
		if (!line || line.startsWith('#')) {
			continue
		}

		const eqIndex = line.indexOf('=')
		if (eqIndex <= 0) {
			continue
		}

		const key = line.slice(0, eqIndex).trim()
		let value = line.slice(eqIndex + 1).trim()

		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1)
		}

		out[key] = value
	}

	return out
}

async function loadConnectionString() {
	if (process.env.NUXT_PG_CONNECTION_STRING) {
		return process.env.NUXT_PG_CONNECTION_STRING
	}

	const envPath = join(process.cwd(), '.env')
	if (!existsSync(envPath)) {
		return undefined
	}

	const envContent = await readFile(envPath, 'utf8')
	const env = parseEnvFile(envContent)
	return env.NUXT_PG_CONNECTION_STRING
}

async function run() {
	const connectionString = await loadConnectionString()

	if (!connectionString) {
		throw new Error('Missing NUXT_PG_CONNECTION_STRING. Set it in env or .env file.')
	}

	const tablesDir = join(__dirname, 'tables')
	const files = (await readdir(tablesDir))
		.filter((name) => extname(name).toLowerCase() === '.sql')
		.sort((a, b) => a.localeCompare(b))

	if (files.length === 0) {
		log.warning('No SQL files found in server/db/tables')
		return
	}

	const client = new Client({ connectionString })

	await client.connect()

	try {
		await client.query('BEGIN')

		for (const fileName of files) {
			const filePath = join(tablesDir, fileName)
			const sql = await readFile(filePath, 'utf8')

			if (!sql.trim()) {
				log.warning(`Skipping empty migration: ${fileName}`)
				continue
			}

			await client.query(sql)
			log.success(`Applied migration: ${fileName}`)
		}

		await client.query('COMMIT')
		log.success('Database migration completed successfully')
	} catch (error) {
		await client.query('ROLLBACK')
		throw error
	} finally {
		await client.end()
	}
}

run().catch((error) => {
	log.error(`Migration failed: ${error.message}`)
	process.exitCode = 1
})
