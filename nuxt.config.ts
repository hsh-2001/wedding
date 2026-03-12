import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["@/assets/styles/main.css"],
  devtools: { enabled: true },

  runtimeConfig: {
    pgConnectionString: process.env.NUXT_PG_CONNECTION_STRING,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ["@element-plus/nuxt", "@nuxtjs/i18n", "@pinia/nuxt"],

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
    langDir: "./locales/",
  },
});