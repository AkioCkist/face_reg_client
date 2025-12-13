<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Thêm học sinh vào lớp</h2>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="student_id" class="block text-sm font-medium text-gray-900 mb-2">
            Chọn học sinh
          </label>
          <select
            id="student_id"
            v-model="form.student_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Chọn học sinh --</option>
            <option v-for="student in students" :key="student.id" :value="student.id">
              {{ student.name }} ({{ student.email }})
            </option>
          </select>
          <p v-if="errors.student_id" class="text-red-500 text-sm mt-1">
            {{ errors.student_id }}
          </p>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="processing"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {{ processing ? 'Đang thêm...' : 'Thêm' }}
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const emit = defineEmits(['close', 'added']);

defineProps({
  classId: Number,
});

const form = reactive({
  student_id: '',
});

const errors = reactive({});
const processing = ref(false);

// Mock students - thay bằng API call thực tế
const students = ref([]);

const submitForm = async () => {
  try {
    processing.value = true;
    // Implement add student logic
    emit('added');
  } finally {
    processing.value = false;
  }
};
</script>
