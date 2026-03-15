<template>
  <div>
    <TemplateOne />
  </div>
</template>

<script setup lang="ts">
import TemplateOne from '~/components/invitations/TemplateOne.vue'
import LZString from 'lz-string'

definePageMeta({
  layout: 'invitation',
})

const route = useRoute()
const weddingId = route.params.id as string


// Fake wedding data for SEO meta (replace with API call when ready)
const data = {
  bride: { name: 'Sophea' },
  groom: { name: 'Senghong' },
  date: '2026-03-21T15:00:00Z',
  isWedding: true,
  coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
  venue: 'Phnom Penh Hotel',
  description: 'Join us for a beautiful wedding celebration in Phnom Penh!'
}

const bride = data.bride?.name || 'Bride'
const groom = data.groom?.name || 'Groom'
const weddingDate = data.date ? new Date(data.date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}) : 'Soon'

const coupleNames = `${bride} & ${groom}`
const eventType = data.isWedding ? 'Wedding' : 'Celebration'

const pageTitle = `${coupleNames} — ${eventType} Invitation`
const pageDescription = `You're invited to celebrate the ${eventType.toLowerCase()} of ${coupleNames} on ${weddingDate}. Join us for love, joy and unforgettable moments!`

const currentUrl = `https://hsh-2001.github.io/wedding/${route.fullPath}`

const defaultOgImage = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'


useSeoMeta({
  title: pageTitle,
  description: pageDescription,

  // Open Graph (Facebook, Telegram, LinkedIn, etc.)
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: currentUrl,
  ogImage: data.coverImage || defaultOgImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: data.coverImage || defaultOgImage,

  // Extra meta for WhatsApp, Viber, etc.
  'itemprop': pageTitle,
  'name': pageTitle,
  'image': data.coverImage || defaultOgImage,
})

useHead({
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
})

// For client-side only: decompress query data if present
const dataQuery = route.query.v as string
if (process.client && dataQuery) {
  const compressedData = dataQuery || ''
  const rawData = LZString.decompressFromEncodedURIComponent(compressedData) || '{}'
  const clientData = JSON.parse(rawData)
  // You can use clientData for client-only enhancements
}
</script>

<style scoped>
/* ... */
</style>