<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">My Profile</h1>
        <p class="mt-2 text-sm text-gray-600">Manage your profile and register your face</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Profile Information -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
          
          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                v-model="profileForm.name"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="profileForm.email"
                type="email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              :disabled="isUpdatingProfile"
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors font-medium"
            >
              {{ isUpdatingProfile ? 'Updating...' : 'Update Profile' }}
            </button>
          </form>
        </div>

        <!-- Face Registration -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Face Registration</h2>
          
          <div v-if="has_face" class="text-center space-y-4">
            <div class="flex justify-center">
              <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-sm text-gray-600">Your face is registered</p>
            <button
              @click="showWebcam = true"
              class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Update Face
            </button>
          </div>

          <div v-else class="text-center space-y-4">
            <div class="flex justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p class="text-sm text-gray-600">No face registered yet</p>
            <button
              @click="showWebcam = true"
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Register Face
            </button>
          </div>
        </div>
      </div>

      <!-- Webcam Modal -->
      <Teleport to="body">
        <Transition name="fade">
          <div
            v-if="showWebcam"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            @click.self="showWebcam = false"
          >
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">{{ has_face ? 'Update' : 'Register' }} Face</h3>
                <button @click="showWebcam = false" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <WebcamPanel @capture="handleCaptureFace" @error="handleWebcamError" />
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>

    <!-- Loading Overlay -->
    <LoadingOverlay :show="isSubmittingFace" message="Registering face..." />
  </AppLayout>
</template>

<script setup>
import { ref, inject } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import WebcamPanel from '@/Components/Face/WebcamPanel.vue';
import LoadingOverlay from '@/Components/Common/LoadingOverlay.vue';
import axios from 'axios';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  has_face: {
    type: Boolean,
    default: false,
  },
  face_data: {
    type: Object,
    default: null,
  },
});

const toast = inject('toast');

const profileForm = ref({
  name: props.user.name,
  email: props.user.email,
});

const showWebcam = ref(false);
const isUpdatingProfile = ref(false);
const isSubmittingFace = ref(false);

const handleUpdateProfile = async () => {
  isUpdatingProfile.value = true;

  try {
    const response = await axios.put('/student/profile', profileForm.value);
    
    if (response.data.success) {
      toast.success('Profile updated successfully');
      router.reload();
    }
  } catch (error) {
    toast.error('Failed to update profile');
  } finally {
    isUpdatingProfile.value = false;
  }
};

const handleCaptureFace = async (imageData) => {
  isSubmittingFace.value = true;
  showWebcam.value = false;

  try {
    const endpoint = props.has_face
      ? `/student/profile/face/${props.face_data.id}`
      : '/student/profile/face';
    
    const method = props.has_face ? 'put' : 'post';
    
    const response = await axios[method](endpoint, { image: imageData });
    
    if (response.data.success) {
      toast.success(`Face ${props.has_face ? 'updated' : 'registered'} successfully`);
      router.reload();
    }
  } catch (error) {
    toast.error(`Failed to ${props.has_face ? 'update' : 'register'} face`);
  } finally {
    isSubmittingFace.value = false;
  }
};

const handleWebcamError = (error) => {
  toast.error(error);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
