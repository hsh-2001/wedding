<template>
  <div class="min-h-screen bg-(--color-background) py-10 px-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-10 text-pink-600">
        Wedding Services
      </h1>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          :title="service.title"
          :description="service.description"
          :image="service.image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { services } = useService()
</script>

<style scoped>
</style>
