<template>
  <AppLayout>
    <Link href="/teacher/classes" class="text-indigo-600 hover:text-indigo-900 mb-4 inline-block font-medium">
      ← Back to Classes
    </Link>

    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Create New Class</h1>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900 mb-2">
              Class Name <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="E.g. Grade 12A1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <p v-if="form.errors.name" class="text-red-500 text-sm mt-1">{{ form.errors.name }}</p>
          </div>

          <!-- Code -->
          <div>
            <label for="code" class="block text-sm font-medium text-gray-900 mb-2">
              Class Code <span class="text-red-500">*</span>
            </label>
            <input
              id="code"
              v-model="form.code"
              type="text"
              placeholder="E.g. 12A1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <p v-if="form.errors.code" class="text-red-500 text-sm mt-1">{{ form.errors.code }}</p>
          </div>

          <!-- Room -->
          <div>
            <label for="room" class="block text-sm font-medium text-gray-900 mb-2">
              Room Number
            </label>
            <input
              id="room"
              v-model="form.room"
              type="text"
              placeholder="E.g. 301"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          <!-- Day of Week -->
          <div>
            <label for="day" class="block text-sm font-medium text-gray-900 mb-2">
              Meeting Day
            </label>
            <select
              id="day"
              v-model="form.day_of_week"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="">-- Select Day --</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ getDayVN(day) }}
              </option>
            </select>
          </div>

          <!-- Start Time -->
          <div>
            <label for="start_time" class="block text-sm font-medium text-gray-900 mb-2">
              Start Time
            </label>
            <input
              id="start_time"
              v-model="form.start_time"
              type="time"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          <!-- End Time -->
          <div>
            <label for="end_time" class="block text-sm font-medium text-gray-900 mb-2">
              End Time
            </label>
            <input
              id="end_time"
              v-model="form.end_time"
              type="time"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-900 mb-2">
            Description
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            placeholder="Provide details about this class..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="form.processing"
            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition font-medium"
          >
            {{ form.processing ? 'Creating...' : 'Create Class' }}
          </button>
          <Link
            href="/teacher/classes"
            class="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_VN } from '@/api/constants';

const days = DAYS_OF_WEEK;

const form = useForm({
  name: '',
  code: '',
  description: '',
  room: '',
  start_time: '',
  end_time: '',
  day_of_week: '',
});

const getDayVN = (day) => DAYS_OF_WEEK_VN[day] || day;

const submitForm = () => {
  form.post(route('teacher.classes.store'));
};
</script>
