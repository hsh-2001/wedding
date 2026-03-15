

import { getHeader } from 'h3';
import tokenService from "../services/tokenService";

export default defineEventHandler(async (event) => {
  const ignoredPaths = [
    '/api/auth/login',
    '/api/auth/register',
  ];
  if (ignoredPaths.includes(event.node.req.url || '') || (!event.node.req.url?.includes('/api'))) {
    return;
  }
  const authHeader = getHeader(event, 'authorization');

  let token: string | undefined;
  if (authHeader && typeof authHeader === 'string') {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token missing',
    });
  }

  try {
    const decoded = tokenService.verifyToken(token);
    if (!decoded) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      });
    }
    event.context.user = decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    });
  }
});