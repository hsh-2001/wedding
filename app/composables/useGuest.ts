import { upsertGuestApi } from "~/utils/apiCalling";
import { GuestResponse, type IUpsertGuestRequest } from "~~/shared/types/guest";

export default function useGuest() {
    const route = useRoute();
    const weddingId = route.params.id as string;
    const dialogVisible = ref(false);
    const upsertGuestModel = ref<IUpsertGuestRequest>({
        wedding_id: weddingId || '',
        group_id: '1',
        name: '',
        title: '',
        phone: '',
        email: '',
        invitation_code: '',
        remark: '',
    });

    const randomInvitationCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomPart = '';
        for (let i = 0; i < 4; i++) {
            randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const namePart = (upsertGuestModel.value.name || '')
            .replace(/[^A-Za-z0-9]/g, '')
            .toUpperCase()
            .slice(0, 4);
        const weddingPart = (weddingId || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 4);
        return `${weddingPart}-${namePart}-${randomPart}`;
    };

    const upsertGuest = async () => {
        try {
            upsertGuestModel.value.invitation_code = randomInvitationCode();
            const response = await upsertGuestApi(upsertGuestModel.value);
            if (response.isSuccess) {
               await getGuestsByWeddingId(weddingId);
               dialogVisible.value = false;
            }
        } catch (error) {
            console.error('Failed to upsert guest:', error);
        }
    }


    const guestList = ref<GuestResponse[]>([]);
    const getGuestsByWeddingId = async (weddingId: string, limit = 25, offset = 0) => {
        try {
            const response = await getGuestsByWeddingIdApi(weddingId, limit, offset);
            if (response.isSuccess) {
                guestList.value = response.data?.map(guest => new GuestResponse(guest)) || [];
            }
        } catch (error) {
            console.error('Failed to retrieve guests:', error);
        }
    }

    return {
        upsertGuestModel,
        upsertGuest,
        getGuestsByWeddingId,
        guestList,
        dialogVisible,
    };
};