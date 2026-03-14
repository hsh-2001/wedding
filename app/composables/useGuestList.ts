import { ref } from 'vue';
import { getGuestsByWeddingIdApi } from '~/utils/guestApi';

export function useGuestList() {
  const guests = ref([]);
  const loading = ref(false);
  const error = ref('');

  const fetchGuests = async (wedding_id: string) => {
    loading.value = true;
    error.value = '';
    try {
      const result = await getGuestsByWeddingIdApi(wedding_id);
      if (result.isSuccess && result.data) {
        guests.value = result.data as never[];
      } else {
        error.value = result.message || 'Failed to fetch guests';
      }
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch guests';
    } finally {
      loading.value = false;
    }
  };

  return { guests, loading, error, fetchGuests };
}
