<template>
  <div class="relative min-h-screen overflow-hidden bg-linear-to-br from-rose-50 via-pink-50 to-rose-100">
    <!-- Three.js Canvas – full screen background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <canvas ref="canvasRef" class="w-full h-full"></canvas>
    </div>

    <!-- Overlay gradient for better text readability -->
    <div class="absolute inset-0 bg-linear-to-t from-white/40 via-transparent to-white/20 z-5 pointer-events-none"></div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <div class="max-w-4xl mx-auto space-y-10 md:space-y-16">
        <!-- Small heart accent -->
        <div class="text-6xl md:text-8xl opacity-0" ref="heartAccent">💞</div>

        <h1
          ref="headline"
          class="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-rose-900 tracking-wider opacity-0 translate-y-8"
        >
          {{ guest?.t || 'Mrr & Ms. Senghong' }}
        </h1>

        <p
          ref="subtitle"
          class="text-2xl md:text-3xl text-rose-700 font-light tracking-wide opacity-0 translate-y-6"
        >
          Forever Begins
        </p>

        <div class="my-16 space-y-8 opacity-0 translate-y-10" ref="details">
          <div class="text-3xl md:text-4xl text-gray-800 font-serif">
            {{ formatDate(eventDate) }}
          </div>

          <div class="text-xl md:text-2xl text-gray-700">
            {{ eventTime }} • {{ venueName }}
          </div>

          <div class="text-lg md:text-xl text-gray-600 leading-relaxed">
            {{ venueAddress }}
          </div>
        </div>

        <!-- Personalized message card -->
        <div
          class="p-8 md:p-12 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-rose-100/60 max-w-3xl mx-auto opacity-0 scale-95"
          ref="card"
        >
          <p class="text-2xl md:text-3xl text-rose-950 leading-relaxed font-light">
            Dear <span class="font-medium text-rose-700">{{ guest?.n || 'dear guest' }}</span>,
          </p>
          <p class="mt-6 text-lg md:text-xl leading-relaxed text-gray-800">
            With hearts full of joy, we invite you to share in our love story as we say “I do”.
            Your presence would make this day truly unforgettable.
          </p>
        </div>

        <!-- RSVP -->
        <div class="mt-20 opacity-0 translate-y-8" ref="rsvpSection">
          <h2 class="text-4xl font-serif text-rose-800 mb-10">
            Will you join us?
          </h2>

          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              @click="rsvp('yes')"
              class="px-12 py-6 bg-rose-600 hover:bg-rose-700 text-white text-xl rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
            >
              Yes, I'd love to ♥
            </button>

            <button
              @click="rsvp('no')"
              class="px-12 py-6 bg-white/80 hover:bg-gray-100 text-rose-800 text-xl rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 border border-rose-200"
            >
              Sorry, I can't
            </button>
          </div>

          <p v-if="rsvpStatus" class="mt-10 text-xl font-medium" :class="rsvpStatus.includes('Thank') ? 'text-green-700' : 'text-rose-700'">
            {{ rsvpStatus }}
          </p>
        </div>

        <footer class="mt-24 text-gray-600 text-sm opacity-70">
          With all our love • 2026
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import * as gsap from 'gsap'

definePageMeta({ layout: false })

const canvasRef     = ref<HTMLCanvasElement | null>(null)
const heartAccent   = ref<HTMLElement | null>(null)
const headline      = ref<HTMLElement | null>(null)
const subtitle      = ref<HTMLElement | null>(null)
const details       = ref<HTMLElement | null>(null)
const card          = ref<HTMLElement | null>(null)
const rsvpSection   = ref<HTMLElement | null>(null)

const guest = ref<any>(null)

const eventDate   = '2026-04-18'
const eventTime   = '17:30 – 22:00'
const venueName   = 'Rose Garden Ballroom'
const venueAddress = 'Street 2004, Boeung Keng Kang I, Phnom Penh'

const rsvpStatus = ref('')

