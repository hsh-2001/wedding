import { getPgPool } from '../config/connection';
import { ApiResponse } from '../../shared/types/baseApi';
import type { IWeddingUpsertInput, IWeddingUpsertResult } from '../../shared/types/wedding';

export async function upsertWedding({
  company_id = 1,
  bride_name,
  groom_name,
  wedding_date,
  venue_name,
  venue_address,
  description
}: IWeddingUpsertInput): Promise<ApiResponse<IWeddingUpsertResult>> {
  const pool = getPgPool();
  try {
    const { rows } = await pool.query(
      `SELECT upsert_wedding($1, $2, $3, $4, $5, $6, $7) AS id`,
      [company_id, bride_name, groom_name, wedding_date, venue_name || null, venue_address || null, description || null]
    );
    return ApiResponse.success('Wedding upserted successfully', { id: rows[0].id });
  } catch (error: any) {
    return ApiResponse.error('Failed to upsert wedding', error.message);
  }
}
