import { useNuxtApp } from '#app';
import { computed } from 'vue';

export default function useHeader() {
  const nuxtApp = useNuxtApp();
  const appStore = useAppStore();
  const i18n = nuxtApp.$i18n;

  const currentLocale = computed(() => i18n.locale);

  function getHeaderTitle(key: string) {
    return i18n.t(key);
  }

  function changeLanguage(lang: 'en' | 'km') {
    appStore.setLocale(lang);
    i18n.setLocale(lang);
  }

  return {
    currentLocale,
    getHeaderTitle,
    changeLanguage,
    t: i18n.t,
    locale: i18n.locale
  };
};