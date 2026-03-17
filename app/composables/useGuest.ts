import { upsertGuestApi } from "~/utils/apiCalling";
import { GuestResponse, type IGuest, type IUpsertGuestRequest } from "~~/shared/types/guest";
import LZString from "lz-string";

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
        is_invited: false,
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
    const searchValue = ref('');
    const getGuestsByWeddingId = async (weddingId: string, limit = 10, page = 1) => {
        try {
            const response = await getGuestsByWeddingIdApi(weddingId, limit, page, searchValue.value);
            if (response.isSuccess) {
                guestList.value = response.data?.map(guest => new GuestResponse(guest)) || [];
            }
        } catch (error) {
            console.error('Failed to retrieve guests:', error);
        }
    }

    const onPageChange = (currentPage: number, pageSize: number) => {
        getGuestsByWeddingId(weddingId, 10, currentPage);
    }

    const onSearch = () => {
        getGuestsByWeddingId(weddingId, 10, 1);
    }

    const buildInvitationShareData = (data: IGuest) => {
        const guest = {
            n: data.name,
            t: data.title,
            p: data.phone,
            e: data.email,
            c: data.invitation_code,
            r: data.remark,
        }
        const compressedData = LZString.compressToEncodedURIComponent(JSON.stringify(guest));
        const idCompress = LZString.compressToEncodedURIComponent(weddingId);
        return {
            title: 'You are invited to our wedding!',
            text: `Dear ${data.name}, you are invited to our wedding! Please use the invitation code ${data.invitation_code} to RSVP and find more details.`,
            url: `${window.location.origin}/shares/${idCompress}?v=${compressedData}`,
        };
    }

    const handleShareEvent = (data: IGuest) => {
        const shareData = buildInvitationShareData(data);
        navigator.share(shareData).then(() => {
        }).catch((error) => {
            console.error('Error sharing event details:', error);
        });
    }

    const onCloseDialog = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        upsertGuestModel.value = {
            wedding_id: weddingId || '',
            group_id: '1',
            name: '',
            title: '',
            phone: '',
            email: '',
            invitation_code: '',
            remark: '',
        };
    };

    const onClickEdit = (data: IUpsertGuestRequest) => {
        dialogVisible.value = true;
        upsertGuestModel.value = { ...data };
    };

    return {
        upsertGuestModel,
        upsertGuest,
        getGuestsByWeddingId,
        guestList,
        dialogVisible,
        buildInvitationShareData,
        handleShareEvent,
        onClickEdit,
        onCloseDialog,
        onPageChange,
        onSearch,
        searchValue,
    };
};
