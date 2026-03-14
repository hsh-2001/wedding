export const useContact = () => {
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactInfo = ref([
    {
      title: 'Our Location',
      value: '123 Wedding Lane, Phnom Penh, Cambodia',
      icon: 'location'
    },
    {
      title: 'Phone Number',
      value: '+855 12 345 678',
      icon: 'phone'
    },
    {
      title: 'Email Address',
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
