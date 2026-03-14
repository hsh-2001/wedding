export const useAbout = () => {
  const stats = ref([
    { label: 'Weddings Planned', value: '500+' },
    { label: 'Happy Couples', value: '100%' },
  ])

  const features = ref([
    {
      title: 'Exquisite Design',
      description: 'Every detail is meticulously crafted to ensure your wedding looks as beautiful as you imagined.',
      icon: 'sparkles'
    },
    {
      title: 'Reliability',
      description: 'We value your time and trust. We guarantee on-time delivery and professional service for every event.',
      icon: 'clock'
    },
    {
      title: 'Personalized Service',
      description: 'Your wedding should be personal. We offer custom packages tailored specifically to your needs and budget.',
      icon: 'user'
    }
  ])

  return {
    stats,
    features
  }
}
