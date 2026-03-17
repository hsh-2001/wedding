export const useContact = () => {
  const { t } = useI18n()

  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactInfo = computed(() => [
    {
      title: t('Our Location'),
      value: '123 Wedding Lane, Phnom Penh, Cambodia',
      icon: 'location'
    },
    {
      title: t('Phone Number'),
      value: '+855 12 345 678',
      icon: 'phone'
    },
    {
      title: t('Email Address'),
      value: 'hello@weddingstore.com',
      icon: 'email'
    }
  ])

  const submitForm = async () => {
    // Logic for form submission
    // Add notification or API call here
  }

  return {
    form,
    contactInfo,
    submitForm
  }
}
