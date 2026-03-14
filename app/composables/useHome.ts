export const useHome = () => {
  const appStore = useAppStore()

  const homeSection = ref<HTMLElement | null>(null)
  const serviceSection = ref<HTMLElement | null>(null)
  const aboutSection = ref<HTMLElement | null>(null)
  const contactSection = ref<HTMLElement | null>(null)

  const scrollToService = () => {
    serviceSection.value?.scrollIntoView({ behavior: 'smooth' })
  }

  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          appStore.setActiveSection(id)
        }
      })
    }, options)

    if (homeSection.value) observer.observe(homeSection.value)
    if (serviceSection.value) observer.observe(serviceSection.value)
    if (aboutSection.value) observer.observe(aboutSection.value)
    if (contactSection.value) observer.observe(contactSection.value)
  }

  const destroyObserver = () => {
    if (observer) {
      observer.disconnect()
    }
  }

  return {
    homeSection,
    serviceSection,
    aboutSection,
    contactSection,
    scrollToService,
    initObserver,
    destroyObserver
  }
}
