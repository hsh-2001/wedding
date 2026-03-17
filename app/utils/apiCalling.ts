import { api } from './api';
import type { ApiResponse } from '~/types/baseApi';
import { getBaseResponse } from '~/types/baseApi';
import type { WeddingEventList } from '~/models/event';
import type { IWeddingEventResponse } from '~/../shared/types/wedding';
import { GuestResponse, type IUpsertGuestRequest } from '~/../shared/types/guest';

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

export async function getEventByCompanyIdApi(): Promise<ApiResponse<any>> {
  const result = await api.get('/event');
  return getBaseResponse(result.data);
}

export async function getWeddingEventApi(): Promise<ApiResponse<WeddingEventList[] | null>> {
  const result = await api.get('/event/wedding');
  return getBaseResponse(result.data);
}

export async function getWeddingEventByIdApi(id: string): Promise<ApiResponse<IWeddingEventResponse | null>> {
  const result = await api.get(`/event/${id}`);
  return getBaseResponse(result.data);
}

export async function upsertGuestApi(data: IUpsertGuestRequest): Promise<ApiResponse<any>> {
  const result = await api.post('/event/guest/upsert', data);
  return getBaseResponse(result.data);
}

export async function getGuestsByWeddingIdApi(weddingId: string, limit = 25, page = 1, search = ''): Promise<ApiResponse<GuestResponse[]>> {
  const result = await api.get(`/event/guest/guest-list?wedding_id=${weddingId}&limit=${limit}&page=${page}&search=${search}`);
  return getBaseResponse(result.data);
}
