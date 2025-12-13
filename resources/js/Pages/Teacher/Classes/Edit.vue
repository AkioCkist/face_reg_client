<template>
  <div>
    <Link href="/teacher/classes" class="text-blue-600 hover:text-blue-900 mb-4 inline-block">
      ← Quay lại danh sách
    </Link>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Sửa lớp: {{ classItem.name }}
      </h1>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900 mb-2">
              Tên lớp <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="VD: Lớp 12A1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Code -->
          <div>
            <label for="code" class="block text-sm font-medium text-gray-900 mb-2">
              Mã lớp <span class="text-red-500">*</span>
            </label>
            <input
              id="code"
              v-model="form.code"
              type="text"
              placeholder="VD: 12A1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p v-if="errors.code" class="text-red-500 text-sm mt-1">{{ errors.code }}</p>
          </div>

          <!-- Room -->
          <div>
            <label for="room" class="block text-sm font-medium text-gray-900 mb-2">
              Phòng học
            </label>
            <input
              id="room"
              v-model="form.room"
              type="text"
              placeholder="VD: 301"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <!-- Day of Week -->
          <div>
            <label for="day" class="block text-sm font-medium text-gray-900 mb-2">
              Thứ học
            </label>
            <select
              id="day"
              v-model="form.day_of_week"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Chọn thứ --</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ getDayVN(day) }}
              </option>
            </select>
          </div>

          <!-- Start Time -->
          <div>
            <label for="start_time" class="block text-sm font-medium text-gray-900 mb-2">
              Giờ bắt đầu
            </label>
            <input
              id="start_time"
              v-model="form.start_time"
              type="time"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <!-- End Time -->
          <div>
            <label for="end_time" class="block text-sm font-medium text-gray-900 mb-2">
              Giờ kết thúc
            </label>
            <input
              id="end_time"
              v-model="form.end_time"
              type="time"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-900 mb-2">
            Mô tả
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            placeholder="Mô tả chi tiết về lớp học..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="processing"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {{ processing ? 'Đang lưu...' : 'Lưu thay đổi' }}
          </button>
          <Link
            :href="route('teacher.classes.show', classItem.id)"
            class="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_VN } from '@/api/constants';

const props = defineProps({
  class: Object,
});

const classItem = props.class;
const days = DAYS_OF_WEEK;

const { data: form, errors, processing, put } = useForm({
  name: classItem.name || '',
  code: classItem.code || '',
  description: classItem.description || '',
  room: classItem.room || '',
  start_time: classItem.start_time || '',
  end_time: classItem.end_time || '',
  day_of_week: classItem.day_of_week || '',
});

const getDayVN = (day) => DAYS_OF_WEEK_VN[day] || day;

const submitForm = () => {
  put(route('teacher.classes.update', classItem.id));
};
</script>
