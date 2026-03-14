<template>
  <div class="flex items-center justify-between mb-8">

    <div class="flex items-center gap-2">
      <div v-if="icon" class="p-2.5 bg-pink-50 dark:bg-pink-900/20 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 transition-all">
        <component
          :is="icon"
          class="w-6 h-6 text-(--color-primary)"
        />
      </div>

      <div>
        <h1 class="text-2xl font-black tracking-tight text-(--text-main) leading-tight">
          {{ title }}
        </h1>

        <p v-if="description" class="text-sm font-medium text-(--text-muted) mt-0.5">
          {{ description }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2">
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
</style>