import guestService from "~~/server/services/guestService";

export default defineEventHandler(async (event) => {
  const wedding_id = getRouterParam(event, 'id');
  if (!wedding_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing wedding ID',
    });
  }
  try {
    return await guestService.getGuestsByWeddingId(wedding_id);
  } catch (error) {
    console.error('Error fetching guests by wedding ID:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});
