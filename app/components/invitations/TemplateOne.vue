<template>
  <div class="invitation-shell">
    <div class="ambient-glow ambient-glow-left"></div>
    <div class="ambient-glow ambient-glow-right"></div>
    <div class="ornament-dust ornament-dust-top"></div>
    <div class="ornament-dust ornament-dust-bottom"></div>

    <div class="petal-layer" aria-hidden="true">
      <span
        v-for="petal in petals"
        :key="petal.id"
        class="petal"
        :style="petal.style"
      />
    </div>

    <section
      ref="coverRef"
      class="invitation-cover"
      :class="{ 'is-open': isOpen }"
    >
      <div class="cover-panel cover-panel-left"></div>
      <div class="cover-panel cover-panel-right"></div>
      <div class="cover-fold-line"></div>
      <div class="cover-corner cover-corner-top-left"></div>
      <div class="cover-corner cover-corner-top-right"></div>
      <div class="cover-corner cover-corner-bottom-left"></div>
      <div class="cover-corner cover-corner-bottom-right"></div>

      <div class="cover-content">
        <div class="cover-seal">
          <span class="cover-seal-ring">ព</span>
        </div>
        <p class="cover-kicker">Khmer Wedding Letter</p>
        <h1 class="cover-title">សំបុត្រអញ្ជើញ</h1>
        <p class="cover-subtitle">Slide to open our wedding invitation</p>

        <div class="cover-facts">
          <div class="cover-fact">
            <span class="cover-fact-label">Date</span>
            <span class="cover-fact-value">{{ englishDate }}</span>
          </div>
          <div class="cover-fact">
            <span class="cover-fact-label">Time</span>
            <span class="cover-fact-value">{{ eventTime }}</span>
          </div>
          <div class="cover-fact">
            <span class="cover-fact-label">Venue</span>
            <span class="cover-fact-value">{{ venueName }}</span>
          </div>
        </div>

        <div class="cover-preview">
          <article class="preview-card">
            <div class="preview-avatar">
              <span>{{ brideInitial }}</span>
            </div>
            <p class="preview-role">Bride</p>
            <h2>{{ brideName }}</h2>
          </article>

          <div class="preview-divider">
            <span>♥</span>
          </div>

          <article class="preview-card">
            <div class="preview-avatar preview-avatar-groom">
              <span>{{ groomInitial }}</span>
            </div>
            <p class="preview-role">Groom</p>
            <h2>{{ groomName }}</h2>
          </article>
        </div>

        <div
          ref="sliderRef"
          class="slide-track"
          :class="{ 'is-active': sliderActive }"
          @pointerdown="startSlide"
          @pointermove="updateSlide"
          @pointerup="endSlide"
          @pointerleave="endSlide"
          @pointercancel="endSlide"
        >
          <div class="slide-fill" :style="{ width: `${sliderProgress * 100}%` }"></div>
          <div class="slide-label">Swipe or drag to open</div>
          <div class="slide-thumb" :style="{ left: `calc(${sliderProgress * 100}% - 28px)` }">
            <span>→</span>
          </div>
        </div>
        <p class="mobile-open-hint">Tap "Open invitation" if dragging feels difficult on mobile.</p>

        <button class="open-button" @click="openInvitation">
          Open invitation
        </button>
      </div>
    </section>

    <main
      ref="paperRef"
      class="invitation-paper"
      :class="{ 'is-visible': isOpen }"
    >
      <div class="border-outline border-outline-inner"></div>
      <div class="border-outline border-outline-outer"></div>
      <div class="paper-corner paper-corner-top-left"></div>
      <div class="paper-corner paper-corner-top-right"></div>
      <div class="paper-corner paper-corner-bottom-left"></div>
      <div class="paper-corner paper-corner-bottom-right"></div>

      <section ref="heroRef" class="hero-block">
        <div class="hero-ornament hero-ornament-top">✦ ✦ ✦</div>
        <div class="crest">
          <div class="crest-ring">
            <span class="crest-mark">អ</span>
          </div>
        </div>

        <p class="khmer-kicker split-line" data-split>
          សិរីមង្គលអាពាហ៍ពិពាហ៍
        </p>
        <p class="latin-kicker split-line" data-split data-split-mode="chars">
          Khmer Wedding Invitation
        </p>

        <div class="couple-preview-inline">
          <div class="couple-badge">
            <span class="couple-badge-label">Bride</span>
            <span class="couple-badge-name">{{ brideName }}</span>
          </div>
          <div class="couple-badge couple-badge-center">♥</div>
          <div class="couple-badge">
            <span class="couple-badge-label">Groom</span>
            <span class="couple-badge-name">{{ groomName }}</span>
          </div>
        </div>

        <h1 class="couple-names split-line" data-split data-split-mode="chars">
          {{ brideName }} & {{ groomName }}
        </h1>

        <p class="blessing-line split-line" data-split>
          សូមគោរពអញ្ជើញលោក លោកស្រី និងភ្ញៀវកិត្តិយសចូលរួមជាសាក្សីនៃពិធីមង្គលការរបស់យើង
        </p>
        <div class="hero-ornament hero-ornament-bottom">❦</div>
      </section>

      <section ref="detailRef" class="detail-grid reveal-section">
        <article class="detail-card">
          <p class="detail-label">ថ្ងៃពិធី</p>
          <h2>{{ khmerDate }}</h2>
          <p>{{ englishDate }}</p>
        </article>

        <article class="detail-card detail-card-emphasis">
          <p class="detail-label">ទីកន្លែង</p>
          <h2>{{ venueName }}</h2>
          <p>{{ venueAddress }}</p>
        </article>

        <article class="detail-card">
          <p class="detail-label">កម្មវិធី</p>
          <h2>{{ eventTime }}</h2>
          <p>{{ eventDescription }}</p>
        </article>
      </section>

      <section ref="messageRef" class="message-panel reveal-section">
        <div class="panel-heading">
          <span></span>
          <p class="panel-heading-label">លិខិតអញ្ជើញ</p>
          <span></span>
        </div>
        <div class="message-flourish">❦</div>
        <p class="message-greeting split-line" data-split>
          គោរពជូន {{ guestDisplayName }}
        </p>
        <p class="message-body split-line" data-split>
          {{ invitationMessage }}
        </p>
      </section>

      <section ref="scheduleRef" class="schedule-panel reveal-section">
        <div class="panel-heading">
          <span></span>
          <p class="panel-heading-label">កម្មវិធីមង្គល</p>
          <span></span>
        </div>
        <p class="section-title">ពេលវេលា / Ceremony Flow</p>

        <div class="timeline">
          <div v-for="item in ceremonyTimeline" :key="item.time" class="timeline-item">
            <span class="timeline-time">{{ item.time }}</span>
            <span class="timeline-dot"></span>
            <span class="timeline-text">{{ item.label }}</span>
          </div>
        </div>
      </section>

      <section ref="rsvpRef" class="rsvp-panel reveal-section">
        <p class="section-title">សូមបញ្ជាក់ការចូលរួម</p>
        <p class="rsvp-copy">Your presence will honor our family celebration.</p>

        <div class="rsvp-actions">
          <button
            class="rsvp-button rsvp-button-primary"
            @click="rsvp('yes')"
          >
            ចូលរួមដោយក្តីរីករាយ
          </button>
          <button
            class="rsvp-button rsvp-button-secondary"
            @click="rsvp('no')"
          >
            អភ័យទោស មិនអាចចូលរួម
          </button>
        </div>

        <p v-if="rsvpStatus" class="rsvp-status">
          {{ rsvpStatus }}
        </p>
      </section>

      <footer class="closing-note reveal-section">
        <span>ដោយក្តីគោរព និងសេចក្តីរីករាយ</span>
        <span>{{ brideName }} & {{ groomName }}</span>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

