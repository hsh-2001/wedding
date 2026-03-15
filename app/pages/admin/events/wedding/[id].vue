<template>
    <div class="w-full max-w-7xl mx-auto sm:p-6 lg:p-8">
        <PageHeader :title="`${weddingModel.bride_name} & ${weddingModel.groom_name}`"
            :description="$t('View and manage complete details for this wedding event.')" :icon="Heart">
            <template #actions>
                <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <el-button @click="$router.back()">
                        {{ $t('Back') }}
                    </el-button>
                </div>
            </template>
        </PageHeader>

        <div class="relative flex gap-1 p-1 rounded-lg bg-gray-100/60 dark:bg-gray-800 backdrop-blur-sm">
            <div class="absolute inset-y-1 bg-white dark:bg-gray-700 rounded-md shadow-sm transition-all duration-500 ease-out"
                :style="{
                    transform: !isInvitationsTab
                        ? 'translateX(4px) scaleX(1)'
                        : 'translateX(calc(100% + 4px)) scaleX(1)',
                    width: 'calc(50% - 8px)'
                }"></div>

            <button class="relative z-10 flex-1 py-2 text-sm font-medium transition-colors cursor-pointer"
                :class="!isInvitationsTab ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'"
                @click="isInvitationsTab = false">
                {{ $t('Event Details') }}
            </button>
            <button class="relative z-10 flex-1 py-2 text-sm font-medium transition-colors cursor-pointer"
                :class="isInvitationsTab ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'"
                @click="isInvitationsTab = true">
                {{ $t('Invitation List') }}
            </button>
        </div>
    <EventWeddingDetail v-if="!isInvitationsTab" :eventModel="weddingModel" />
    <EventInvatationList v-else />
    </div>
</template>

<script setup lang="ts">
import { useEvent } from '~/composables/useEvent';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import {
    Heart,
    User,
    Calendar as CalendarIcon,
    MapPin,
    Building2,
    Settings2,
    CheckCircle2,
    Users
} from 'lucide-vue-next';

const route = useRoute();
const { weddingModel, getWeddingEventById, handleUpsertEvent, loading } = useEvent();

const formatDate = (dateString: string | Date) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMMM dd, yyyy');
};

onMounted(() => {
    const id = route.params.id as string;
    if (id) {
        getWeddingEventById(id);
    }
});

const isInvitationsTab = ref(false);

</script>

<style scoped>
@reference "@/assets/styles/main.css";

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
    animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>