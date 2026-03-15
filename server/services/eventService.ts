import { IUpsertGuestRequest } from "~~/shared/types/guest";
import eventRepository from "../repositories/eventRepository";
import { registerUser } from "./userService";
import userRepository from "../repositories/userRepository";


const upsertWeddingEvent = async (request: any) => {
  let { owner_username, owner_email, owner_password } = request;
  owner_email = `${owner_username}@gmail.com`;
  const existing = await userRepository.findUserByUsernameOrEmail(owner_username, owner_email);
  if (existing.length > 0) {
    request.owner_id = existing[0]?.id;
    return eventRepository.upsertWeddingEvent(request);
  }
  const roleId = 2;
  const user = await registerUser(owner_username, owner_email, owner_password, roleId);
  request.owner_id = user.data?.user_id;
  return await eventRepository.upsertWeddingEvent(request);
}

const upsertGuest = async (guest: IUpsertGuestRequest) => {
  return await eventRepository.upsertGuest(guest);
}

const getGuestsByWeddingId = async (weddingId: string, limit = 25, offset = 0) => {
  return await eventRepository.getGuestsByWeddingId(weddingId, limit, offset);
}

const getEventByCompanyId = async (companyId: number) => {
  const result = await eventRepository.getEventByCompanyId(companyId);
  return ApiResponse.success('Events retrieved successfully', result);
}

export default {
  upsertGuest,
  getGuestsByWeddingId,
  getEventByCompanyId,
  upsertWeddingEvent,
}