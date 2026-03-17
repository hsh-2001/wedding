export const useAbout = () => {
  const { t } = useI18n()

  const stats = computed(() => [
    { label: t('Weddings Planned'), value: '500+' },
    { label: t('Happy Couples'), value: '100%' },
  ])

  const features = computed(() => [
    {
      title: t('Exquisite Design'),
      description: t('Every detail is meticulously crafted to ensure your wedding looks as beautiful as you imagined.'),
      icon: 'sparkles'
    },
    {
      title: t('Reliability'),
      description: t('We value your time and trust. We guarantee on-time delivery and professional service for every event.'),
      icon: 'clock'
    },
    {
      title: t('Personalized Service'),
      description: t('Your wedding should be personal. We offer custom packages tailored specifically to your needs and budget.'),
      icon: 'user'
    }
  ])

  return {
    stats,
    features
  }
}
