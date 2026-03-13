<template>
  <div class="flex items-center justify-between mb-6">

    <div class="flex items-center gap-3">
      <component
        v-if="icon"
        :is="icon"
        class="w-6 h-6 text-primary"
      />

      <div>
        <h1 class="text-xl font-semibold">
          {{ title }}
        </h1>

        <p v-if="description" class="text-sm text-gray-500">
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