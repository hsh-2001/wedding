<template>
    <div class="min-h-screen w-full flex flex-col">
        <DesktopHeader />
        <div class="grow container mx-auto p-2 mb-20 md:mb-0">
            <slot />
        </div>
        <MobileNavbar />
        <!-- <TheFooter /> -->
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped></style>