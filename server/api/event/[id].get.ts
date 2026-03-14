import weddingService from "~~/server/services/weddingService";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing event ID',
    });
  }

  try {
    return await weddingService.getWeddingEventById(id);
  } catch (error) {
    console.error('Error fetching wedding event by ID:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});
