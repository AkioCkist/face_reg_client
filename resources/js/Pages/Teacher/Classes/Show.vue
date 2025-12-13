<template>
  <div>
    <Link href="/teacher/classes" class="text-blue-600 hover:text-blue-900 mb-4 inline-block">
      ← Quay lại
    </Link>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Class Info -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ class_data.name }}</h1>
              <p class="text-gray-600 mt-2">Mã lớp: <span class="font-semibold">{{ class_data.code }}</span></p>
            </div>
            <Link
              :href="route('teacher.classes.edit', class_data.id)"
              class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Sửa thông tin
            </Link>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div v-if="class_data.room" class="flex gap-4">
              <span class="text-gray-600">Phòng học:</span>
              <span class="font-semibold">{{ class_data.room }}</span>
            </div>
            <div v-if="class_data.day_of_week" class="flex gap-4">
              <span class="text-gray-600">Thứ:</span>
              <span class="font-semibold">{{ getDayVN(class_data.day_of_week) }}</span>
            </div>
            <div v-if="class_data.start_time" class="flex gap-4">
              <span class="text-gray-600">Giờ:</span>
              <span class="font-semibold">{{ class_data.start_time }} - {{ class_data.end_time }}</span>
            </div>
          </div>

          <div v-if="class_data.description" class="border-t pt-4">
            <p class="text-gray-600 text-sm">{{ class_data.description }}</p>
          </div>

          <!-- Attendance Actions -->
          <div class="mt-6 pt-6 border-t flex gap-4">
            <Link
              :href="route('teacher.attendance.index', { class: class_data.id })"
              class="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
            >
              📋 Điểm danh
            </Link>
            <Link
              :href="route('teacher.attendance.report', { class: class_data.id })"
              class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
            >
              📊 Báo cáo
            </Link>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div>
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Thống kê</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Tổng học sinh:</span>
              <span class="font-bold text-2xl text-blue-600">{{ students.length }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Students List -->
    <div class="bg-white rounded-lg shadow-md mt-6">
      <div class="p-6 border-b flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Danh sách học sinh</h2>
        <button
          @click="showAddModal = true"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + Thêm học sinh
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Họ tên</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">MSSV</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900">{{ student.name }}</td>
              <td class="px-6 py-4 text-gray-600">{{ student.email }}</td>
              <td class="px-6 py-4 text-gray-600">{{ student.student_id || '-' }}</td>
              <td class="px-6 py-4">
                <button
                  @click="removeStudent(student.id)"
                  class="text-red-600 hover:text-red-900 font-medium text-sm"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Student Modal -->
    <StudentAddModal
      v-if="showAddModal"
      :class-id="class_data.id"
      @close="showAddModal = false"
      @added="onStudentAdded"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { DAYS_OF_WEEK_VN } from '@/api/constants';
import StudentAddModal from '@/Components/Teacher/StudentAddModal.vue';

const props = defineProps({
  class: Object,
  students: Array,
});

const class_data = props.class;
const showAddModal = ref(false);

const getDayVN = (day) => DAYS_OF_WEEK_VN[day] || day;

const removeStudent = (studentId) => {
  if (confirm('Bạn có chắc chắn muốn xóa học sinh khỏi lớp?')) {
    // Implement remove student logic
  }
};

const onStudentAdded = () => {
  showAddModal.value = false;
  // Reload students list
};
</script>
