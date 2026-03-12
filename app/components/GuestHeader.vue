<template>
  <header class="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">

    <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img src="/icons/logo.png" class="h-11 w-11 rounded-xl shadow border border-white/40" />

        <span class="text-xl md:text-2xl font-bold text-primary">
          {{ t('header.title') }}
        </span>
      </div>

      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink to="/" :class="['nav-link', $route.path === '/' ? 'active-link' : '']">{{ t('home') }}</NuxtLink>
        <NuxtLink to="/service" :class="['nav-link', $route.path === '/service' ? 'active-link' : '']">{{ t('service') }}</NuxtLink>
        <NuxtLink to="/about" :class="['nav-link', $route.path === '/about' ? 'active-link' : '']">{{ t('about') }}</NuxtLink>
        <NuxtLink to="/contact" :class="['nav-link', $route.path === '/contact' ? 'active-link' : '']">{{ t('contact') }}</NuxtLink>
      </nav>

      <div class="flex items-center gap-3 w-auto">

        <div class="w-24">
          <el-select v-model="selectedLang" @change="changeLanguage">

            <el-option label="English" name="en" value="en" />
            <el-option label="ខ្មែរ" name="km" value="km" />
          </el-select>
        </div>

        <el-button v-if="!isAuthenticated" type="primary" plain @click="navigateTo('/admin/login')">
          Admin Login
        </el-button>

        <button class="md:hidden p-2 rounded-lg hover:bg-gray-100" @click="toggleMenu">

          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </div>

    <div v-if="mobileMenu" class="md:hidden border-t bg-white">

      <nav class="flex flex-col p-4 gap-3">
        <NuxtLink to="/" :class="['mobile-link', $route.path === '/' ? 'active-link-mobile' : '']">{{ t('home') }}</NuxtLink>
        <NuxtLink to="/about" :class="['mobile-link', $route.path === '/about' ? 'active-link-mobile' : '']">{{ t('about') }}</NuxtLink>
        <NuxtLink to="/contact" :class="['mobile-link', $route.path === '/contact' ? 'active-link-mobile' : '']">{{ t('contact') }}</NuxtLink>

        <NuxtLink v-if="!isAuthenticated" to="/admin/login" class="bg-pink-500 text-white px-4 py-2 rounded-lg text-center font-semibold">
          Admin Login
        </NuxtLink>
      </nav>

    </div>

  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useHeader from '../composables/useHeader'

const { t, currentLocale, changeLanguage, isAuthenticated } = useHeader()

const selectedLang = ref(currentLocale.value)
const mobileMenu = ref(false)

const toggleMenu = () => {
  mobileMenu.value = !mobileMenu.value
}

</script>

<style scoped>
.nav-link {
  font-weight: 600;
  color: #444;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all .25s;
}

.nav-link:hover {
  background: #fdf2f8;
  color: #ec4899;
}

.active-link {
  background: #fdf2f8;
  color: #ec4899;
}

.mobile-link {
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
  transition: 0.2s;
}

.mobile-link:hover {
  background: #f3f4f6;
}

.active-link-mobile {
  background: #f3f4f6;
  color: #ec4899;
}
</style>