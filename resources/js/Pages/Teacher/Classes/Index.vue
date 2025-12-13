<template>
  <AppLayout>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Classes</h1>
      <Link
        :href="route('teacher.classes.create')"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
      >
        + New Class
      </Link>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search classes..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
      />
    </div>

    <!-- Classes Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class Name</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Room</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Schedule</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Students</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="classItem in filteredClasses" :key="classItem.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900 font-medium">{{ classItem.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ classItem.code }}</td>
            <td class="px-6 py-4 text-gray-600">{{ classItem.room || '-' }}</td>
            <td class="px-6 py-4 text-gray-600">
              {{ classItem.day_of_week ? getDayVN(classItem.day_of_week) : '-' }}
              {{ classItem.start_time ? `${classItem.start_time}-${classItem.end_time}` : '' }}
            </td>
            <td class="px-6 py-4 text-gray-600">{{ classItem.students_count }}</td>
            <td class="px-6 py-4 flex gap-2">
              <Link
                :href="route('teacher.classes.show', classItem.id)"
                class="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
              >
                View
              </Link>
              <Link
                :href="route('teacher.classes.edit', classItem.id)"
                class="text-amber-600 hover:text-amber-900 font-medium text-sm"
              >
                Edit
              </Link>
              <button
                @click="deleteClass(classItem.id)"
                class="text-red-600 hover:text-red-900 font-medium text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="classes.links && classes.links.length > 0" class="mt-6 flex justify-center gap-2">
      <template v-for="(link, index) in classes.links" :key="index">
        <Link
          v-if="link && link.url"
          :href="link.url"
          :only="['classes']"
          :class="[
            'px-3 py-2 rounded inline-block text-sm',
            link.active
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
          ]"
          v-html="link.label"
        />
        <span
          v-else-if="link"
          :class="[
            'px-3 py-2 rounded inline-block text-sm',
            link.active
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-400'
          ]"
          v-html="link.label"
        />
      </template>
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
    cls.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getDayVN = (day) => DAYS_OF_WEEK_VN[day] || day;

const deleteClass = (classId) => {
  if (confirm('Are you sure you want to delete this class?')) {
    router.delete(route('teacher.classes.destroy', classId));
  }
};
</script>
