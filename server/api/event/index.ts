import eventService from "~~/server/services/eventService";

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const companyId = event.context.user?.company_id;

    try {
        switch (method) {
            case "POST":
                return ApiResponse.success('No POST method for event', null);
            case "GET":
                if (companyId) {
                    return await eventService.getEventByCompanyId(companyId);
                } else {
                    throw createError({
                        statusCode: 400,
                        statusMessage: 'Company ID is required',
                    });
                }
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
