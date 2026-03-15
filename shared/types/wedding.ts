export interface IWeddingUpsertInput {
  id?: string;
  event_id: string;
  owner_username: string;
  owner_password: string;
  company_id: number;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  venue_name?: string;
  venue_address?: string;
  description?: string;
}

export interface IWeddingUpsertResult {
  id: string;
}

export interface IWeddingEventResponse {
  id: string; // UUID
  company_id: number;
  bride_name?: string;
  groom_name?: string;
  wedding_date?: Date;
  venue_name?: string;
  venue_address?: string;
  description?: string;
  event_name?: string;
  event_date?: Date;
  location?: string;
  created_at?: Date;
  updated_at?: Date;
}