import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['@/assets/styles/main.css'],
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    pgConnectionString: process.env.NUXT_PG_CONNECTION_STRING,
  },

  modules: ['@nuxtjs/i18n', '@element-plus/nuxt'],
})