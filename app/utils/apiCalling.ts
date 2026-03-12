import { api } from './api';
import type { ApiResponse } from '../../shared/types/baseApi';

export async function loginApi(username: string, password: string): Promise<ApiResponse<{ userId?: string }>> {
  return await api.post('/auth/login', { username, password });
}

export async function registerApi(username: string, email: string, password: string): Promise<ApiResponse<null>> {
  return await api.post('/auth/register', { username, email, password });
}

export async function upsertEventApi(data: any): Promise<ApiResponse<any>> {
  return await api.post('/event/create', data);
}
