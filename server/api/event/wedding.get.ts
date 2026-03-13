import weddingService from "~~/server/services/weddingService";

export default defineEventHandler(async (event) => {
  const company_id = 1;
  try {
    return await weddingService.getWeddingEventByCompanyId(company_id);
  } catch (error) {
    console.error('Error fetching wedding event:', error);
  }

});