<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <h1 class="text-3xl font-bold text-center mb-10 text-pink-600">
      Wedding Services
    </h1>

    <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552"
          class="h-48 w-full object-cover"
        />

        <div class="p-5">
          <h2 class="text-xl font-semibold mb-2">Wedding Invitations</h2>
          <p class="text-gray-600 text-sm mb-4">
            Custom-designed wedding invitations to set the tone for your big day.
          </p>

          <button
            class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            View Service
          </button>
        </div>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="https://images.unsplash.com/photo-1504196606672-aef5c9cefc92"
          class="h-48 w-full object-cover"
        />

        <div class="p-5">
          <h2 class="text-xl font-semibold mb-2">Wedding Decoration</h2>
          <p class="text-gray-600 text-sm mb-4">
            Beautiful floral and venue decorations for your wedding.
          </p>

          <button
            class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            View Service
          </button>
        </div>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="https://images.unsplash.com/photo-1529636798458-92182e662485"
          class="h-48 w-full object-cover"
        />

        <div class="p-5">
          <h2 class="text-xl font-semibold mb-2">Wedding Photography</h2>
          <p class="text-gray-600 text-sm mb-4">
            Capture every special moment with professional photographers.
          </p>

          <button
            class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            View Service
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>