interface InvitationData {
  bride?: { name?: string }
  groom?: { name?: string }
  date?: string
  venue?: string
  venueAddress?: string
  description?: string
  time?: string
}

const props = defineProps<{
  eventData?: InvitationData
}>()

const coverRef = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)
const paperRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const detailRef = ref<HTMLElement | null>(null)
const messageRef = ref<HTMLElement | null>(null)
const scheduleRef = ref<HTMLElement | null>(null)
const rsvpRef = ref<HTMLElement | null>(null)

const guest = ref<{ n?: string; t?: string } | null>(null)
const rsvpStatus = ref('')
const isOpen = ref(false)
const sliderActive = ref(false)
const sliderProgress = ref(0.08)
const dragWidth = ref(1)
let sliderRect: DOMRect | null = null
let hasPlayedOpenAnimation = false

const brideName = computed(() => props.eventData?.bride?.name || 'កូនក្រមុំ')
const groomName = computed(() => props.eventData?.groom?.name || 'កូនកំលោះ')
const brideInitial = computed(() => brideName.value.charAt(0).toUpperCase())
const groomInitial = computed(() => groomName.value.charAt(0).toUpperCase())
const venueName = computed(() => props.eventData?.venue || 'Phnom Penh Ballroom')
const venueAddress = computed(() => props.eventData?.venueAddress || 'Phnom Penh, Cambodia')
const eventDescription = computed(() => props.eventData?.description || 'Reception dinner, blessing ceremony, and family celebration.')
const eventTime = computed(() => props.eventData?.time || '04:30 PM onwards')
const eventDate = computed(() => props.eventData?.date || '2026-03-21T15:00:00Z')

