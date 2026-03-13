<template>
  <div v-if="!isMounted" class="h-screen w-full flex flex-col items-center justify-center gap-4 bg-white">

    <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

    <p class="text-sm text-gray-500 tracking-wide">
      Loading...
    </p>

  </div>
  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>