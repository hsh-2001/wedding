import connection from "../config/connection";

async function findUserByUsernameOrEmail(username: string, email: string) {
  const result = await connection.getData<{ id: string, username: string, email: string, password_hash: string }>('SELECT id, username, email, password_hash FROM users WHERE username = $1 OR email = $2', [username, email]);
  return result || [];
}

const createCompany = async (company: { name: string, userId: string, phone: string, email: string }) => {
  const { name, userId, phone, email } = company;
  const result = await connection.getData<{ id: string }>(
    'INSERT INTO companies (name, user_id, phone, email) VALUES ($1, $2, $3, $4) RETURNING id',
    [name, userId, phone, email]
  );
  return result?.[0]?.id;
}

async function createUser(username: string, email: string, hashedPassword: string, roleId: number) {
  const result = await connection.getData<{ id: string }>(
    'INSERT INTO users (username, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING id',
    [username, email, hashedPassword, roleId]
  );
  return result?.[0]?.id;
}


export default {
  createCompany,
  findUserByUsernameOrEmail,
  createUser,
}