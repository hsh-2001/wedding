import { readBody } from 'h3';
import { upsertWedding } from '#server/services/weddingService';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await upsertWedding(body);
});
