<template>
    <div>
       <TemplateOne />
    </div>
</template>

<script setup lang="ts">
import TemplateOne from '~/components/invitations/TemplateOne.vue';
import LZString from 'lz-string';


definePageMeta({
    layout: 'invitation',
});

const route = useRoute();
const weddingId = route.params.id as string;
const dataQuery = route.query.v as string;
const data = JSON.parse(LZString.decompressFromEncodedURIComponent(dataQuery) || '{}');
const deCompressId = LZString.decompressFromEncodedURIComponent(weddingId) || '';

onMounted(() => {
    console.log('Received data:', data, 'Decompressed ID:', deCompressId);
});

</script>

<style scoped>

</style>