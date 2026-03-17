<template>
  <div class="min-h-screen bg-(--color-background) py-10 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-(--text-main)">
          {{ $t('Get in') }} <span class="text-pink-600">{{ $t('Touch') }}</span>
        </h1>
        <div class="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-6"></div>
        <p class="text-(--text-muted) max-w-2xl mx-auto">
          {{ $t(`Have questions about our services or want to start planning your big day? We're here to help!`) }}
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Contact Info -->
        <div class="space-y-6">
          <div class="bg-(--color-surface) p-6 rounded-lg border border-(--color-border) shadow-sm">
            <h3 class="text-lg font-bold mb-6 text-(--text-main)">{{ $t('Contact Information') }}</h3>
            
            <div class="space-y-5">
              <div v-for="info in contactInfo" :key="info.title" class="flex items-start gap-4">
                <div class="w-9 h-9 bg-pink-50 dark:bg-pink-900/20 rounded-md flex items-center justify-center shrink-0 text-pink-600 border border-pink-100 dark:border-pink-800">
                  <svg v-if="info.icon === 'location'" xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-else-if="info.icon === 'phone'" xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-[10px] uppercase tracking-wider text-(--text-light) mb-0.5">{{ info.title }}</p>
                  <p class="text-sm text-(--text-main)">{{ info.value }}</p>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-(--color-border)">
              <h4 class="text-xs font-bold mb-3 text-(--text-light) uppercase tracking-wider">{{ $t('Follow Us') }}</h4>
              <div class="flex gap-3">
                <a href="#" class="w-8 h-8 bg-(--color-background) rounded-md flex items-center justify-center border border-(--color-border) hover:border-pink-500 hover:text-pink-500 transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" class="w-8 h-8 bg-(--color-background) rounded-md flex items-center justify-center border border-(--color-border) hover:border-pink-500 hover:text-pink-500 transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-(--color-surface) p-6 md:p-8 rounded-lg border border-(--color-border) shadow-sm">
            <h3 class="text-xl font-bold mb-6 text-(--text-main)">{{ $t('Send us a Message') }}</h3>
            
            <form @submit.prevent="submitForm" class="grid md:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-(--text-main) uppercase tracking-wide">{{ $t('First Name') }}</label>
                <input v-model="form.firstName" type="text" class="w-full bg-(--color-background) border border-(--color-border) rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all placeholder:text-gray-400" :placeholder="$t('First Name')" />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-(--text-main) uppercase tracking-wide">{{ $t('Last Name') }}</label>
                <input v-model="form.lastName" type="text" class="w-full bg-(--color-background) border border-(--color-border) rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all placeholder:text-gray-400" :placeholder="$t('Last Name')" />
              </div>
              <div class="space-y-1.5 md:col-span-2">
                <label class="text-xs font-bold text-(--text-main) uppercase tracking-wide">{{ $t('Email Address') }}</label>
                <input v-model="form.email" type="email" class="w-full bg-(--color-background) border border-(--color-border) rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all placeholder:text-gray-400" :placeholder="$t('Email Address')" />
              </div>
              <div class="space-y-1.5 md:col-span-2">
                <label class="text-xs font-bold text-(--text-main) uppercase tracking-wide">{{ $t('Subject') }}</label>
                <input v-model="form.subject" type="text" class="w-full bg-(--color-background) border border-(--color-border) rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all placeholder:text-gray-400" :placeholder="$t('How can we help?')" />
              </div>
              <div class="space-y-1.5 md:col-span-2">
                <label class="text-xs font-bold text-(--text-main) uppercase tracking-wide">{{ $t('Message') }}</label>
                <textarea v-model="form.message" rows="4" class="w-full bg-(--color-background) border border-(--color-border) rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all resize-none placeholder:text-gray-400" :placeholder="$t('Your message here...')"></textarea>
              </div>
              
              <div class="md:col-span-2 pt-2">
                <button type="submit" class="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold py-2.5 px-10 rounded-md text-sm shadow-sm transition-all active:scale-95">
                  {{ $t('Send Message') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { form, contactInfo, submitForm } = useContact()
</script>
