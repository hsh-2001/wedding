import eventService from "~~/server/services/eventService";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { wedding_id, limit = 25, page = 1, search = '' } = query as { wedding_id: string, limit?: number, page?: number , search?: string};
  const response = await eventService.getGuestsByWeddingId(wedding_id, limit, page, search);
  return response;
});