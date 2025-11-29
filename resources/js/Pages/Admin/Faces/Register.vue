<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Register New Face</h1>
        <p class="mt-2 text-sm text-gray-600">Capture and register a new face in the system</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Webcam Panel -->
        <div>
          <WebcamPanel
            title="Capture Face"
            @capture="handleCapture"
            @error="handleWebcamError"
          />
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- User Selection -->
            <div>
              <label for="user_id" class="block text-sm font-medium text-gray-700">
                Select User
              </label>
              <select
                id="user_id"
                v-model="form.user_id"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">-- Select User --</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }} ({{ user.email }})
                </option>
              </select>
              <p v-if="errors.user_id" class="mt-1 text-sm text-red-600">{{ errors.user_id }}</p>
            </div>

            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Name (Optional)
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter name"
              />
            </div>

            <!-- Captured Image Preview -->
            <div v-if="form.image">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Captured Image
              </label>
              <img :src="form.image" alt="Captured face" class="w-full rounded-lg" />
            </div>

            <!-- Submit Button -->
            <div class="flex gap-4">
              <button
                type="submit"
                :disabled="!form.image || !form.user_id || isSubmitting"
                class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {{ isSubmitting ? 'Registering...' : 'Register Face' }}
              </button>
              <Link
                href="/admin/faces"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <LoadingOverlay :show="isSubmitting" message="Registering face..." />
  </AppLayout>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import WebcamPanel from '@/Components/Face/WebcamPanel.vue';
import LoadingOverlay from '@/Components/Common/LoadingOverlay.vue';
import FacesService from '@/services/FacesService';

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const toast = inject('toast');

const form = ref({
  user_id: '',
  name: '',
  image: null,
});

const errors = ref({});
const isSubmitting = ref(false);

const handleCapture = (imageData) => {
  form.value.image = imageData;
  toast.success('Image captured successfully');
};

const handleWebcamError = (error) => {
  toast.error(error);
};

const handleSubmit = async () => {
  if (!form.value.image || !form.value.user_id) {
    toast.error('Please select a user and capture an image');
    return;
  }

  isSubmitting.value = true;
  errors.value = {};

  try {
    const result = await FacesService.register(form.value);
    
    if (result.success) {
      toast.success('Face registered successfully');
      router.visit('/admin/faces');
    } else {
      if (result.errors) {
        errors.value = result.errors;
      }
      toast.error(result.message || 'Failed to register face');
    }
  } catch (error) {
    toast.error('An error occurred while registering the face');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