function rsvp(answer: 'yes' | 'no') {
  rsvpStatus.value =
    answer === 'yes'
      ? 'Thank you! We can’t wait to celebrate with you ♡'
      : 'Thank you for letting us know. Wishing you all the best.'
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  const route = useRoute()
  if (route.query.d) {
    try {
      const decoded = atob(route.query.d as string)
      guest.value = JSON.parse(decoded)
    } catch (err) {
      console.warn('Guest data parse failed', err)
    }
  }

  const tl = gsap.gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(heartAccent.value,     { opacity: 1, duration: 1.8 }, 0.2)
    .to(headline.value,        { opacity: 1, y: 0, duration: 1.6 }, 0.6)
    .to(subtitle.value,        { opacity: 1, y: 0, duration: 1.4 }, 1.0)
    .to(details.value,         { opacity: 1, y: 0, duration: 1.3 }, 1.4)
    .to(card.value,            { opacity: 1, scale: 1, duration: 1.5 }, 1.8)
    .to(rsvpSection.value,     { opacity: 1, y: 0, duration: 1.2 }, 2.4)

  // Very gentle continuous float on headline
  gsap.gsap.to(headline.value, {
    y: '+=20',
    repeat: -1,
    yoyo: true,
    duration: 12,
    ease: 'sine.inOut'
  })

  initThreeJS()
})

function initThreeJS() {
  if (!canvasRef.value) return

  const scene  = new THREE.Scene()
  scene.fog    = new THREE.FogExp2(0xfff0f5, 0.0008)   // soft pink fog

  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200)
  camera.position.set(0, 0, 35)

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(devicePixelRatio)

  // ─── Heart geometry ────────────────────────────────
  const heartShape = new THREE.Shape()
  heartShape.moveTo(0, 5)
  heartShape.bezierCurveTo(5, 5, 10, 0, 10, -3)
  heartShape.bezierCurveTo(10, -8, 5, -13, 0, -13)
  heartShape.bezierCurveTo(-5, -13, -10, -8, -10, -3)
  heartShape.bezierCurveTo(-10, 0, -5, 5, 0, 5)

  const extrudeSettings = {
    depth: 1.2,
    bevelEnabled: true,
    bevelThickness: 0.4,
    bevelSize: 0.3,
    bevelSegments: 5
  }

  const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
  heartGeometry.scale(0.08, 0.08, 0.08) // small hearts

  const material = new THREE.MeshPhongMaterial({
    color: 0xffa1b5,
    transparent: true,
    opacity: 0.7,
    shininess: 40
  })

  // ─── Particle system ───────────────────────────────
  const group = new THREE.Group()
  scene.add(group)

  const count = 80   // adjust for perf vs beauty
  for (let i = 0; i < count; i++) {
    const heart = new THREE.Mesh(heartGeometry, material)

    heart.position.set(
      THREE.MathUtils.randFloatSpread(60),
      THREE.MathUtils.randFloatSpread(60) - 10,
      THREE.MathUtils.randFloatSpread(40) - 20
    )

    heart.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    )

    heart.userData = {
      speed: 0.2 + Math.random() * 0.4,
      rotSpeed: 0.003 + Math.random() * 0.006,
      phase: Math.random() * Math.PI * 2
    }

    group.add(heart)
  }

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1.2)
  light.position.set(10, 20, 15)
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.6))

  // Animate
  function animate(time = 0) {
    requestAnimationFrame(animate)

    group.children.forEach((h: any) => {
      h.position.y += Math.sin(time * 0.0006 + h.userData.phase) * 0.02 + h.userData.speed * 0.06
      h.rotation.y += h.userData.rotSpeed
      h.rotation.x += h.userData.rotSpeed * 0.4

      // Reset if too low
      if (h.position.y < -40) {
        h.position.y = 50
      }
    })

    renderer.render(scene, camera)
  }
  animate()

  // Resize
  const onResize = () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  }
  window.addEventListener('resize', onResize)
  onUnmounted(() => window.removeEventListener('resize', onResize))
}
</script>

<style scoped>
@keyframes bgPulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 0.7; }
}
</style>