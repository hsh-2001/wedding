<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div class="flex flex-col xs:flex-row xs:items-center gap-2 w-full sm:w-auto">
      <div v-if="icon" class="self-start xs:self-center p-2 bg-pink-50 dark:bg-pink-900/20 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 transition-all mr-0 xs:mr-2">
        <component
          :is="icon"
          class="w-7 h-7 xs:w-6 xs:h-6 text-(--color-primary)"
        />
      </div>
      <div class="flex-1 min-w-0">
        <h1 class="text-base xs:text-lg font-black tracking-tight text-(--text-main) leading-tight break-words">
          {{ title }}
        </h1>
        <p v-if="description" class="text-xs xs:text-xs font-medium text-(--text-muted) mt-0.5">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2 justify-end w-full sm:w-auto">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string;
  description?: string;
  icon?: Component;
}>();
</script>

<style scoped>
@media (max-width: 640px) {
  .xs\:flex-row {
    flex-direction: row !important;
  }
  .xs\:items-center {
    align-items: center !important;
  }
  .xs\:self-center {
    align-self: center !important;
  }
  .xs\:mr-2 {
    margin-right: 0.5rem !important;
  }
  .xs\:w-6 {
    width: 1.5rem !important;
  }
  .xs\:h-6 {
    height: 1.5rem !important;
  }
  .xs\:text-2xl {
    font-size: 1.5rem !important;
  }
  .xs\:text-sm {
    font-size: 0.875rem !important;
  }
}
</style>