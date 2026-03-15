import path from 'path';
import fs from 'fs';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wedding',
    password: 'senghong',
    port: 2050,
});


const tableDir = path.join(process.cwd(), 'server/db/tables');
const functionDir = path.join(process.cwd(), 'server/db/functions');
const initDir = path.join(process.cwd(), 'server/db/initData');

// ANSI colors
const color = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const publishTables = async () => {
  const files = fs.readdirSync(tableDir);

  console.log(`${color.cyan}Publishing Tables...${color.reset}`);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(tableDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    try {
      await pool.query(sql);
      console.log(`${color.green}✓ Table published:${color.reset} ${file}`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`${color.yellow}⚠ Table already exists:${color.reset} ${file}`);
      } else {
        console.error(`${color.red}✗ Failed:${color.reset} ${file}`);
        console.error(`${color.red}${error.message}${color.reset}`);
      }
    }
  }
};

const publishFunctions = async () => {
  const files = fs.readdirSync(functionDir);

  console.log(`${color.cyan}Publishing Functions...${color.reset}`);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(functionDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    try {
      await pool.query(sql);
      console.log(`${color.green}✓ Function published:${color.reset} ${file}`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`${color.yellow}⚠ Function already exists:${color.reset} ${file}`);
      } else {
        console.error(`${color.red}✗ Failed:${color.reset} ${file}`);
        console.error(`${color.red}${error.message}${color.reset}`);
      }
    }
  }
};

const initDefaultData = async () => {
  const files = fs.readdirSync(initDir);

  console.log(`${color.cyan}Initializing Default Data...${color.reset}`);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(initDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    try {
      await pool.query(sql);
      console.log(`${color.green}✓ Data initialized:${color.reset} ${file}`);
    } catch (error) {
      console.error(`${color.red}✗ Failed:${color.reset} ${file}`);
      console.error(`${color.red}${error.message}${color.reset}`);
    }
  }
};

const publishDatabase = async () => {
  try {
    console.log(`${color.cyan}Starting database publish...\n${color.reset}`);

    await publishTables();
    await publishFunctions();
    await initDefaultData();

    console.log(`\n${color.green}✓ Database published successfully!${color.reset}`);
  } catch (error) {
    console.error(`${color.red}✗ Error publishing database:${color.reset}`, error);
  }
};

publishDatabase();