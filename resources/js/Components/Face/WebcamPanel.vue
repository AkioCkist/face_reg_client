<template>
  <div class="webcam-panel bg-white rounded-lg shadow-lg p-6">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      
      <!-- Device Selection -->
      <select
        v-if="devices.length > 1"
        v-model="selectedDevice"
        @change="handleDeviceChange"
        class="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option v-for="device in devices" :key="device.deviceId" :value="device.deviceId">
          {{ device.label || `Camera ${devices.indexOf(device) + 1}` }}
        </option>
      </select>
    </div>

    <!-- Video Container -->
    <div class="relative bg-gray-900 rounded-lg overflow-hidden" :style="{ aspectRatio: '16/9' }">
      <video
        ref="videoRef"
        autoplay
        playsinline
        class="w-full h-full object-cover"
      ></video>
      
      <!-- Overlay when not active -->
      <div
        v-if="!isActive"
        class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      >
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p class="text-white text-sm">{{ error || 'Camera not started' }}</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="mt-4 flex items-center justify-center gap-4">
      <button
        v-if="!isActive"
        @click="handleStart"
        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        Start Camera
      </button>
      
      <template v-else>
        <button
          @click="handleCapture"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Capture
        </button>
        <button
          @click="handleStop"
          class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Stop Camera
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useWebcam } from '@/composables/useWebcam';

const props = defineProps({
  title: {
    type: String,
    default: 'Webcam',
  },
});

const emit = defineEmits(['capture', 'error']);

const {
  videoRef,
  devices,
  selectedDevice,
  isActive,
  error,
  start,
  stop,
  capture,
  switchCamera,
} = useWebcam();

const handleStart = async () => {
  try {
    await start();
  } catch (err) {
    emit('error', error.value);
  }
};

const handleStop = () => {
  stop();
};

const handleCapture = () => {
  const imageData = capture();
  if (imageData) {
    emit('capture', imageData);
  }
};

const handleDeviceChange = async () => {
  try {
    await switchCamera(selectedDevice.value);
  } catch (err) {
    emit('error', error.value);
  }
};
</script>
