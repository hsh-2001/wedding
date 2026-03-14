import connection from "../config/connection";
import {IUpsertGuestRequest } from "../../shared/types/guest";

const upsertGuest = async (guest: IUpsertGuestRequest) => {
  const sql = `SELECT * FROM upsert_guest($1, $2, $3, $4, $5, $6, $7)`;
  const params = [guest.wedding_id, guest.name, guest.title, guest.phone, guest.email, guest.invitation_code, guest.remark];
  const result = await connection.getData(sql, params);
  return ApiResponse.success('Guest upserted successfully', result[0]);
}

const getGuestsByWeddingId = async (weddingId: string, limit = 25, offset = 0) => {
  const sql = `SELECT * FROM get_guest_by_event_id($1, $2, $3)`;
  const params = [weddingId, limit, offset];
  const result = await connection.getData<any>(sql, params);
  return ApiResponse.success('Guests retrieved successfully', result);
}

export default {
  upsertGuest,
  getGuestsByWeddingId,
}