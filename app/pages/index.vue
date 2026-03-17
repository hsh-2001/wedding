<template>
  <main class="min-h-screen bg-(--color-background) text-(--text-main)">
    <section class="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-10">
      <div class="flex flex-col gap-4 rounded-2xl border border-(--color-border) bg-(--color-surface) px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-3">
            <img src="/icons/logo.png" alt="Wedding logo" class="h-12 w-12 rounded-xl border border-(--color-border) object-cover shadow-sm" />
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--color-primary)">{{ t('Landing Badge') }}</p>
              <h1 class="text-lg font-semibold tracking-tight">{{ t('Our Wedding Store') }}</h1>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div class="inline-flex items-center gap-1 rounded-xl border border-(--color-border) bg-(--color-background) p-1">
              <span class="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--text-light)">{{ t('Landing Language') }}</span>
              <button
                v-for="option in locales"
                :key="option.code"
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-semibold transition"
                :class="selectedLang === option.code ? 'bg-(--color-primary) text-white' : 'text-(--text-muted) hover:bg-(--color-surface) hover:text-(--text-main)'"
                @click="changeLanguage(option.code)"
              >
                {{ option.label }}
              </button>
            </div>

            <div class="inline-flex items-center rounded-xl border border-(--color-border) bg-(--color-background) px-3 py-2">
              <ThemeToggle />
            </div>

            <NuxtLink
              to="/admin/login"
              class="inline-flex items-center justify-center rounded-xl border border-(--color-border) bg-(--color-background) px-5 py-2.5 text-sm font-semibold text-(--text-main) transition hover:text-(--color-primary)"
            >
              {{ t('Admin') }}
            </NuxtLink>
          </div>
      </div>

      <div class="grid items-center gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-10">
        <div class="space-y-6">
          <div class="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm sm:p-8">
            <p class="inline-flex rounded-lg bg-(--color-background) px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-(--color-primary)">
              {{ t('Landing Showcase Label') }}
            </p>
            <h2 class="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {{ t('Landing Hero Title') }}
              <span class="block text-(--color-primary)">{{ t('Landing Hero Accent') }}</span>
            </h2>
            <p class="mt-4 max-w-2xl text-base leading-7 text-(--text-muted)">
              {{ t('Landing Hero Description') }}
            </p>

            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/home"
                class="inline-flex items-center justify-center rounded-xl bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {{ t('Landing Primary CTA') }}
              </NuxtLink>
              <NuxtLink
                to="/service"
                class="inline-flex items-center justify-center rounded-xl border border-(--color-border) bg-(--color-background) px-6 py-3 text-sm font-semibold text-(--text-main) transition hover:text-(--color-primary)"
              >
                {{ t('Landing Secondary CTA') }}
              </NuxtLink>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div
              v-for="item in stats"
              :key="item.label"
              class="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm"
            >
              <p class="text-2xl font-semibold">{{ item.value }}</p>
              <p class="mt-2 text-sm text-(--text-muted)">{{ item.label }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
              alt="Wedding celebration"
              class="h-[260px] w-full object-cover sm:h-[320px]"
            />
            <div class="space-y-4 p-6">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-(--color-primary)">{{ t('Landing Story Eyebrow') }}</p>
                <h3 class="mt-2 text-2xl font-semibold">{{ t('Landing Story Title') }}</h3>
                <p class="mt-3 text-sm leading-7 text-(--text-muted)">
                  {{ t('Landing Story Description') }}
                </p>
              </div>
              <div class="rounded-2xl bg-(--color-background) p-5">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary)">{{ t('Landing Promise') }}</p>
                <p class="mt-3 text-sm leading-7 text-(--text-main)">
                  {{ t('Landing Quote') }}
                </p>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm"
            >
              <div class="mb-4 inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-(--color-background) px-3 text-sm font-semibold text-(--color-primary)">
                {{ feature.icon }}
              </div>
              <h4 class="text-base font-semibold">{{ feature.title }}</h4>
              <p class="mt-2 text-sm leading-6 text-(--text-muted)">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 pb-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section class="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
            {{ t('Landing Section Planner Eyebrow') }}
          </p>
          <h3 class="mt-3 text-2xl font-semibold">
            {{ t('Landing Section Planner Title') }}
          </h3>
          <p class="mt-3 text-sm leading-7 text-(--text-muted)">
            {{ t('Landing Section Planner Description') }}
          </p>

          <div class="mt-6 space-y-3">
            <div
              v-for="step in steps"
              :key="step.title"
              class="rounded-2xl border border-(--color-border) bg-(--color-background) p-4"
            >
              <div class="flex items-start gap-3">
                <div class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-(--color-primary) text-sm font-semibold text-white">
                  {{ step.number }}
                </div>
                <div>
                  <h4 class="text-sm font-semibold">{{ step.title }}</h4>
                  <p class="mt-1 text-sm leading-6 text-(--text-muted)">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
                {{ t('Landing Form Eyebrow') }}
              </p>
              <h3 class="mt-2 text-2xl font-semibold">
                {{ t('Landing Form Title') }}
              </h3>
            </div>
            <p class="text-sm text-(--text-muted)">
              {{ t('Landing Form Helper') }}
            </p>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="submitPreviewForm">
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="space-y-2">
                <span class="text-sm font-medium">{{ t('Full name') }}</span>
                <input
                  v-model="previewForm.name"
                  type="text"
                  class="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-(--text-main) outline-none transition placeholder:text-(--text-light) focus:border-(--color-primary)"
                  :placeholder="t('Landing Form Name Placeholder')"
                />
              </label>

              <label class="space-y-2">
                <span class="text-sm font-medium">{{ t('Phone') }}</span>
                <input
                  v-model="previewForm.phone"
                  type="text"
                  class="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-(--text-main) outline-none transition placeholder:text-(--text-light) focus:border-(--color-primary)"
                  :placeholder="t('Landing Form Phone Placeholder')"
                />
              </label>
            </div>

            <label class="space-y-2">
              <span class="text-sm font-medium">{{ t('Will you attend?') }}</span>
              <select
                v-model="previewForm.attendance"
                class="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-(--text-main) outline-none transition focus:border-(--color-primary)"
              >
                <option value="">{{ t('Landing Form Attendance Placeholder') }}</option>
                <option value="yes">{{ t('Yes, I will attend') }}</option>
                <option value="no">{{ t('Sorry, I cannot attend') }}</option>
              </select>
            </label>

            <label class="space-y-2">
              <span class="text-sm font-medium">{{ t('Message') }}</span>
              <textarea
                v-model="previewForm.message"
                rows="4"
                class="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-(--text-main) outline-none transition placeholder:text-(--text-light) focus:border-(--color-primary)"
                :placeholder="t('Landing Form Message Placeholder')"
              />
            </label>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-(--text-muted)">
                {{ formMessage || t('Landing Form Footnote') }}
              </p>
              <div class="flex gap-3">
                <NuxtLink
                  to="/home"
                  class="inline-flex items-center justify-center rounded-xl border border-(--color-border) bg-(--color-background) px-5 py-3 text-sm font-semibold text-(--text-main) transition hover:text-(--color-primary)"
                >
                  {{ t('Landing Form Secondary CTA') }}
                </NuxtLink>
                <button
                  type="submit"
                  class="inline-flex items-center justify-center rounded-xl bg-(--color-primary) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {{ t('Landing Form Primary CTA') }}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const nuxtApp = useNuxtApp()
