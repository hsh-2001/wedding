import { useNuxtApp } from '#app';
import { computed } from 'vue';
import type { INavbarItem } from '~/models/navbar';
import { ChartGantt, Settings } from 'lucide-vue-next';

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

  const isAuthenticated = computed(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    const token = useCookie('token').value;     
    return !!token;
  });

  const route = useRoute();

  const guestRoutes = computed<INavbarItem[]>(() => {
    return [
      { name: 'home', path: '/', activedPath: '/' },
      { name: 'service', path: '/service', activedPath: '/service' },
      { name: 'about', path: '/about', activedPath: '/about' },
      { name: 'contact', path: '/contact', activedPath: '/contact' },
    ];
  });

  const adminRoutes = computed<INavbarItem[]>(() => {
    return [
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: ChartGantt,
        activedPath: '/admin/dashboard',
      },
      {
        name: 'Events',
        path: '/admin/events',
        icon: ChartGantt,
        activedPath: ['/admin/events', '/admin/events/wedding/create'],
      },
      {
        name: 'Settings',
        path: '/admin/settings',
        icon: Settings,
        activedPath: '/admin/settings'
      },
    ];
  });


  const isActivePath = computed(() => (item: INavbarItem) => {
    if (Array.isArray(item.activedPath)) {
      return item.activedPath.includes(route.path);
    }
    return route.path === item.activedPath;
  });

  return {
    currentLocale,
    getHeaderTitle,
    changeLanguage,
    t: i18n.t,
    locale: i18n.locale,
    isAuthenticated,
    guestRoutes,  
    adminRoutes,
    isActivePath,
  };
}