
<template>
  <div class="p-4 max-w-3xl mx-auto">
    <PageHeader
      :title="$t('Admin Dashboard')"
      :description="$t('Quick overview of your events and guests.')"
      :icon="DashboardIcon"
    />

    <!-- Simple Summary Row (responsive) -->
    <div class="flex flex-col sm:flex-row gap-4 justify-between mb-8">
      <div class="flex flex-col items-center flex-1 min-w-[100px]">
        <span class="text-xl font-bold text-pink-600">3</span>
        <span class="text-xs text-(--text-light) mt-1">{{ $t('Active Events') }}</span>
      </div>
      <div class="flex flex-col items-center flex-1 min-w-[100px]">
        <span class="text-xl font-bold text-green-600">450</span>
        <span class="text-xs text-(--text-light) mt-1">{{ $t('Total Guests') }}</span>
      </div>
      <div class="flex flex-col items-center flex-1 min-w-[100px]">
        <span class="text-xl font-bold text-blue-600">5</span>
        <span class="text-xs text-(--text-light) mt-1">{{ $t('Upcoming Services') }}</span>
      </div>
    </div>

    <div class="bg-(--color-surface) rounded-lg shadow-sm border border-(--color-border) p-2 sm:p-4">
      <h2 class="text-base font-semibold mb-3 text-(--text-main)">{{ $t('Recent Wedding Events') }}</h2>
      <div class="overflow-x-auto">
        <table class="min-w-[400px] w-full text-sm">
          <thead>
            <tr class="border-b border-(--color-border)">
              <th class="py-2 text-left text-(--text-light)">{{ $t('Event') }}</th>
              <th class="py-2 text-left text-(--text-light)">{{ $t('Date') }}</th>
              <th class="py-2 text-left text-(--text-light)">{{ $t('Guests') }}</th>
              <th class="py-2 text-left text-(--text-light)">{{ $t('Status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in recentEvents" :key="event.id" class="hover:bg-pink-50 dark:hover:bg-pink-900/10 transition">
              <td class="py-2 font-medium text-(--text-main)">{{ event.name }}</td>
              <td class="py-2 text-(--text-muted)">{{ event.date }}</td>
              <td class="py-2 text-(--text-main)">{{ event.guests }}</td>
              <td class="py-2">
                <span :class="event.status === 'Active' ? 'text-green-600 font-semibold' : 'text-gray-400'">
                  {{ $t(event.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '~/components/PageHeader.vue'
import { Gauge } from 'lucide-vue-next'

const DashboardIcon = Gauge

const recentEvents = [
  {
    id: 1,
    name: 'Sokha & Dara Wedding',
    date: '2026-03-13',
    guests: 150,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Rina & Vannak Wedding',
    date: '2026-02-28',
    guests: 120,
    status: 'Completed',
  },
  {
    id: 3,
    name: 'Sophea & Makara Wedding',
    date: '2026-01-15',
    guests: 180,
    status: 'Completed',
  },
]
</script>

<style scoped>
@media (max-width: 640px) {
  .min-w-\[100px\] {
    min-width: 100px !important;
  }
  .min-w-\[400px\] {
    min-width: 400px !important;
  }
}
</style>
