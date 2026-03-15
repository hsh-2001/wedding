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
const dataQuery = route.query.v as string

const compressedData = dataQuery || ''
const rawData = LZString.decompressFromEncodedURIComponent(compressedData) || '{}'
const data = JSON.parse(rawData)

const deCompressId = LZString.decompressFromEncodedURIComponent(weddingId) || ''

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

  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: currentUrl,
  ogImage: data.coverImage || defaultOgImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,

  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: data.coverImage || defaultOgImage,

  // Optional extras
  // themeColor: '#d4a373',                    // example wedding color
  // msapplicationTileColor: '#ffffff',
})

// Optional: Canonical link (helps avoid duplicate content issues)
useHead({
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
})

// Keep your debug log
onMounted(() => {
  console.log('Received data:', data, 'Decompressed ID:', deCompressId)
})
</script>

<style scoped>
/* ... */
</style>