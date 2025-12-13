<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">Lịch sử điểm danh</h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Lớp học</label>
            <select
              v-model="selectedClass"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Tất cả lớp --</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.name }} ({{ cls.code }})
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Tháng</label>
            <select
              v-model="selectedMonth"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option v-for="m in 12" :key="m" :value="m">
                Tháng {{ m }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Năm</label>
            <select
              v-model="selectedYear"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option v-for="y in years" :key="y" :value="y">
                {{ y }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Attendance Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold">Lớp học</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Ngày</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Trạng thái</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Phương thức</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Ghi chú</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="attendance in attendances.data"
              :key="attendance.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 font-medium">
                <div>
                  <p class="font-semibold">{{ attendance.class.name }}</p>
                  <p class="text-sm text-gray-600">{{ attendance.class.code }}</p>
                </div>
              </td>
              <td class="px-6 py-4">{{ formatDate(attendance.marked_at) }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    {
                      'bg-green-100 text-green-800': attendance.status === 'present',
                      'bg-yellow-100 text-yellow-800': attendance.status === 'late',
                      'bg-red-100 text-red-800': attendance.status === 'absent',
                    }
                  ]"
                >
                  {{ getStatusLabel(attendance.status) }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                {{ attendance.method === 'manual' ? 'Thủ công' : 'Khuôn mặt' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ attendance.notes || '-' }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="attendances.data.length === 0" class="text-center py-12">
          <p class="text-gray-500">Không có dữ liệu điểm danh</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="attendances.links" class="mt-6 flex justify-center gap-2">
        <Link
          v-for="link in attendances.links"
          :key="link.label"
          :href="link.url"
          :class="[
            'px-3 py-2 rounded',
            link.active
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
          ]"
          v-html="link.label"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { formatDate } from '@/utils/helpers';

const props = defineProps({
  attendances: Object,
  classes: Array,
  month: Number,
  year: Number,
});

const selectedClass = ref(props.selectedClass || '');
const selectedMonth = ref(props.month);
const selectedYear = ref(props.year);

const years = computed(() => {
  const now = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => now - 2 + i);
});

const getStatusLabel = (status) => {
  const labels = {
    present: 'Có mặt',
    late: 'Trễ',
    absent: 'Vắng',
  };
  return labels[status] || status;
};
</script>
