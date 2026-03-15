import bcrypt from 'bcryptjs';
import { ApiResponse } from '~/types/baseApi';
import tokenService from './tokenService';
import userRepository from '../repositories/userRepository';

export async function registerUser(username: string, email: string, password: string, role_id = 1): Promise<ApiResponse<{ user_id: string }>> {
  if (!username || !email || !password) {
    return ApiResponse.error('All fields are required.');
  }

  const existing = await userRepository.findUserByUsernameOrEmail(username, email);
  if (existing.length > 0) {
    return ApiResponse.error('Username or email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const roleId = role_id; // Use the provided role ID or default to 1
  const userId = await userRepository.createUser(username, email, hashedPassword, roleId);
  if (roleId === 1) {
     await userRepository.createCompany({ name: username, userId: userId ?? '', phone: '', email });
  }
  return ApiResponse.success('Registration successful.', { user_id : userId ?? '' });
}

export async function loginUser(username: string, password: string) {
  if (!username || !password) {
    return ApiResponse.error('All fields are required.');
  }

  const existing = await userRepository.findUserByUsernameOrEmail(username, '');
  const user = existing[0];
  if (!user) {
    return ApiResponse.error('Invalid username or password.');
  }
  const valid = await bcrypt.compare(password, user?.password_hash || '');
  if (!valid) {
    return ApiResponse.error('Invalid username or password.');
  }

  const token = tokenService.generateToken({ id: user.id, company_id: 1, name: user.username, email: user.email });
  return ApiResponse.success('Login successful.', { ...user , token });
}
