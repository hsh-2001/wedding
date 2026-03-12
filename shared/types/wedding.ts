export interface IWeddingUpsertInput {
  id?: string;
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
