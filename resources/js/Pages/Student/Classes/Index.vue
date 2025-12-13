<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">Lớp học của tôi</h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="classItem in classes.data"
          :key="classItem.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h3 class="text-xl font-bold">{{ classItem.name }}</h3>
            <p class="text-blue-100 mt-1">{{ classItem.code }}</p>
          </div>

          <div class="p-6 space-y-3">
            <div v-if="classItem.teacher">
              <p class="text-gray-600 text-sm">Giáo viên</p>
              <p class="font-semibold">{{ classItem.teacher.name }}</p>
            </div>

            <div v-if="classItem.day_of_week">
              <p class="text-gray-600 text-sm">Lịch học</p>
              <p class="font-semibold">
                {{ getDayVN(classItem.day_of_week) }}
                {{ classItem.start_time ? `${classItem.start_time}-${classItem.end_time}` : '' }}
              </p>
            </div>

            <div v-if="classItem.room">
              <p class="text-gray-600 text-sm">Phòng học</p>
              <p class="font-semibold">{{ classItem.room }}</p>
            </div>

            <Link
              :href="route('student.classes.show', classItem.id)"
              class="block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="classes.data.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Bạn chưa được đăng ký lớp học nào</p>
      </div>

      <!-- Pagination -->
      <div v-if="classes.links" class="mt-8 flex justify-center gap-2">
        <Link
          v-for="link in classes.links"
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
import { Link } from '@inertiajs/vue3';
import { DAYS_OF_WEEK_VN } from '@/api/constants';

defineProps({
  classes: Object,
});

const getDayVN = (day) => DAYS_OF_WEEK_VN[day] || day;
</script>
