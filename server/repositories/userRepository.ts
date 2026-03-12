import { getPgPool } from '../config/connection';

export async function findUserByUsernameOrEmail(username: string, email: string) {
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
  return rows;
}

export async function createUser(username: string, email: string, hashedPassword: string) {
  const pool = getPgPool();
  await pool.query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
    [username, email, hashedPassword]
  );
}