const petals = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  style: {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${10 + Math.random() * 8}s`,
    opacity: `${0.2 + Math.random() * 0.5}`,
    transform: `scale(${0.6 + Math.random() * 1.1}) rotate(${Math.random() * 180}deg)`
  }
}))

const ceremonyTimeline = computed(() => [
  { time: '04:30 PM', label: 'Guest arrival and welcome tea' },
  { time: '05:00 PM', label: 'Blessing ceremony and family greeting' },
  { time: '06:00 PM', label: 'Dinner reception and stage program' },
  { time: '07:30 PM', label: 'Music, toasts, and celebration' }
])

const guestDisplayName = computed(() => {
  const name = guest.value?.n?.trim()
  const title = guest.value?.t?.trim()
  return [title, name].filter(Boolean).join(' ') || 'ភ្ញៀវកិត្តិយស'
})

const invitationMessage = computed(() => {
  return `${guestDisplayName.value} សូមអញ្ជើញមកចូលរួមរំលែកសេចក្តីសុខ និងពរ​ជ័យក្នុងថ្ងៃពិសេសរបស់យើង។ វត្តមានរបស់អ្នកនឹងធ្វើឱ្យពិធីនេះកាន់តែពេញលេញ និងមានន័យ។`
})

const khmerDate = computed(() => formatKhmerDate(eventDate.value))
const englishDate = computed(() => {
  return new Date(eventDate.value).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

function rsvp(answer: 'yes' | 'no') {
  rsvpStatus.value = answer === 'yes'
    ? 'សូមអរគុណ។ We look forward to celebrating with you.'
    : 'សូមអរគុណសម្រាប់ការជូនដំណឹង។ We appreciate your response.'
}

function formatKhmerDate(dateValue: string) {
  const formatter = new Intl.DateTimeFormat('km-KH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return formatter.format(new Date(dateValue))
}

function splitGraphemes(text: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), (part) => part.segment)
  }

  return Array.from(text)
}

function splitWords(text: string) {
  return text.split(/(\s+)/).filter(Boolean)
}

function splitText(element: Element) {
  const source = (element.textContent || '').trim()
  const splitMode = element.getAttribute('data-split-mode') || 'graphemes'
  const parts = splitMode === 'chars' ? splitGraphemes(source) : splitWords(source)
  element.textContent = ''

  parts.forEach((part) => {
    const span = document.createElement('span')
    const isWhitespace = /^\s+$/.test(part)
    span.className = isWhitespace ? 'split-char split-char-space' : 'split-char'
    span.textContent = isWhitespace ? '\u00A0' : part
    element.appendChild(span)
  })
}

function prepareSplitText() {
  const targets = paperRef.value?.querySelectorAll('[data-split]') || []
  targets.forEach((element) => splitText(element))
}

function playOpenAnimation() {
  if (hasPlayedOpenAnimation || !paperRef.value) return

  hasPlayedOpenAnimation = true
  prepareSplitText()

  const splitChars = paperRef.value.querySelectorAll('.split-char')
  const sections = paperRef.value.querySelectorAll('.reveal-section')

  const timeline = gsap.timeline({
    defaults: {
      ease: 'power3.out'
    }
  })

  timeline
    .from(heroRef.value, { autoAlpha: 0, y: 46, scale: 0.985, duration: 0.95 })
    .from('.hero-ornament', { autoAlpha: 0, y: 18, stagger: 0.12, duration: 0.55 }, '-=0.5')
    .from(splitChars, { autoAlpha: 0, yPercent: 120, rotateX: -90, stagger: 0.012, duration: 0.45 }, '-=0.45')
    .from(detailRef.value?.children || [], { autoAlpha: 0, y: 28, scale: 0.97, stagger: 0.12, duration: 0.6 }, '-=0.25')
    .from(sections, { autoAlpha: 0, y: 32, stagger: 0.16, duration: 0.72 }, '-=0.35')
    .from('.panel-heading, .closing-note', { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.5 }, '-=0.45')

  gsap.to('.crest-ring', {
    rotate: 360,
    duration: 22,
    ease: 'none',
    repeat: -1
  })
}

function openInvitation() {
  if (isOpen.value) return

  isOpen.value = true

  gsap.timeline()
    .to('.cover-seal', {
      scale: 0.88,
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power2.in'
    })
    .to('.cover-content > *:not(.cover-seal)', {
      autoAlpha: 0,
      y: -14,
      stagger: 0.03,
      duration: 0.3,
      ease: 'power2.in'
    }, '<')
    .to(coverRef.value?.querySelectorAll('.cover-panel') || [], {
      xPercent: (index: number) => index === 0 ? -108 : 108,
      rotateY: (index: number) => index === 0 ? -10 : 10,
      duration: 1.2,
      ease: 'power4.inOut',
      stagger: 0
    }, '-=0.05')
    .to(coverRef.value, {
      autoAlpha: 0,
      pointerEvents: 'none',
      duration: 0.25
    }, '-=0.15')
    .fromTo(paperRef.value, {
      autoAlpha: 0,
      y: 46,
      scale: 0.975,
      rotateX: -8,
      transformOrigin: 'top center'
    }, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.85,
      ease: 'power4.out',
      onComplete: playOpenAnimation
    }, '-=0.35')
}

function updateProgress(clientX: number) {
  if (!sliderRect) return
  const relative = (clientX - sliderRect.left) / dragWidth.value
  sliderProgress.value = Math.max(0.08, Math.min(relative, 1))
}

function startSlide(event: PointerEvent) {
  if (isOpen.value || !sliderRef.value) return
  sliderActive.value = true
  sliderRect = sliderRef.value.getBoundingClientRect()
  dragWidth.value = Math.max(sliderRect.width, 1)
  sliderRef.value.setPointerCapture(event.pointerId)
  updateProgress(event.clientX)
}

function updateSlide(event: PointerEvent) {
  if (!sliderActive.value || isOpen.value) return
  updateProgress(event.clientX)
}

function endSlide(event: PointerEvent) {
  if (!sliderActive.value || isOpen.value) return

  sliderActive.value = false
  sliderRef.value?.releasePointerCapture(event.pointerId)

  if (sliderProgress.value >= 0.82) {
    sliderProgress.value = 1
    openInvitation()
    return
  }

  gsap.to(sliderProgress, {
    value: 0.08,
    duration: 0.35,
    ease: 'power2.out',
    onUpdate: () => {
      sliderProgress.value = Number(sliderProgress.value)
    }
  })
}

onMounted(() => {
  const route = useRoute()

  if (route.query.d) {
    try {
      const decoded = atob(route.query.d as string)
      guest.value = JSON.parse(decoded)
    } catch (error) {
      console.warn('Guest data parse failed', error)
    }
  }

  gsap.from('.cover-content > *', {
    autoAlpha: 0,
    y: 24,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
  })

  gsap.to('.ambient-glow', {
    opacity: 0.7,
    scale: 1.12,
    duration: 4.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.6
  })
})
</script>

<style scoped>
.invitation-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 32px 16px;
  background:
    radial-gradient(circle at top, rgba(255, 239, 213, 0.88), transparent 34%),
    radial-gradient(circle at bottom, rgba(146, 22, 34, 0.24), transparent 28%),
    linear-gradient(160deg, #7f101f 0%, #97172a 28%, #d99b53 100%);
}

.ornament-dust {
  position: absolute;
  left: 50%;
  width: min(1100px, 92vw);
  height: 120px;
  transform: translateX(-50%);
  pointer-events: none;
  opacity: 0.24;
  background:
    radial-gradient(circle at 10% 50%, rgba(244, 208, 140, 0.38), transparent 10%),
    radial-gradient(circle at 25% 40%, rgba(244, 208, 140, 0.2), transparent 8%),
    radial-gradient(circle at 50% 60%, rgba(244, 208, 140, 0.26), transparent 10%),
    radial-gradient(circle at 75% 35%, rgba(244, 208, 140, 0.18), transparent 8%),
    radial-gradient(circle at 92% 52%, rgba(244, 208, 140, 0.32), transparent 10%);
}

.ornament-dust-top {
  top: 12px;
}

.ornament-dust-bottom {
  bottom: 12px;
}

.ambient-glow {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(244, 208, 140, 0.28), transparent 68%);
  filter: blur(18px);
  opacity: 0.45;
  pointer-events: none;
}

.ambient-glow-left {
  top: -120px;
  left: -120px;
}

.ambient-glow-right {
  right: -120px;
  bottom: -120px;
}

.petal-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.petal {
  position: absolute;
  top: -8%;
  width: 16px;
  height: 26px;
  border-radius: 70% 30% 65% 35%;
  background: linear-gradient(180deg, rgba(255, 226, 192, 0.95), rgba(179, 35, 53, 0.88));
  box-shadow: 0 0 18px rgba(255, 229, 180, 0.35);
  animation: petalFall linear infinite;
}

.invitation-cover {
  position: relative;
  z-index: 3;
  max-width: 980px;
  min-height: calc(100vh - 64px);
  margin: 0 auto;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 34px;
  box-shadow: 0 32px 84px rgba(67, 8, 18, 0.28);
  background:
    linear-gradient(140deg, rgba(255, 249, 236, 0.12), rgba(255, 249, 236, 0.02)),
    radial-gradient(circle at top, rgba(255, 218, 166, 0.16), transparent 38%);
  backdrop-filter: blur(10px);
  perspective: 1400px;
}

.invitation-cover.is-open {
  position: absolute;
  inset: 32px 16px auto;
}

.cover-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background:
    radial-gradient(circle at center, rgba(237, 203, 141, 0.14), transparent 48%),
    linear-gradient(180deg, rgba(134, 16, 33, 0.98), rgba(101, 11, 26, 0.98));
  box-shadow: inset 0 0 0 1px rgba(251, 224, 172, 0.08);
}

.cover-panel::before {
  content: '';
  position: absolute;
  inset: 18px;
  border: 1px solid rgba(245, 216, 164, 0.38);
  border-radius: 24px;
}

.cover-panel-left {
  left: 0;
  border-right: 1px solid rgba(245, 216, 164, 0.22);
}

.cover-panel-right {
  right: 0;
  border-left: 1px solid rgba(245, 216, 164, 0.22);
}

.cover-fold-line {
  position: absolute;
  top: 8%;
  bottom: 8%;
  left: 50%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(245, 216, 164, 0.55), transparent);
  transform: translateX(-50%);
  opacity: 0.85;
}

.cover-corner {
  position: absolute;
  width: 92px;
  height: 92px;
  border-color: rgba(245, 216, 164, 0.34);
  pointer-events: none;
}

.cover-corner-top-left {
  top: 18px;
  left: 18px;
  border-top: 2px solid;
  border-left: 2px solid;
  border-top-left-radius: 28px;
}

.cover-corner-top-right {
  top: 18px;
  right: 18px;
  border-top: 2px solid;
  border-right: 2px solid;
  border-top-right-radius: 28px;
}

.cover-corner-bottom-left {
  bottom: 18px;
  left: 18px;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-bottom-left-radius: 28px;
}

.cover-corner-bottom-right {
  right: 18px;
  bottom: 18px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-bottom-right-radius: 28px;
}

.cover-content {
  position: relative;
  z-index: 1;
  width: min(760px, calc(100% - 32px));
  padding: 40px 24px;
  text-align: center;
  color: #fff5e2;
}

.cover-seal {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.cover-seal-ring {
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #f9deb0, #d39a49 72%);
  color: #7b1527;
  font-family: var(--font-khmer-display);
  font-size: 1.8rem;
  box-shadow:
    inset 0 0 0 6px rgba(126, 18, 35, 0.16),
    0 16px 24px rgba(42, 4, 10, 0.22);
}

.cover-kicker,
.cover-subtitle {
  margin: 0;
}

.cover-kicker {
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.84rem;
  color: #f1cf96;
}

.cover-title {
  margin: 14px 0 8px;
  font-family: var(--font-khmer-display);
  font-size: clamp(2.6rem, 7vw, 5rem);
  line-height: 1.1;
}

.cover-subtitle {
  color: rgba(255, 245, 226, 0.82);
}

.cover-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.cover-fact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 12px;
  border-radius: 18px;
  background: rgba(255, 247, 232, 0.08);
  border: 1px solid rgba(245, 216, 164, 0.18);
}

.cover-fact-label {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f1cf96;
}

.cover-fact-value {
  font-size: 0.96rem;
  line-height: 1.45;
}

.cover-preview {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  margin-top: 38px;
}

.preview-card {
  padding: 26px 18px;
  border-radius: 24px;
  background: rgba(255, 247, 232, 0.08);
  border: 1px solid rgba(245, 216, 164, 0.22);
  backdrop-filter: blur(8px);
}

.preview-avatar {
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  margin: 0 auto 14px;
  border-radius: 999px;
  background: linear-gradient(180deg, #f5d89f, #d19a50);
  color: #781729;
  font-size: 2rem;
  font-weight: 700;
}

.preview-avatar-groom {
  background: linear-gradient(180deg, #f0c980, #bc7e34);
}

.preview-role {
  margin: 0;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: #f1cf96;
}

.preview-card h2 {
  margin: 8px 0 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.preview-divider {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  background: rgba(245, 216, 164, 0.16);
  color: #f1cf96;
}

.slide-track {
  position: relative;
  width: min(420px, 100%);
  height: 58px;
  margin: 34px auto 0;
  border-radius: 999px;
  background: rgba(255, 245, 226, 0.12);
  border: 1px solid rgba(245, 216, 164, 0.24);
  overflow: hidden;
  touch-action: none;
  user-select: none;
}

.slide-track.is-active {
  box-shadow: 0 0 0 4px rgba(245, 216, 164, 0.12);
}

.slide-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: linear-gradient(90deg, rgba(245, 216, 164, 0.26), rgba(245, 216, 164, 0.08));
}

.slide-label {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  letter-spacing: 0.08em;
  color: rgba(255, 245, 226, 0.84);
}

.slide-thumb {
  position: absolute;
  top: 3px;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f5d89f, #d19a50);
  color: #781729;
  font-size: 1.2rem;
  box-shadow: 0 14px 22px rgba(73, 8, 18, 0.24);
}

.open-button {
  margin-top: 16px;
  background: transparent;
  border: none;
  color: #f7dba5;
  text-decoration: underline;
  text-underline-offset: 6px;
}

.mobile-open-hint {
  display: none;
  margin: 12px 0 0;
  font-size: 0.88rem;
  color: rgba(255, 245, 226, 0.72);
}

.invitation-paper {
  position: relative;
  z-index: 2;
  max-width: 980px;
  margin: 0 auto;
  padding: 42px 22px 30px;
  color: #5a1020;
  background:
    linear-gradient(180deg, rgba(255, 251, 243, 0.98), rgba(252, 238, 214, 0.96)),
    linear-gradient(135deg, rgba(168, 26, 46, 0.1), transparent 40%);
  border-radius: 32px;
  box-shadow: 0 30px 80px rgba(67, 8, 18, 0.28);
  opacity: 0;
  visibility: hidden;
  transform: translateY(36px);
  overflow: hidden;
}

.invitation-paper.is-visible {
  visibility: visible;
}

.border-outline {
  position: absolute;
  inset: 12px;
  border-radius: 26px;
  pointer-events: none;
}

.border-outline-inner {
  border: 1px solid rgba(157, 28, 44, 0.25);
}

.border-outline-outer {
  inset: 24px;
  border: 2px solid rgba(213, 162, 84, 0.7);
}

.paper-corner {
  position: absolute;
  width: 98px;
  height: 98px;
  border-color: rgba(182, 130, 54, 0.42);
  pointer-events: none;
}

.paper-corner-top-left {
  top: 18px;
  left: 18px;
  border-top: 2px solid;
  border-left: 2px solid;
  border-top-left-radius: 26px;
}

.paper-corner-top-right {
  top: 18px;
  right: 18px;
  border-top: 2px solid;
  border-right: 2px solid;
  border-top-right-radius: 26px;
}

.paper-corner-bottom-left {
  left: 18px;
  bottom: 18px;
  border-left: 2px solid;
  border-bottom: 2px solid;
  border-bottom-left-radius: 26px;
}

.paper-corner-bottom-right {
  right: 18px;
  bottom: 18px;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-bottom-right-radius: 26px;
}

.hero-block,
.detail-grid,
.message-panel,
.schedule-panel,
.rsvp-panel,
.closing-note {
  position: relative;
  z-index: 1;
}

.hero-block {
  padding: 20px 10px 10px;
  text-align: center;
}

.hero-ornament {
  color: #c4954e;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hero-ornament-top {
  margin-bottom: 16px;
  font-size: 0.84rem;
}

.hero-ornament-bottom {
  margin-top: 16px;
  font-size: 1.7rem;
}

.crest {
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
}

.crest-ring {
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border: 2px solid #d9a15a;
  border-radius: 999px;
  color: #9b1d2b;
  background:
    radial-gradient(circle, rgba(255, 248, 235, 0.98) 0%, rgba(249, 228, 194, 0.94) 100%);
  box-shadow: inset 0 0 0 8px rgba(155, 29, 43, 0.08);
}

.crest-mark {
  font-size: 2.8rem;
  font-weight: 700;
}

.khmer-kicker {
  margin: 0;
  font-family: var(--font-khmer-display);
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  letter-spacing: 0.04em;
  color: #8f1930;
}

.latin-kicker {
  margin: 10px 0 18px;
  font-size: 0.9rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #b88945;
}

.couple-preview-inline {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.couple-badge {
  display: inline-flex;
  flex-direction: column;
  min-width: 140px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 248, 235, 0.72);
  border: 1px solid rgba(193, 146, 72, 0.22);
}

.couple-badge-center {
  min-width: auto;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #d2a15b;
}

.couple-badge-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b88945;
}

.couple-badge-name {
  margin-top: 4px;
  font-weight: 700;
  color: #741423;
}

.couple-names {
  margin: 0;
  font-family: 'Baskerville', 'Times New Roman', serif;
  font-size: clamp(2.4rem, 5vw, 4.9rem);
  line-height: 1.08;
  color: #741423;
}

.blessing-line {
  max-width: 720px;
  margin: 18px auto 0;
  font-family: var(--font-khmer-body);
  font-size: clamp(1rem, 1.7vw, 1.18rem);
  line-height: 1.9;
  color: #6a2430;
}

.split-line {
  perspective: 800px;
}

:deep(.split-char) {
  display: inline-block;
  transform-origin: center bottom;
  will-change: transform, opacity;
}

:deep(.split-char-space) {
  width: 0.32em;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 34px;
}

.panel-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 14px;
}

.panel-heading span {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(185, 132, 58, 0.82), transparent);
}

.panel-heading-label {
  margin: 0;
  font-family: var(--font-khmer-display);
  color: #a46f2e;
  letter-spacing: 0.08em;
}

.detail-card {
  padding: 26px 22px;
  text-align: center;
  background: rgba(255, 252, 247, 0.72);
  border: 1px solid rgba(155, 29, 43, 0.12);
  border-radius: 22px;
  box-shadow: 0 14px 34px rgba(147, 31, 46, 0.08);
}

.detail-card-emphasis {
  background: linear-gradient(180deg, rgba(157, 29, 44, 0.9), rgba(116, 20, 35, 0.96));
  color: #fff8eb;
}

.detail-card h2 {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.35;
}

.detail-card p {
  margin: 10px 0 0;
  line-height: 1.7;
}

.detail-label,
.section-title {
  margin: 0 0 10px;
  font-size: 0.82rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #b07a3a;
}

.detail-card-emphasis .detail-label {
  color: #f8d9a4;
}

.message-panel,
.schedule-panel,
.rsvp-panel {
  margin-top: 28px;
  padding: 28px 24px;
  border-radius: 24px;
  background: rgba(255, 250, 241, 0.82);
  border: 1px solid rgba(193, 146, 72, 0.28);
}

.message-panel {
  text-align: center;
}

.message-flourish {
  font-size: 2rem;
  color: #c08b45;
  animation: flourishFloat 3.2s ease-in-out infinite;
}

.message-greeting {
  margin: 10px 0 12px;
  font-family: var(--font-khmer-display);
  font-size: 1.25rem;
}

.message-body {
  margin: 0 auto;
  max-width: 760px;
  font-family: var(--font-khmer-body);
  font-size: 1.04rem;
  line-height: 1.95;
}

.timeline {
  display: grid;
  gap: 14px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 110px 20px 1fr;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.timeline-time {
  font-weight: 700;
  color: #8e2031;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #d4a25c;
  box-shadow: 0 0 0 6px rgba(212, 162, 92, 0.16);
}

.timeline-text {
  line-height: 1.6;
}

.rsvp-panel {
  text-align: center;
  background: linear-gradient(180deg, rgba(122, 18, 34, 0.96), rgba(104, 14, 29, 0.98));
  color: #fff3df;
}

.rsvp-panel .section-title,
.rsvp-copy {
  color: #f7dba5;
}

.rsvp-copy {
  margin: 0;
}

.rsvp-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.rsvp-button {
  min-width: 220px;
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 700;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.rsvp-button:hover {
  transform: translateY(-2px);
}

.rsvp-button-primary {
  background: linear-gradient(135deg, #f3d094, #d9a056);
  color: #651120;
  box-shadow: 0 18px 32px rgba(217, 160, 86, 0.28);
}

.rsvp-button-secondary {
  background: rgba(255, 243, 223, 0.08);
  color: #fff3df;
  border-color: rgba(247, 219, 165, 0.35);
}

.rsvp-status {
  margin-top: 18px;
  font-weight: 600;
}

.closing-note {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 28px;
  padding: 0 6px;
  font-size: 0.92rem;
  color: #7a2130;
}

@keyframes flourishFloat {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@keyframes petalFall {
  0% {
    transform: translate3d(0, -5vh, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(24px, 52vh, 0) rotate(120deg);
  }

  100% {
    transform: translate3d(-18px, 108vh, 0) rotate(280deg);
  }
}

@media (max-width: 900px) {
  .cover-facts,
  .cover-preview,
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .cover-facts {
    gap: 10px;
  }

  .preview-divider {
    margin: 0 auto;
  }

  .closing-note {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .invitation-shell {
    padding: 10px 8px 24px;
  }

  .invitation-cover,
  .invitation-paper {
    border-radius: 22px;
  }

  .invitation-cover {
    min-height: calc(100vh - 20px);
  }

  .cover-content {
    width: calc(100% - 20px);
    padding: 28px 10px 24px;
  }

  .invitation-paper {
    padding: 28px 12px 22px;
  }

  .cover-panel::before {
    inset: 10px;
    border-radius: 18px;
  }

  .cover-corner {
    width: 56px;
    height: 56px;
  }

  .cover-fold-line {
    top: 12%;
    bottom: 12%;
  }

  .cover-seal {
    margin-bottom: 14px;
  }

  .cover-seal-ring {
    width: 62px;
    height: 62px;
    font-size: 1.45rem;
  }

  .border-outline-inner {
    inset: 6px;
  }

  .border-outline-outer {
    inset: 12px;
  }

  .paper-corner {
    width: 56px;
    height: 56px;
  }

  .cover-kicker {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
  }

  .cover-title {
    margin-top: 10px;
    font-size: clamp(2.05rem, 12vw, 3rem);
  }

  .cover-subtitle {
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .cover-facts {
    margin-top: 18px;
  }

  .cover-fact {
    padding: 12px 14px;
    text-align: left;
  }

  .cover-fact-value {
    font-size: 0.92rem;
  }

  .cover-preview {
    gap: 12px;
    margin-top: 24px;
  }

  .preview-card {
    display: grid;
    grid-template-columns: 72px 1fr;
    align-items: center;
    gap: 12px;
    padding: 16px 14px;
    text-align: left;
  }

  .preview-card h2 {
    margin: 6px 0 0;
    font-size: 1.25rem;
  }

  .preview-avatar {
    width: 72px;
    height: 72px;
    margin: 0;
    font-size: 1.5rem;
  }

  .preview-divider {
    width: 44px;
    height: 44px;
  }

  .slide-track {
    height: 54px;
    margin-top: 22px;
  }

  .slide-label {
    padding-inline: 56px 12px;
    font-size: 0.86rem;
    letter-spacing: 0.03em;
    text-align: left;
    justify-items: start;
  }

  .slide-thumb {
    top: 3px;
    width: 48px;
    height: 48px;
    font-size: 1rem;
  }

  .mobile-open-hint {
    display: block;
  }

  .open-button {
    width: 100%;
    margin-top: 14px;
    padding: 14px 18px;
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(243, 208, 148, 0.2), rgba(217, 160, 86, 0.22));
    border: 1px solid rgba(247, 219, 165, 0.28);
    text-decoration: none;
    font-weight: 700;
  }

  .message-panel,
  .schedule-panel,
  .rsvp-panel,
  .detail-card {
    padding: 18px 14px;
    border-radius: 20px;
  }

  .hero-block {
    padding: 10px 2px 4px;
  }

  .hero-ornament-top {
    margin-bottom: 10px;
    font-size: 0.72rem;
  }

  .hero-ornament-bottom {
    margin-top: 12px;
    font-size: 1.3rem;
  }

  .crest {
    margin-bottom: 14px;
  }

  .crest-ring {
    width: 82px;
    height: 82px;
  }

  .crest-mark {
    font-size: 2.2rem;
  }

  .latin-kicker {
    margin: 8px 0 14px;
    font-size: 0.74rem;
    letter-spacing: 0.16em;
  }

  .couple-preview-inline {
    gap: 8px;
    margin-bottom: 14px;
  }

  .couple-badge {
    min-width: 0;
    width: calc(50% - 22px);
    padding: 12px 10px;
    border-radius: 16px;
  }

  .couple-badge-center {
    width: 36px;
    padding: 0;
    border: 0;
    background: transparent;
  }

  .couple-badge-name {
    font-size: 0.92rem;
  }

  .couple-names {
    font-size: clamp(1.95rem, 10vw, 2.7rem);
    line-height: 1.14;
  }

  .blessing-line {
    margin-top: 14px;
    font-size: 0.96rem;
    line-height: 1.8;
  }

  .detail-grid {
    gap: 12px;
    margin-top: 22px;
  }

  .detail-card h2 {
    font-size: 1.12rem;
  }

  .detail-card p {
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .detail-label,
  .section-title {
    margin-bottom: 8px;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
  }

  .message-panel,
  .schedule-panel,
  .rsvp-panel {
    margin-top: 18px;
  }

  .panel-heading {
    gap: 8px;
    margin-bottom: 10px;
  }

  .panel-heading span {
    width: 28px;
  }

  .panel-heading-label {
    font-size: 0.92rem;
  }

  .message-greeting {
    font-size: 1.08rem;
  }

  .message-body {
    font-size: 0.96rem;
    line-height: 1.84;
  }

  .timeline {
    gap: 12px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 6px;
    padding: 12px 10px;
    border-radius: 16px;
    background: rgba(255, 248, 235, 0.65);
  }

  .timeline-dot {
    justify-self: center;
    width: 8px;
    height: 8px;
    box-shadow: 0 0 0 5px rgba(212, 162, 92, 0.14);
  }

  .timeline-time {
    font-size: 0.92rem;
  }

  .timeline-text {
    font-size: 0.92rem;
  }

  .rsvp-actions {
    gap: 10px;
    margin-top: 18px;
  }

  .rsvp-button {
    width: 100%;
    min-width: 0;
    padding: 13px 16px;
    font-size: 0.96rem;
  }

  .rsvp-status {
    font-size: 0.94rem;
    line-height: 1.6;
  }

  .closing-note {
    margin-top: 20px;
    font-size: 0.84rem;
    gap: 6px;
    padding: 0 2px;
  }
}

@media (max-width: 420px) {
  .preview-card {
    grid-template-columns: 60px 1fr;
    gap: 10px;
  }

  .preview-avatar {
    width: 60px;
    height: 60px;
    font-size: 1.25rem;
  }

  .couple-badge {
    width: 100%;
  }

  .couple-badge-center {
    width: 100%;
    height: 24px;
  }

  .slide-label {
    font-size: 0.8rem;
  }
}
</style>
