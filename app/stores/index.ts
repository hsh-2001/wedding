import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentLocale: 'en',
  }),
  actions: {
    setLocale(locale: string) {
      this.currentLocale = locale   
    },
  },
})