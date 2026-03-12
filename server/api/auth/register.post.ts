import { readBody } from 'h3';
import { registerUser } from '~~/server/services/userService';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;

  return await registerUser(username, email, password);
});

