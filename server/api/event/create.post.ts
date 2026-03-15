import { readBody } from 'h3';
import eventService from '~~/server/services/eventService';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await event.context.user;
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }
  return await eventService.upsertWeddingEvent({...body, company_id: user.company_id ?? 0});
});
