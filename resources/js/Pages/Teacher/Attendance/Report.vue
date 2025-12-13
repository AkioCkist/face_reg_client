<template>
  <div>
    <Link href="/teacher/classes" class="text-blue-600 hover:text-blue-900 mb-4 inline-block">
      ← Quay lại
    </Link>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Báo cáo điểm danh: {{ class_data.name }}</h1>
        <div class="flex gap-4">
          <select v-model="currentMonth" class="px-4 py-2 border border-gray-300 rounded-lg">
            <option v-for="m in 12" :key="m" :value="m">
              Tháng {{ m }}
            </option>
          </select>
          <select v-model="currentYear" class="px-4 py-2 border border-gray-300 rounded-lg">
            <option v-for="y in years" :key="y" :value="y">
              {{ y }}
            </option>
          </select>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <p class="text-green-600 text-sm font-medium">Tổng buổi</p>
          <p class="text-2xl font-bold text-green-900 mt-2">{{ totalSessions }}</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-600 text-sm font-medium">Trung bình có mặt</p>
          <p class="text-2xl font-bold text-blue-900 mt-2">{{ avgPresent.toFixed(1) }}%</p>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p class="text-yellow-600 text-sm font-medium">Trung bình trễ</p>
          <p class="text-2xl font-bold text-yellow-900 mt-2">{{ avgLate.toFixed(1) }}%</p>
        </div>
        <div class="bg-red-50 p-4 rounded-lg border border-red-200">
          <p class="text-red-600 text-sm font-medium">Trung bình vắng</p>
          <p class="text-2xl font-bold text-red-900 mt-2">{{ avgAbsent.toFixed(1) }}%</p>
        </div>
      </div>

      <!-- Report Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold">Học sinh</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Có mặt</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Trễ</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Vắng</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Tỷ lệ</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="item in report" :key="item.student.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-medium">{{ item.student.name }}</td>
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {{ item.present }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {{ item.late }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  {{ item.absent }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                {{ calculateAttendanceRate(item) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  class: Object,
  month: Number,
  year: Number,
  report: Array,
});

const class_data = props.class;
const currentMonth = ref(props.month);
const currentYear = ref(props.year);

const years = computed(() => {
  const now = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => now - 2 + i);
});

const totalSessions = computed(() => {
  if (props.report.length === 0) return 0;
  const first = props.report[0];
  return first.present + first.late + first.absent;
});

const avgPresent = computed(() => {
  if (props.report.length === 0 || totalSessions.value === 0) return 0;
  const total = props.report.reduce((sum, item) => sum + item.present, 0);
  return (total / (props.report.length * totalSessions.value)) * 100;
});

const avgLate = computed(() => {
  if (props.report.length === 0 || totalSessions.value === 0) return 0;
  const total = props.report.reduce((sum, item) => sum + item.late, 0);
  return (total / (props.report.length * totalSessions.value)) * 100;
});

const avgAbsent = computed(() => {
  if (props.report.length === 0 || totalSessions.value === 0) return 0;
  const total = props.report.reduce((sum, item) => sum + item.absent, 0);
  return (total / (props.report.length * totalSessions.value)) * 100;
});

const calculateAttendanceRate = (item) => {
  const total = item.present + item.late + item.absent;
  if (total === 0) return 0;
  return ((item.present + item.late * 0.5) / total * 100).toFixed(1);
};
</script>
