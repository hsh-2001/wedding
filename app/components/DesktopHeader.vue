<template>
  <header 
    class="w-full bg-(--color-surface) border-b border-(--color-border) sticky top-0 z-50 transition-colors duration-300 shadow-sm"
    :class="{ 'shadow-md': isScrolled }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

      <!-- Logo Section -->
      <div class="flex items-center gap-2 cursor-pointer group" @click="navigateTo('/')">
        <div class="relative w-10 h-10 overflow-hidden rounded-xl border border-(--color-border) shadow-sm transition-transform group-hover:scale-105">
          <img src="/icons/logo.png" class="w-full h-full object-cover" alt="Logo" />
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-tight text-(--text-main) transition-colors group-hover:text-(--color-primary)">
            {{ t('TEST') }}
          </span>
          <span class="text-[10px] font-semibold uppercase tracking-wider text-(--text-light)">Premium Store</span>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1">
        <template v-if="!isAuthenticated">
          <NuxtLink 
            v-for="routeItem in guestRoutes" 
            :key="routeItem.path" 
            :to="routeItem.path"
            class="nav-link"
            :class="{ 'active-link': isActivePath(routeItem) }"
          >
            {{ t(routeItem.name) }}
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink 
            v-for="routeItem in adminRoutes"
            :key="routeItem.path"
            :to="routeItem.path"
            class="nav-link"
            :class="{ 'active-link': isActivePath(routeItem) }"
          >
            {{ t(routeItem.name) }}
          </NuxtLink>
        </template>
      </nav>

      <div class="flex items-center gap-2">
        <!-- Language Select -->
        <div class="w-24">
          <el-select v-model="selectedLang" @change="changeLanguage" class="custom-select" size="default">
            <el-option label="English" value="en">
              <span class="flex items-center gap-2">🇺🇸 En</span>
            </el-option>
            <el-option label="ខ្មែរ" value="km">
              <span class="flex items-center gap-2">🇰🇭 Km</span>
            </el-option>
          </el-select>
        </div>

        <ThemeToggle />

        <el-button 
          v-if="!isAuthenticated" 
          type="primary" 
          class="!rounded-lg !font-bold !px-6 hover:!opacity-90 transition-all"
          @click="navigateTo('/admin/login')"
        >
          {{ t('Login') }}
        </el-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import useHeader from '../composables/useHeader'

const route = useRoute()
const { t, currentLocale, changeLanguage, isAuthenticated,
  guestRoutes,
  adminRoutes,
  isActivePath,
} = useHeader()

const selectedLang = ref(currentLocale.value)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style scoped>
@reference "@/assets/styles/main.css";

.nav-link {
  @apply px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200;
  color: var(--text-muted);
}

.nav-link:hover {
  background-color: var(--color-background);
  color: var(--text-main);
}

.active-link {
  background-color: var(--color-background);
  color: var(--color-primary) !important;
}
</style>