import eventService from "~~/server/services/eventService";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { wedding_id, limit = 25, offset = 0 } = query as { wedding_id: string, limit?: number, offset?: number };
  console.log('Received query parameters:', { wedding_id, limit, offset });
  const response = await eventService.getGuestsByWeddingId(wedding_id, limit, offset);
  return response;
});