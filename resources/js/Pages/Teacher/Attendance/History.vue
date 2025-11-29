<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Attendance History</h1>
          <p class="mt-2 text-sm text-gray-600">View all attendance sessions</p>
        </div>
        <Link
          href="/teacher/attendance/start"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Take Attendance
        </Link>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label for="date_from" class="block text-sm font-medium text-gray-700">From Date</label>
            <input
              id="date_from"
              v-model="filters.date_from"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label for="date_to" class="block text-sm font-medium text-gray-700">To Date</label>
            <input
              id="date_to"
              v-model="filters.date_to"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div class="flex items-end">
            <button
              @click="applyFilters"
              class="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Records Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Attendance Records</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="records.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>No attendance records found</p>
                  <p class="text-sm mt-2">Start taking attendance to see records here</p>
                </td>
              </tr>
              <!-- Placeholder for actual records -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
  records: {
    type: Array,
    default: () => [],
  },
  filters: {
    type: Object,
    default: () => ({}),
  },
});

const filters = ref({
  date_from: props.filters.date_from || '',
  date_to: props.filters.date_to || '',
});

const applyFilters = () => {
  router.get('/teacher/attendance/history', filters.value);
};
</script>
