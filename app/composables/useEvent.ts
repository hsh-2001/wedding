import { ref } from 'vue'
import { upsertEventApi, getWeddingEventApi, getWeddingEventByIdApi } from '../utils/apiCalling'
import notificationHelper from '../utils/notificationHelper'
import { WeddingEventList } from '~/models/event'
import type { IWeddingUpsertInput } from '~/../shared/types/wedding'
import type { IEvent } from '~/types/event'

export function useEvent() {
  const loading = ref(false)
  const form = ref({
    company_id: 1,
    bride_name: '',
    groom_name: '',
    wedding_date: '',
    venue_name: '',
    venue_address: '',
    description: ''
  })

  const rules = {
    bride_name: [
      { required: true, message: 'Bride name is required', trigger: 'blur' }
    ],
    groom_name: [
      { required: true, message: 'Groom name is required', trigger: 'blur' }
    ],
    wedding_date: [
      { required: true, message: 'Wedding date is required', trigger: 'blur' }
    ]
  }

  const weddingModel = ref<IWeddingUpsertInput>({
    company_id: 1,
    event_id: '',
    owner_username: '',
    owner_password: '',
    bride_name: '',
    groom_name: '',
    wedding_date: '',
    venue_name: '',
    venue_address: '',
    description: ''
  })

  const handleUpsertEvent = async () => {
    loading.value = true
    try {
      const result = await upsertEventApi(weddingModel.value)
      notificationHelper.success('Event saved successfully')
    } catch (error) {
      console.error('Error saving event:', error)
      notificationHelper.error('Failed to save event')
    } finally {
      loading.value = false
    }
  }

  const eventList = ref<IEvent[]>([])
  const getEventByCompanyId = async () => {
    loading.value = true
    try {
      const result = await getEventByCompanyIdApi();
      if (result.isSuccess && result.data) {
        eventList.value = result.data;
      }
    } catch (error) {
      console.error('Error fetching event by company ID:', error);
    } finally {
      loading.value = false;
    }
  };

  const weddingEventList = ref<WeddingEventList[]>([])
  const getWeddingEvent = async () => {
    loading.value = true
    try {
      const result = await getWeddingEventApi();
      if (result.isSuccess && result.data) {
        weddingEventList.value = result.data.map(event => new WeddingEventList(event));
      }
    } catch (error) {
      console.error('Error fetching wedding event:', error);
    } finally {
      loading.value = false;
    }
  }

  const getWeddingEventById = async (id: string) => {
    loading.value = true
    try {
      const result = await getWeddingEventByIdApi(id);
      if (result.isSuccess && result.data) {
        weddingModel.value = {
          id: result.data.id,
          event_id:  '',
          owner_username: '',
          owner_password: '',
          company_id: result.data.company_id,
          bride_name: result.data.bride_name || '',
          groom_name: result.data.groom_name || '',
          wedding_date: result.data.wedding_date ? new Date(result.data.wedding_date).toISOString().split('T')[0] as string : '',
          venue_name: result.data.venue_name || '',
          venue_address: result.data.venue_address || '',
          description: result.data.description || ''
        }
      }
    } catch (error) {
      console.error('Error fetching wedding event by ID:', error);
    } finally {
      loading.value = false;
    }
  }


  return {
    loading,
    form,
    rules,
    handleUpsertEvent,
    weddingModel,
    weddingEventList,
    getWeddingEvent,
    getWeddingEventById,
    getEventByCompanyId,
    eventList,
  }
}
