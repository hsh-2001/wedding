<template>
  <div class="min-h-screen bg-(--color-background) py-10 px-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-10 text-pink-600">
        Wedding Services
      </h1>

      <div class="grid-container gap-2">
        <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          :title="service.title"
          :description="service.description"
          :image="service.image"
          class="service-list"
          :style="{ animationDelay: `${index * 0.2}s`, gridArea: `grid-area${index + 1}` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { services } = useService()
</script>

<style lang="scss">
.service-list {
  opacity: 0;
  animation: fadeInUp 0.5s ease-in-out forwards;
}

.service-list:nth-child(odd) {
  animation-name: fadeInLeft;
}

.service-list:nth-child(even) {
  animation-name: fadeInRight;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-40px) scale(0.95);
  }
  50% {
    opacity: 0.5;
    transform: translateX(20px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(40px) scale(0.95);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-20px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}


.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  grid-template-areas: 
    "grid-area1 grid-area1 grid-area2"
    "grid-area3 grid-area4 grid-area5"
    "grid-area3 grid-area6 grid-area6"
    "grid-area7 grid-area7 grid-area7";
}

@media  (max-width: 992px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 
      "grid-area1 grid-area1"
      "grid-area2 grid-area3"
      "grid-area4 grid-area3"
      "grid-area5 grid-area6"
      "grid-area7 grid-area7";
  }
}

@media (max-width: 768px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 
      "grid-area1"
      "grid-area2"
      "grid-area3"
      "grid-area4"
      "grid-area5"
      "grid-area6"
      "grid-area7";
  }
}
</style>
