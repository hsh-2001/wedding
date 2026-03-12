import { ref } from 'vue'
import { upsertEventApi } from '../utils/apiCalling'
import notificationHelper from '../utils/notificationHelper'

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

  async function submit(formRef: any) {
    if (!formRef) return
    await formRef.validate(async (valid: boolean) => {
      if (valid) {
        loading.value = true
        try {
          const res = await upsertEventApi(form.value)
          if (res.status_code === 200) {
            notificationHelper.success('Event saved!')
          } else {
            notificationHelper.error(res.message || 'Save failed.')
          }
        } catch (err: any) {
          notificationHelper.error(err.message || 'Server error.')
        } finally {
          loading.value = false
        }
      }
    })
  }

  return { loading, form, rules, submit }
}
