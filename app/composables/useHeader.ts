import { useNuxtApp } from '#app';
import { computed, onMounted, watch } from 'vue';
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

  const token = useCookie('token', { watch: false });
  const isAuthenticated = computed(() => !!token.value);

  const route = useRoute();

  function syncActiveSection() {
    const admin = adminRoutes.value.find(item => {
      if (Array.isArray(item.activedPath)) {
        return item.activedPath.includes(route.path);
      }
      return item.activedPath === route.path;
    });
    if (admin) {
      appStore.setActiveSection(admin.name);
      return;
    }
    const guest = guestRoutes.value.find(item => item.activedPath === route.path);
    if (guest) {
      appStore.setActiveSection(guest.name);
      return;
    }
    appStore.setActiveSection('home');
  }

  onMounted(syncActiveSection);
  watch(() => route.path, syncActiveSection);

  const guestRoutes = computed<INavbarItem[]>(() => {
    return [
      { name: 'home', path: '/home', activedPath: '/home' },
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
    return item.activedPath === route.path;
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
