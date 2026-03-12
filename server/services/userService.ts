import bcrypt from 'bcryptjs';
import { findUserByUsernameOrEmail, createUser } from '../repositories/userRepository';
import { getPgPool } from '../config/connection';
import { ApiResponse } from '../../shared/types/baseApi';
import tokenService from './tokenService';

export async function registerUser(username: string, email: string, password: string) {
  if (!username || !email || !password) {
    return ApiResponse.error('All fields are required.');
  }

  const existing = await findUserByUsernameOrEmail(username, email);
  if (existing.length > 0) {
    return ApiResponse.error('Username or email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, email, hashedPassword);

  return ApiResponse.success('Registration successful.');
}

export async function loginUser(username: string, password: string) {
  if (!username || !password) {
    return ApiResponse.error('All fields are required.');
  }

  const pool = getPgPool();
  const { rows } = await pool.query('SELECT id, username, email, password_hash FROM users WHERE username = $1', [username]);
  if (rows.length === 0) {
    return ApiResponse.error('Invalid username or password.');
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return ApiResponse.error('Invalid username or password.');
  }

  const token = tokenService.generateToken({ id: user.id, company_id: 1, name: user.username, email: user.email });
  return ApiResponse.success('Login successful.', { ...user , token });
}
