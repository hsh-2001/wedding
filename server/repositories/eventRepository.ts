import connection from "../config/connection";
import {IUpsertGuestRequest } from "../../shared/types/guest";


const upsertWeddingEvent = async (request: any) => {
  const {
    event_id,
    owner_id,
    company_id,
    bride_name,
    groom_name,
    wedding_date,
    venue_name,
    venue_address,
    description,
    lang_code = 'en',
  } = request;

  const sql = `SELECT * FROM upsert_wedding($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
  const params = [
    event_id,
    owner_id,
    company_id,
    bride_name,
    groom_name,
    wedding_date,
    venue_name,
    venue_address,
    description,
    lang_code
  ];
  const result = await connection.getData(sql, params);
  return ApiResponse.success('Wedding upserted successfully', result[0]);
};

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

const getEventByCompanyId = async (companyId: number) => {
  const sql = `SELECT * FROM events WHERE company_id = $1 OR company_id = 0`;
  const params = [companyId];
  return await connection.getData<any>(sql, params);
}

export default {
  upsertGuest,
  getGuestsByWeddingId,
  getEventByCompanyId,
  upsertWeddingEvent,
}