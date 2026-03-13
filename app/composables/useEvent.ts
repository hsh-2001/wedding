import { ref } from 'vue'
import { upsertEventApi } from '../utils/apiCalling'
import notificationHelper from '../utils/notificationHelper'
import { WeddingEventList } from '~/models/event'

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

  const eventModel = ref<IWeddingUpsertInput>({
    company_id: 1,
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
      const result = await upsertEventApi(eventModel.value)
      notificationHelper.success('Event created successfully')
      console.log('Upsert result:', result)
    } catch (error) {
      console.error('Error creating event:', error)
      notificationHelper.error('Failed to create event')
    } finally {
      loading.value = false
    }
  }

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


  return {
    loading,
    form,
    rules,
    handleUpsertEvent,
    eventModel,
    weddingEventList,
    getWeddingEvent,
  }
}
