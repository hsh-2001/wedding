<template>
  <div class="flex flex-col gap-16 pb-16">
    <!-- Hero Section -->
    <section 
      id="home" 
      ref="homeSection"
      class="relative h-[70vh] flex items-center justify-center overflow-hidden rounded-lg mt-4 mx-4 border border-(--color-border) shadow-sm"
    >
      <img 
        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622" 
        class="absolute inset-0 w-full h-full object-cover"
        alt="Wedding Hero"
      />
      <div class="absolute inset-0 bg-black/40"></div>
      
      <div class="relative text-center text-white px-6">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Your Dream Wedding <br /> 
          <span class="text-pink-400">Perfectly Planned</span>
        </h1>
        <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Everything you need to create the most beautiful day of your life.
        </p>
        <button 
          @click="scrollToService"
          class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-md transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/20"
        >
          Explore Services
        </button>
      </div>
    </section>

    <!-- Service Section -->
    <section id="service" ref="serviceSection" class="px-6 scroll-mt-20">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3 text-(--text-main)">Our Wedding Services</h2>
          <div class="w-20 h-1 bg-pink-500 mx-auto rounded-full"></div>
          <p class="text-(--text-muted) mt-4 max-w-2xl mx-auto text-sm">
            We provide a wide range of professional services to make your wedding day truly special and stress-free.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            :title="service.title"
            :description="service.description"
            :image="service.image"
          />
        </div>

        <div class="mt-12 text-center">
          <NuxtLink 
            to="/service"
            class="inline-flex items-center gap-1.5 text-pink-600 font-bold hover:text-pink-700 transition-colors text-sm"
          >
            <span>View All Services</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" ref="aboutSection" class="px-6 scroll-mt-20">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-10 items-center bg-(--color-surface) rounded-lg p-6 md:p-10 border border-(--color-border) shadow-sm">
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed" 
              alt="About Us" 
              class="rounded-lg shadow-sm w-full h-[350px] object-cover border border-(--color-border)"
            />
            <div class="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-(--color-border) hidden md:block">
              <p class="text-pink-600 font-bold text-2xl">500+</p>
              <p class="text-(--text-light) text-[10px] uppercase font-bold tracking-wider">Weddings Planned</p>
            </div>
          </div>
          <div>
            <h2 class="text-3xl font-bold mb-4 text-(--text-main)">Our Story</h2>
            <p class="text-(--text-muted) mb-4 text-sm leading-relaxed">
              We are a team of passionate wedding enthusiasts dedicated to making your special day absolutely perfect. With over 5 years of experience, we've helped hundreds of couples realize their dream weddings.
            </p>
            <p class="text-(--text-muted) mb-6 text-sm leading-relaxed">
              Our approach is simple: we listen to your vision and bring it to life with our expertise and attention to detail.
            </p>
            <NuxtLink 
              to="/about"
              class="inline-flex items-center justify-center bg-white dark:bg-slate-800 border border-pink-500 text-pink-600 font-bold py-2 px-8 rounded-md hover:bg-pink-500 hover:text-white transition-all active:scale-95 text-sm shadow-sm"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" ref="contactSection" class="px-6 scroll-mt-20">
      <div class="max-w-7xl mx-auto">
        <div class="bg-slate-900 rounded-lg overflow-hidden relative shadow-sm border border-slate-800">
          <img 
            src="https://images.unsplash.com/photo-1465495910483-34a171440759" 
            class="absolute inset-0 w-full h-full object-cover opacity-20"
            alt="Contact Background"
          />
          <div class="relative p-10 md:p-16 text-center">
            <h2 class="text-3xl font-bold mb-4 text-white">Ready to Start Planning?</h2>
            <p class="text-gray-300 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
              Contact us today for a free consultation. Our team is ready to help you create an unforgettable wedding experience.
            </p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-4">
              <NuxtLink 
                to="/contact"
                class="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold py-2.5 px-10 rounded-md shadow-lg shadow-pink-500/20 transition-all active:scale-95 text-sm"
              >
                Contact Us Now
              </NuxtLink>
              <a 
                href="tel:+85512345678"
                class="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 px-10 rounded-md border border-white/10 transition-all text-sm backdrop-blur-sm"
              >
                Call: +855 12 345 678
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { services } = useService()
const {
  homeSection,
  serviceSection,
  aboutSection,
  contactSection,
  scrollToService,
  initObserver,
  destroyObserver
} = useHome()

onMounted(() => {
  initObserver()
})

onUnmounted(() => {
  destroyObserver()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