const appStore = useAppStore()
const { t, locale, setLocale } = nuxtApp.$i18n

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'km', label: 'KM' },
] as const

const selectedLang = computed(() => locale.value)

function changeLanguage(lang: 'en' | 'km') {
  appStore.setLocale(lang)
  setLocale(lang)
}

const stats = computed(() => [
  { value: '120+', label: t('Landing Metric One') },
  { value: '24/7', label: t('Landing Metric Two') },
  { value: '3', label: t('Landing Metric Three') },
])

const features = computed(() => [
  {
    icon: '01',
    title: t('Landing Feature One Title'),
    description: t('Landing Feature One Description'),
  },
  {
    icon: '02',
    title: t('Landing Feature Two Title'),
    description: t('Landing Feature Two Description'),
  },
  {
    icon: '03',
    title: t('Landing Feature Three Title'),
    description: t('Landing Feature Three Description'),
  },
])

const steps = computed(() => [
  {
    number: '1',
    title: t('Landing Step One Title'),
    description: t('Landing Step One Description'),
  },
  {
    number: '2',
    title: t('Landing Step Two Title'),
    description: t('Landing Step Two Description'),
  },
  {
    number: '3',
    title: t('Landing Step Three Title'),
    description: t('Landing Step Three Description'),
  },
])

const previewForm = ref({
  name: '',
  phone: '',
  attendance: '',
  message: '',
})

const formMessage = ref('')

function submitPreviewForm() {
  formMessage.value = t('Landing Form Success')
}
</script>
