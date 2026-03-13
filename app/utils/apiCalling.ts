import { api } from './api';
import type { ApiResponse } from '../../shared/types/baseApi';
import { getBaseResponse } from '../../shared/types/baseApi';
import type { WeddingEventList } from '~/models/event';

export async function loginApi(username: string, password: string): Promise<ApiResponse<{ userId?: string; token?: string }>> {
  const result =  await api.post('/auth/login', { username, password });
  return getBaseResponse(result.data);
}

export async function registerApi(username: string, email: string, password: string): Promise<ApiResponse<null>> {
  const result = await api.post('/auth/register', { username, email, password });
  return getBaseResponse(result.data);
}

export async function upsertEventApi(data: any): Promise<ApiResponse<any>> {
  const result = await api.post('/event/create', data);
  return getBaseResponse(result.data);
}

export async function getWeddingEventApi(): Promise<ApiResponse<WeddingEventList[] | null>> {
  const result = await api.get('/event/wedding');
  return getBaseResponse(result.data);
}