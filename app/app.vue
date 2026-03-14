<template>
  <NuxtLayout>
    <div v-if="!isMounted" class="h-screen w-full flex flex-col items-center justify-center gap-4 bg-(--color-background)">
      <div class="w-10 h-10 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-(--text-muted) tracking-wide font-medium">
        Loading...
      </p>
    </div>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script setup lang="ts">

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>