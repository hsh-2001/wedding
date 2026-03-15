import connection from "../config/connection";

export async function findUserByUsernameOrEmail(username: string, email: string) {
  const result = await connection.getData<{ id: string }>('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
  return result || [];
}

export async function createUser(username: string, email: string, hashedPassword: string) {
  await connection.getData(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
    [username, email, hashedPassword]
  );
}
