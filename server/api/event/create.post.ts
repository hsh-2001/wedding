import { readBody } from 'h3';
import weddingService from '~~/server/services/weddingService';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await weddingService.upsertWedding(body);
});
