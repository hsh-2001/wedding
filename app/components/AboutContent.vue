<template>
  <div class="min-h-screen bg-(--color-background) py-10 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-(--text-main)">
          {{ $t('About') }} <span class="text-pink-600">{{ $t('Our Wedding Store') }}</span>
        </h1>
        <div class="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-6"></div>
        <p class="text-(--text-muted) max-w-2xl mx-auto leading-relaxed">
          {{ $t('Crafting unforgettable moments since 2020. We believe every love story is unique and deserves a celebration that reflects its beauty.') }}
        </p>
      </div>

      <!-- Story Section -->
      <div class="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed" 
            :alt="$t('Our Story')" 
            class="rounded-lg shadow-sm w-full h-[350px] object-cover border border-(--color-border)"
          />
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-4 text-(--text-main)">{{ $t('Our Passion & Vision') }}</h2>
          <p class="text-(--text-muted) mb-4 leading-relaxed">
            {{ $t('What started as a small boutique for wedding invitations has grown into a full-service wedding planning and supply destination. Our mission is to simplify the wedding planning process while ensuring the highest quality and attention to detail.') }}
          </p>
          <p class="text-(--text-muted) mb-6 leading-relaxed">
            {{ $t(`We work with the best vendors and designers to bring you exclusive collections and services that you won't find anywhere else.`) }}
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="stat in stats" 
              :key="stat.label"
              class="p-4 bg-(--color-surface) rounded-lg border border-(--color-border) shadow-sm"
            >
              <div class="text-pink-600 font-bold text-xl mb-1">{{ stat.value }}</div>
              <div class="text-(--text-light) text-xs uppercase tracking-wider">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Choose Us -->
      <div class="bg-(--color-surface) rounded-lg p-8 md:p-10 border border-(--color-border) shadow-sm">
        <h2 class="text-2xl font-bold text-center mb-10 text-(--text-main)">{{ $t('Why Choose Us?') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="text-center">
            <div class="w-12 h-12 bg-pink-50 dark:bg-pink-900/20 rounded-md flex items-center justify-center mx-auto mb-4 text-pink-600">
              <svg v-if="feature.icon === 'sparkles'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <svg v-else-if="feature.icon === 'clock'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h2m-6 0h1m-4 6h1m8-10v4m-2 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-(--text-main)">{{ feature.title }}</h3>
            <p class="text-(--text-muted) text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { stats, features } = useAbout()
</script>
