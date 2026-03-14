<template>
    <div class="mt-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-2">
        <div class="lg:col-span-4 xl:col-span-3 space-y-6">
            <div class="bg-(--color-surface) rounded-xl p-6 shadow-sm border border-(--color-border) animate-fade-in">
                <h3 class="text-xs font-bold text-(--text-light) uppercase tracking-widest mb-4">Event Status</h3>
                <div
                    class="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30 mb-6">
                    <div class="flex items-center gap-3">
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        <span class="font-bold text-green-700 dark:text-green-400 text-sm">Active Event</span>
                    </div>
                    <CheckCircle2 class="w-5 h-5 text-green-500" />
                </div>

                <div class="space-y-4 pt-2 border-t border-(--color-border)">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-(--text-muted)">Created Date</span>
                        <span class="font-semibold text-(--text-main)">{{ 'March 13, 2026' }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-(--text-muted)">Last Updated</span>
                        <span class="font-semibold text-(--text-main)">Just now</span>
                    </div>
                </div>
            </div>

            <div class="bg-(--color-surface) rounded-xl p-6 shadow-sm border border-(--color-border) animate-fade-in"
                style="animation-delay: 100ms">
                <div class="flex justify-between items-start mb-6">
                    <div class="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <Users class="w-6 h-6 text-(--color-primary)" />
                    </div>
                    <el-button link class="text-(--color-primary) text-xs"
                        @click="navigateTo(`/admin/events/wedding/${$route.params.id}/guests`)">Manage</el-button>
                </div>
                <div class="space-y-1 mb-6">
                    <div class="text-4xl font-bold text-(--text-main)">150 <span
                            class="text-xl font-medium text-(--text-muted)">/ 200</span></div>
                    <div class="text-xs font-bold text-(--text-light) uppercase tracking-wider">Guests Confirmed
                    </div>
                </div>
                <div class="relative h-2 w-full bg-(--color-background) rounded-full overflow-hidden">
                    <div class="absolute top-0 left-0 h-full bg-(--color-primary) w-[75%] rounded-full"></div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-8 xl:col-span-9">
            <div class="bg-(--color-surface) rounded-xl shadow-sm border border-(--color-border) overflow-hidden animate-fade-in flex flex-col h-full"
                style="animation-delay: 200ms">
                <el-form :model="eventModel" label-position="top" class="p-6 sm:p-8 grow" size="default">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div class="col-span-1 md:col-span-2 mb-2">
                            <h3 class="text-lg font-bold text-(--text-main) flex items-center gap-2">
                                <Settings2 class="w-5 h-5 text-(--color-primary)" />
                                Wedding Configuration
                            </h3>
                        </div>

                        <el-form-item :label="$t('Bride Name')" class="col-span-1">
                            <el-input v-model="eventModel.bride_name">
                                <template #prefix>
                                    <User class="w-4 h-4 text-(--text-light)" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Groom Name')" class="col-span-1">
                            <el-input v-model="eventModel.groom_name">
                                <template #prefix>
                                    <User class="w-4 h-4 text-(--text-light)" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Wedding Date')" class="col-span-1">
                            <el-date-picker v-model="eventModel.wedding_date" type="date" value-format="YYYY-MM-DD" />
                        </el-form-item>

                        <el-form-item :label="$t('Venue Name')" class="col-span-1">
                            <el-input v-model="eventModel.venue_name">
                                <template #prefix>
                                    <Building2 class="w-4 h-4 text-(--text-light)" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Venue Address')" class="col-span-1 md:col-span-2">
                            <el-input v-model="eventModel.venue_address">
                                <template #prefix>
                                    <MapPin class="w-4 h-4 text-(--text-light)" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Description')" class="col-span-1 md:col-span-2">
                            <el-input v-model="eventModel.description" type="textarea" :rows="4"
                                placeholder="Add any additional notes or details about the event..." />
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    User,
    MapPin,
    Building2,
    Settings2,
    CheckCircle2,
    Users
} from 'lucide-vue-next';

defineProps<{
    eventModel: IWeddingUpsertInput
}>();

</script>

<style scoped></style>