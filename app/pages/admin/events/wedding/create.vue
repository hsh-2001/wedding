<template>
    <div class="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <PageHeader 
            :title="$t('Create Wedding Event')" 
            :description="$t('Enter the details for the new wedding couple and event location.')"
            :icon="Plus"
        />

        <div class="mt-8 bg-(--color-surface) rounded-xl shadow-sm border border-(--color-border) overflow-hidden animate-fade-in">
            <el-form 
                :model="eventModel" 
                label-position="top" 
                class="p-6 sm:p-8"
                size="default"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <!-- Couple Information Section -->
                    <div class="col-span-1 md:col-span-2">
                        <h3 class="text-lg font-bold text-(--text-main) flex items-center gap-2">
                            <Heart class="w-5 h-5 text-(--color-primary)" />
                            Couple Information
                        </h3>
                    </div>

                    <el-form-item :label="$t('Bride Name')" class="col-span-1">
                        <el-input v-model="eventModel.bride_name" :placeholder="$t('Enter bride name')">
                            <template #prefix><User class="w-4 h-4 text-(--text-light)" /></template>
                        </el-input>
                    </el-form-item>

                    <el-form-item :label="$t('Groom Name')" class="col-span-1">
                        <el-input v-model="eventModel.groom_name" :placeholder="$t('Enter groom name')">
                            <template #prefix><User class="w-4 h-4 text-(--text-light)" /></template>
                        </el-input>
                    </el-form-item>

                    <!-- Event Details Section -->
                    <div class="col-span-1 md:col-span-2 mt-4">
                        <h3 class="text-lg font-bold text-(--text-main) flex items-center gap-2">
                            <CalendarIcon class="w-5 h-5 text-(--color-primary)" />
                            Event Details
                        </h3>
                    </div>

                    <el-form-item :label="$t('Wedding Date')" class="col-span-1">
                        <el-date-picker 
                            v-model="eventModel.wedding_date" 
                            type="date" 
                            :placeholder="$t('Select wedding date')"
                            value-format="YYYY-MM-DD" 
                            class="!w-full"
                        />
                    </el-form-item>

                    <el-form-item :label="$t('Venue Name')" class="col-span-1">
                        <el-input v-model="eventModel.venue_name" :placeholder="$t('Enter venue name')">
                            <template #prefix><Building2 class="w-4 h-4 text-(--text-light)" /></template>
                        </el-input>
                    </el-form-item>

                    <el-form-item :label="$t('Venue Address')" class="col-span-1 md:col-span-2">
                        <el-input v-model="eventModel.venue_address" :placeholder="$t('Enter venue address')">
                            <template #prefix><MapPin class="w-4 h-4 text-(--text-light)" /></template>
                        </el-input>
                    </el-form-item>

                    <el-form-item :label="$t('Description')" class="col-span-1 md:col-span-2">
                        <el-input 
                            v-model="eventModel.description" 
                            type="textarea" 
                            :rows="4"
                            :placeholder="$t('Enter event description')" 
                        />
                    </el-form-item>
                </div>

                <!-- Form Actions -->
                <div class="mt-8 flex flex-col sm:flex-row gap-2 pt-6 border-t border-(--color-border)">
                    <el-button 
                        type="primary" 
                        class="sm:flex-1 font-bold" 
                        :loading="loading" 
                        @click="handleUpsertEvent"
                    >
                        {{ $t('Create Event') }}
                    </el-button>
                    <el-button 
                        class="sm:px-10" 
                        @click="$router.back()"
                    >
                        {{ $t('Cancel') }}
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEvent } from '~/composables/useEvent';
import { 
    Plus, 
    Heart, 
    User, 
    Calendar as CalendarIcon, 
    MapPin, 
    Building2 
} from 'lucide-vue-next';

const { eventModel, handleUpsertEvent, loading } = useEvent();

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
    animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>