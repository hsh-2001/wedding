import { readBody } from "h3";
import eventService from "~~/server/services/eventService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing request body',
    });
  }

  try {
    return await eventService.upsertGuest(body);
  } catch (error) {
    console.error('Error upserting guest:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});