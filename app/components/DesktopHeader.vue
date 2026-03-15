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
        <!-- Language & Theme Switchers Responsive -->
        <div class="hidden sm:block w-24">
          <el-select v-model="selectedLang" @change="changeLanguage" class="custom-select" size="default">
            <el-option label="English" value="en">
              <span class="flex items-center gap-2">🇺🇸 En</span>
            </el-option>
            <el-option label="ខ្មែរ" value="km">
              <span class="flex items-center gap-2">🇰🇭 Km</span>
            </el-option>
          </el-select>
        </div>
        <div class="sm:hidden flex items-center">
          <button @click="showLangSheet = true" class="p-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--text-main) text-lg">
            <span v-if="selectedLang === 'en'">🇺🇸</span>
            <span v-else>🇰🇭</span>
          </button>
        </div>

        <div class="hidden sm:block">
          <ThemeToggle />
        </div>
        <div class="sm:hidden flex items-center">
          <button @click="showThemeSheet = true" class="p-2 rounded-lg border border-(--color-border) bg-(--color-surface)">
            <span v-if="$colorMode.preference === 'light'">🌞</span>
            <span v-else-if="$colorMode.preference === 'dark'">🌙</span>
            <span v-else>🖥️</span>
          </button>
        </div>

        <el-button 
          v-if="!isAuthenticated" 
          type="primary" 
          class="!rounded-lg !font-bold !px-6 hover:!opacity-90 transition-all"
          @click="navigateTo('/admin/login')"
        >
          {{ t('Login') }}
        </el-button>

        <!-- Mobile Language Sheet -->
        <el-drawer v-model="showLangSheet" direction="rtl" size="60%" :with-header="false" class="sm:hidden simple-drawer">
          <div class="flex flex-col gap-2 p-4">
            <button @click="selectedLang = 'en'; changeLanguage('en'); showLangSheet = false" class="flex items-center gap-2 p-3 rounded border border-(--color-border) bg-white dark:bg-gray-900 text-base font-medium" :class="selectedLang === 'en' ? 'bg-pink-50' : ''">🇺🇸 English</button>
            <button @click="selectedLang = 'km'; changeLanguage('km'); showLangSheet = false" class="flex items-center gap-2 p-3 rounded border border-(--color-border) bg-white dark:bg-gray-900 text-base font-medium" :class="selectedLang === 'km' ? 'bg-pink-50' : ''">🇰🇭 Khmer</button>
          </div>
        </el-drawer>
        <!-- Mobile Theme Sheet -->
        <el-drawer v-model="showThemeSheet" direction="rtl" size="60%" :with-header="false" class="sm:hidden simple-drawer">
          <div class="flex flex-col gap-2 p-4">
            <button @click="$colorMode.preference = 'light'; showThemeSheet = false" class="flex items-center gap-2 p-3 rounded border border-(--color-border) bg-white dark:bg-gray-900 text-base font-medium" :class="$colorMode.preference === 'light' ? 'bg-pink-50' : ''">🌞 Light</button>
            <button @click="$colorMode.preference = 'dark'; showThemeSheet = false" class="flex items-center gap-2 p-3 rounded border border-(--color-border) bg-white dark:bg-gray-900 text-base font-medium" :class="$colorMode.preference === 'dark' ? 'bg-pink-50' : ''">🌙 Dark</button>
            <button @click="$colorMode.preference = 'system'; showThemeSheet = false" class="flex items-center gap-2 p-3 rounded border border-(--color-border) bg-white dark:bg-gray-900 text-base font-medium" :class="$colorMode.preference === 'system' ? 'bg-pink-50' : ''">🖥️ System</button>
          </div>
        </el-drawer>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'
import { navigateTo } from 'nuxt/app'
import useHeader from '../composables/useHeader'

let $colorMode
try {
  $colorMode = useColorMode()
} catch (e) {
  $colorMode = { preference: ref('light') }
}

const { t, currentLocale, changeLanguage, isAuthenticated,
  guestRoutes,
  adminRoutes,
  isActivePath,
} = useHeader()

const selectedLang = ref(currentLocale.value)
const isScrolled = ref(false)
const showLangSheet = ref(false)
const showThemeSheet = ref(false)

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
.simple-drawer .el-drawer__body {
  padding-bottom: 0 !important;
}
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