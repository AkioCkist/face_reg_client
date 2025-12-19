<template>
  <AppLayout>
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 tracking-tight">My Classes</h1>
          <p class="text-gray-600 mt-2">Manage and view attendance for your classes</p>
        </div>
        <Link
          :href="route('teacher.classes.create')"
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          + New Class
        </Link>
      </div>

      <!-- Search Bar -->
      <div class="relative">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search classes by name or code..."
          class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
        />
      </div>
    </div>

    <!-- Classes Grid -->
    <div v-if="filteredClasses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="classItem in filteredClasses"
        :key="classItem.id"
        class="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 group"
      >
        <!-- Card Header -->
        <div class="bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-700 px-6 py-5 relative overflow-hidden">
          <div class="absolute inset-0 bg-white/5 transform -skew-y-2 scale-150 group-hover:scale-100 transition-transform duration-700"></div>
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-white mb-1 group-hover:tracking-wide transition-all duration-300">{{ classItem.name }}</h3>
            <p class="text-indigo-100 text-sm font-medium">{{ classItem.code }}</p>
          </div>
        </div>

        <!-- Card Content -->
        <div class="px-6 py-5 space-y-4">
          <!-- Room -->
          <div class="flex items-center gap-3 group/item">
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-indigo-50 transition-colors duration-200">
              <svg class="w-4 h-4 text-gray-600 group-hover/item:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-gray-500 text-xs font-medium uppercase tracking-wide">Room</span>
              <p class="text-gray-900 font-semibold truncate">{{ classItem.room || '—' }}</p>
            </div>
          </div>

          <!-- Schedule -->
          <div class="flex items-center gap-3 group/item">
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-indigo-50 transition-colors duration-200">
              <svg class="w-4 h-4 text-gray-600 group-hover/item:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-gray-500 text-xs font-medium uppercase tracking-wide">Schedule</span>
              <p class="text-gray-900 font-semibold truncate">
                <span v-if="classItem.day_of_week">
                  {{ getDayVN(classItem.day_of_week) }}
                  <span v-if="classItem.start_time" class="text-gray-600 font-normal">{{ classItem.start_time }}-{{ classItem.end_time }}</span>
                </span>
                <span v-else>—</span>
              </p>
            </div>
          </div>

          <!-- Students Count -->
          <div class="flex items-center gap-3 group/item">
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-indigo-50 transition-colors duration-200">
              <svg class="w-4 h-4 text-gray-600 group-hover/item:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-gray-500 text-xs font-medium uppercase tracking-wide">Students</span>
              <p class="text-gray-900 font-semibold">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-sm">
                  {{ classItem.students_count }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Card Footer - Actions -->
        <div class="border-t border-gray-100 px-6 py-4 bg-gray-50/50 flex items-center justify-between gap-3">
          <Link
            :href="route('teacher.attendance.index', classItem.id)"
            class="flex-1 group/btn relative px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm shadow-sm hover:shadow-md active:scale-95"
            title="Start Attendance"
          >
            <svg class="w-5 h-5 group-hover/btn:rotate-6 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M6.5 6.5h7m-7 4h7M10 15.5H6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
            <span>Attendance</span>
          </Link>
          <Link
            :href="route('teacher.classes.edit', classItem.id)"
            class="group/btn relative p-2.5 bg-white hover:bg-amber-50 text-amber-600 hover:text-amber-700 rounded-lg transition-all duration-200 border border-amber-200 hover:border-amber-300 shadow-sm hover:shadow active:scale-95"
            title="Edit Class"
          >
            <svg class="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </Link>
          <button
            @click="deleteClass(classItem.id)"
            class="group/btn relative p-2.5 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow active:scale-95"
            title="Delete Class"
          >
            <svg class="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <p class="text-gray-900 text-xl font-semibold mb-2">No classes found</p>
      <p class="text-gray-500 mb-6">
        <span v-if="searchQuery">Try adjusting your search criteria</span>
        <span v-else>Start by creating your first class</span>
      </p>
      <Link
        v-if="!searchQuery"
        :href="route('teacher.classes.create')"
        class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      >
        Create Your First Class
      </Link>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { DAYS_OF_WEEK_VN } from '@/api/constants';

const props = defineProps({
  classes: Object,
});

const searchQuery = ref('');

const filteredClasses = computed(() => {
  return props.classes.data.filter(cls =>
    cls.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getDayVN = (day) => DAYS_OF_WEEK_VN[day] || day;

const deleteClass = (classId) => {
  if (confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
    router.delete(route('teacher.classes.destroy', classId));
  }
};
</script>