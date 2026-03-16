<template>
  <div class="bg-(--color-surface) rounded-lg shadow-sm border border-(--color-border) overflow-hidden justify-between place-content-between flex flex-col transition-shadow hover:shadow-md">
    <img
      :src="image"
      :alt="title"
      class="h-48 w-full grow object-cover object-top"
    />
    <div class="p-5 flex flex-col">
      <h2 class="text-xl font-semibold mb-2 text-(--text-main)">
        {{ title }}
      </h2>
      <p class="text-(--text-muted) text-sm mb-4 flex-grow leading-relaxed">
        {{ description }}
      </p>

      <button
        class="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
      >
        View Service
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
}>()
</script>
