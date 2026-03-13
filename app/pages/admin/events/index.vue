<template>
    <div class="w-full">
        <PageHeader title="Events" description="Manage your wedding events and details here." :icon="Calendar">
            <template #actions>
                <el-button type="primary" @click="$router.push('/admin/events/wedding/create')">
                    Create Event
                </el-button>
            </template>
        </PageHeader>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(item, index) in weddingEventList" :key="index">
                <div class="flex flex-col overflow-hidden hover:scale-105 transition-transform duration-300 justify-between w-full border border-(--color-primary)/50 min-h-30 rounded-lg">
                    <div class="h-full w-full p-2">
                        <div class="font-medium text-gray-700 text-lg mb-1">
                            <div class="flex justify-center items-center">
                                <span>{{ item.bride_name }}</span>
                                <HeartHandshakeIcon class="text-(--color-primary) w-10 h-10 mx-2" />
                                <span>{{ item.groom_name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-100 w-full h-10 flex items-center px-2">
                        <Calendar class="text-(--color-primary) w-4 h-4 mr-1" />
                        <span class="text-(--color-primary) font-medium">{{ item.getWeddingDateForDisplay }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Calendar } from "@element-plus/icons-vue";
import { HeartHandshakeIcon } from "lucide-vue-next";

const {
    getWeddingEvent,
    weddingEventList,
} = useEvent();

onMounted(() => {
    getWeddingEvent();
});

</script>

<style scoped></style>