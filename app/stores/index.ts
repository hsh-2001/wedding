import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentLocale: 'en',
    activeSection: 'home',
  }),
  actions: {
    setLocale(locale: string) {
      this.currentLocale = locale   
    },
    setActiveSection(section: string) {
      this.activeSection = section
    },
  },
})
