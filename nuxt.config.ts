import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["@/assets/styles/main.css", "@/assets/styles/element-plus.css", "element-plus/theme-chalk/dark/css-vars.css"],
  devtools: { enabled: true },

  runtimeConfig: {
    pgConnectionString: process.env.NUXT_PG_CONNECTION_STRING,
    JWT_SECRET: process.env.NUXT_JWT_SECRET,
    JWT_EXPIRES_IN: process.env.NUXT_JWT_EXPIRES_IN || "1h",
  },
  routeRules: {
    // "/api/auth/**": { appMiddleware: false },
    // "/api/**": { appMiddleware: "auth" },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ["@element-plus/nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "km",
        name: "Khmer",
        file: "km.json",
      },
    ],
    defaultLocale: "en",
    strategy: 'no_prefix',
  },
});