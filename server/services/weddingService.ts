import { ApiResponse } from '../../shared/types/baseApi';
import type { IWeddingEventResponse, IWeddingUpsertInput, IWeddingUpsertResult } from '../../shared/types/wedding';
import connection from '../config/connection';

const upsertWedding = async ({
  company_id = 1,
  bride_name,
  groom_name,
  wedding_date,
  venue_name,
  venue_address,
  description
}: IWeddingUpsertInput): Promise<ApiResponse<IWeddingUpsertResult | null>> => {
  try {
    const sql = `SELECT upsert_wedding($1, $2, $3, $4, $5, $6, $7) AS id`;
    const params = [company_id, bride_name, groom_name, wedding_date, venue_name || null, venue_address || null, description || null];
    const result = await connection.getData<{ id: string }>(sql, params);
    if (!result || result.length === 0) {
      return ApiResponse.error('Failed to upsert wedding', null);
    }
    return ApiResponse.success('Wedding upserted successfully', { id: result[0]?.id as string });
  } catch (error: any) {
    return ApiResponse.error('Failed to upsert wedding', error.message);
  }
}

const getWeddingEventByCompanyId = async (company_id: number): Promise<ApiResponse<IWeddingEventResponse[] | null>> => {
  try {
    const sql = `SELECT * FROM get_wedding_event($1)`;
    const params = [company_id];
    const result = await connection.getData<IWeddingEventResponse>(sql, params);
    if (!result || result.length === 0) {
      return ApiResponse.error('Failed to retrieve wedding event', null);
    }
    return ApiResponse.success('Wedding event retrieved successfully', result);
  } catch (error: any) {
    return ApiResponse.error('Failed to retrieve wedding event', error.message);
  }
}

export default {
  upsertWedding,
  getWeddingEventByCompanyId,
}