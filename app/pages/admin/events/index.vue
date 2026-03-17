<template>
    <div class="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <PageHeader :title="$t('Events')" :description="$t('Manage your wedding events and details here.')"
            :icon="Calendar">
            <template #actions>
                <el-button type="primary" @click="$router.push('/admin/events/wedding/create')">
                    {{ $t('Create Event') }}
                </el-button>
            </template>
        </PageHeader>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div v-for="(item, index) in weddingEventList" :key="index"
                class="group bg-(--color-surface) rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-(--color-border) flex flex-col h-full animate-fade-in"
                :style="{ animationDelay: `${index * 100}ms` }">
                
                <div class="p-6 flex-grow">
                    <!-- Event Title/Names -->
                    <div class="text-center mb-6">
                        <h3 class="text-xl font-bold text-(--text-main) tracking-tight group-hover:text-(--color-primary) transition-colors">
                            {{ item.bride_name }} & {{ item.groom_name }}
                        </h3>
                    </div>

                    <!-- Quick Info -->
                    <div class="space-y-3 pt-4 border-t border-(--color-border)">
                        <div class="flex items-center text-(--text-muted)">
                            <Calendar class="w-4 h-4 text-(--color-primary) mr-3" />
                            <span class="text-sm font-medium">{{ item.getWeddingDateForDisplay }}</span>
                        </div>
                        
                        <div v-if="item.venue_name" class="flex items-center text-(--text-muted)">
                            <MapPin class="w-4 h-4 text-(--color-primary) mr-3" />
                            <span class="text-sm truncate font-medium">{{ item.venue_name }}</span>
                        </div>

                        <p v-if="item.description" class="text-sm text-(--text-light) line-clamp-2 italic pt-1">
                            "{{ item.description }}"
                        </p>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-t border-(--color-border) flex justify-between items-center">
                    <div class="flex items-center">
                        <span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        <span class="text-[10px] text-(--text-light) font-bold uppercase tracking-wider">{{ $t('Confirmed') }}</span>
                    </div>
                    <el-button link class="text-(--color-primary)! font-bold!" @click="$router.push(`/admin/events/wedding/${item.id}`)">
                        {{ $t('Details') }} <ArrowRight class="w-4 h-4 ml-1.5" />
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Calendar } from "@element-plus/icons-vue";
import { MapPin, ArrowRight } from "lucide-vue-next";
import { useEvent } from "~/composables/useEvent";

const {
    getWeddingEvent,
    weddingEventList,
    getEventByCompanyId,
} = useEvent();

onMounted(() => {
    getEventByCompanyId();
    getWeddingEvent();
});

</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    opacity: 0;
    animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
