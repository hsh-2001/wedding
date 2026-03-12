import { readBody } from 'h3';
import { loginUser } from '../../services/userService';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  return await loginUser(username, password);
});
