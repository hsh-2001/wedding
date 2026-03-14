<template>
  <nav class="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto min-w-[280px]">
    <div class="relative bg-(--color-surface)/90 backdrop-blur-lg border border-(--color-border) rounded-2xl p-2 shadow-xl flex items-center justify-around gap-2 px-4 transition-colors duration-300">
      
      <!-- Navigation Items -->
      <NuxtLink 
        v-for="routeItem in activeRoutes" 
        :key="routeItem.path" 
        :to="routeItem.path"
        class="relative flex items-center justify-center w-14 h-12 rounded-xl transition-all duration-200"
        :class="[isActivePath(routeItem) ? 'bg-(--color-background) text-(--color-primary)' : 'text-(--text-muted) hover:bg-(--color-background)/50']"
      >
        <component 
          :is="getIcon(routeItem)" 
          class="w-6 h-6 transition-transform duration-200"
          :class="{ 'scale-110': isActivePath(routeItem) }"
        />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useHeader from '../composables/useHeader'
import { 
  Home, 
  Briefcase, 
  Info, 
  Phone,
  LayoutDashboard,
  Calendar,
  Settings
} from 'lucide-vue-next'

const { t, isAuthenticated, guestRoutes, adminRoutes, isActivePath } = useHeader()

const activeRoutes = computed(() => isAuthenticated.value ? adminRoutes.value : guestRoutes.value)

const getIcon = (routeItem: any) => {
  if (routeItem.icon) return routeItem.icon
  
  const icons: Record<string, any> = {
    'home': Home,
    'service': Briefcase,
    'about': Info,
    'contact': Phone,
    'dashboard': LayoutDashboard,
    'events': Calendar,
    'settings': Settings
  }
  return icons[routeItem.name] || Info
}
</script>
