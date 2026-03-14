import { IUpsertGuestRequest } from "~~/shared/types/guest";
import eventRepository from "../repositories/eventRepository";

const upsertGuest = async (guest: IUpsertGuestRequest) => {
  return await eventRepository.upsertGuest(guest);
}

const getGuestsByWeddingId = async (weddingId: string, limit = 25, offset = 0) => {
  return await eventRepository.getGuestsByWeddingId(weddingId, limit, offset);
}

export default {
  upsertGuest,
  getGuestsByWeddingId,
}