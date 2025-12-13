<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">Hồ sơ của tôi</h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h2>

            <form @submit.prevent="updateProfile">
              <div class="space-y-6">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-900 mb-2">
                    Họ tên
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <!-- Student ID -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">
                    Mã sinh viên
                  </label>
                  <input
                    type="text"
                    :value="user.student_id"
                    disabled
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                <!-- Submit Button -->
                <div class="flex gap-4 pt-4">
                  <button
                    type="submit"
                    :disabled="processing"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                  >
                    {{ processing ? 'Đang lưu...' : 'Cập nhật thông tin' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Stats Card -->
        <div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Thống kê</h3>
            <div class="space-y-4">
              <div>
                <p class="text-gray-600 text-sm">Lớp học</p>
                <p class="text-3xl font-bold text-blue-600">{{ stats.classCount }}</p>
              </div>
              <div class="pt-4 border-t">
                <p class="text-gray-600 text-sm">Buổi học dự kiến</p>
                <p class="text-3xl font-bold text-green-600">{{ stats.sessionCount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage();
const user = page.props.auth.user;

const form = reactive({
  name: user.name,
  email: user.email,
});

const errors = reactive({});
const processing = ref(false);

const stats = reactive({
  classCount: 0,
  sessionCount: 0,
});

const updateProfile = async () => {
  try {
    processing.value = true;
    const response = await fetch(route('student.profile.update'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Thông tin đã được cập nhật');
    } else {
      Object.assign(errors, data.errors || {});
    }
  } finally {
    processing.value = false;
  }
};
</script>
